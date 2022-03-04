import { Avatar } from "@chakra-ui/avatar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Text,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Link,
} from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import React from "react";
import { CartItemStatus, UserOrdersQuery } from "../../generated/graphql";
import { primaryColor } from "../Variables";
import NextLink from "next/link";
interface NotPaymentPendingProps {
  userOrderData: UserOrdersQuery | undefined;
  cartItemStatus: CartItemStatus;
}

export const NotPaymentPending: React.FC<NotPaymentPendingProps> = ({
  userOrderData,
  cartItemStatus,
}) => {
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
                          {!cartItem.mealkit?.images ? null : (
                            <Box flex={1}>
                              <Image
                                src={cartItem.mealkit.images[0]}
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

                        {cartItemStatus === CartItemStatus.Delivered &&
                          (cartItem.isReviewed ? (
                            <NextLink
                              href={`/mealkit/[id]`}
                              as={`/mealkit/${cartItem.mealkitId}`}
                            >
                              <Button
                                variant="outline"
                                as={Link}
                                my="10px"
                                width="100%"
                              >
                                Reviewed
                              </Button>
                            </NextLink>
                          ) : (
                            <NextLink
                              href={{
                                pathname: "/review/create",
                                query: {
                                  cartItemId: cartItem.id,
                                  mealkitId: cartItem.mealkitId,
                                },
                              }}
                              as={`/review/create`}
                            >
                              <Button as={Link} my="10px" width="100%">
                                Leave a Review
                              </Button>
                            </NextLink>
                          ))}
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
                  (CartItemStatus.OnDelivery || CartItemStatus.Delivered) && (
                  <NextLink
                    href="/order/tracking/[id]"
                    as={`/order/tracking/${order.trackingId}`}
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
