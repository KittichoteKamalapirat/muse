import { Avatar } from "@chakra-ui/avatar";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  CartItemStatus,
  useReceivedCartItemMutation,
  UserOrdersQuery,
} from "../../generated/graphql";
interface NotPaymentPendingProps {
  userOrderData: UserOrdersQuery | undefined;
  cartItemStatus: CartItemStatus;
}

export const NotPaymentPending: React.FC<NotPaymentPendingProps> = ({
  userOrderData,
  cartItemStatus,
}) => {
  const router = useRouter();
  const [receivedCartItem, { data: itemReceived }] =
    useReceivedCartItemMutation();

  if (itemReceived?.receivedCartItem) {
    router.push(`/order?status=${CartItemStatus.Received}`);
  }

  return (
    <Box>
      {/* cartItems map */}

      <Box>
        {userOrderData?.userOrders.map((order, index) => (
          <Box key={index}>
            {order.byCreator.map((byCreator, index) => (
              <Box bgColor="white" my={2} p={5} key={index}>
                <Flex alignItems="center">
                  {" "}
                  <Avatar
                    m={2}
                    size="sm"
                    src={byCreator.avatar}
                    name="creator avatar"
                    border={1}
                  />
                  <Text>{byCreator.creatorName}</Text>
                </Flex>
                <Flex key={index} m="10px">
                  <Box>
                    {byCreator.cartItems.map((cartItem, subindex) => (
                      <Box key={subindex} my="6px">
                        <Flex>
                          {!cartItem.mealkit?.thumbnail ? null : (
                            <Box flex={1}>
                              <Image
                                src={cartItem.mealkit.thumbnail.url}
                                alt="image"
                                fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                              />
                            </Box>
                          )}

                          <Box flex={3} m={1} textAlign="left">
                            <Heading size="md">
                              {cartItem.mealkit?.name}
                            </Heading>

                            <Text>{cartItem.user?.username}</Text>

                            <Flex justifyContent="space-between" fontSize="sm">
                              <Text>Unit price</Text>
                              <Text color="gray.700" fontWeight="normal">
                                {cartItem.mealkit?.price}
                              </Text>
                            </Flex>

                            <Flex justifyContent="space-between" fontSize="sm">
                              <Text>Quantity</Text>
                              <Text color="gray.700" fontWeight="normal">
                                x {cartItem.quantity}
                              </Text>
                            </Flex>
                            <Divider />
                            <Flex justifyContent="end" fontSize="sm">
                              <Text> {cartItem.total} </Text>
                            </Flex>

                            <Flex
                              justifyContent="space-between"
                              fontSize="sm"
                            ></Flex>
                          </Box>
                        </Flex>

                        {cartItemStatus === CartItemStatus.Delivered && (
                          <NextLink
                            href={`/mealkit/[id]`}
                            as={`/mealkit/${cartItem.mealkitId}`}
                            passHref
                          >
                            <Button
                              my="10px"
                              width="100%"
                              onClick={() => {
                                receivedCartItem({
                                  variables: { id: cartItem.id },
                                  update: (cache) =>
                                    cache.evict({ fieldName: "userOrders:{}" }),
                                });
                              }}
                            >
                              Received an item
                            </Button>
                          </NextLink>
                        )}

                        {/* received and not reviewed -> leave a review button */}
                        {/* received and reviewed -> reviewed button */}
                        {cartItemStatus === CartItemStatus.Received ? (
                          !cartItem.isReviewed ? (
                            <NextLink
                              href={{
                                pathname: "/review/create",
                                query: {
                                  cartItemId: cartItem.id,
                                  mealkitId: cartItem.mealkitId,
                                },
                              }}
                              passHref
                            >
                              <Button as={Link} my="10px" width="100%">
                                Leave a Review
                              </Button>
                            </NextLink>
                          ) : (
                            <Button
                              variant="outline"
                              as={Link}
                              my="10px"
                              width="100%"
                            >
                              Reviewed
                            </Button>
                          )
                        ) : null}
                      </Box>
                    ))}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" fontSize="sm">
                  <Text>Sum</Text>
                  <Text>{byCreator.totalByCreator}</Text>
                </Flex>
                <Flex justifyContent="space-between" fontSize="sm">
                  <Text>Delivery Fee </Text>
                  <Text>{byCreator.deliveryFee}</Text>
                </Flex>

                {cartItemStatus ===
                  (CartItemStatus.OnTheWay || CartItemStatus.Delivered) && (
                  <NextLink
                    href="/order/tracking/[id]"
                    as={`/order/tracking/${order.trackingId}`}
                    passHref
                  >
                    <Button as={Link} my="10px" width="100%">
                      Tracking Info
                    </Button>
                  </NextLink>
                )}

                {/* show review button */}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
