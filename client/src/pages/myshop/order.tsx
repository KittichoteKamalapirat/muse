import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Image, Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Link, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { AddressComponent } from "../../components/Icons/AddressComponent";
import { TrackingDetail } from "../../components/Icons/TrackingDetail";
import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import NextLink from "next/link";
import {
  CartItem,
  useCreatorOrderItemsLazyQuery,
  useCreatorOrderItemsQuery,
} from "../../generated/graphql";
import {
  mappedCartItemsByOrderResult,
  toMyOrderByOrderIdMap,
} from "../../util/toMyOrderByOrderIdMap";
import { withApollo } from "../../util/withApollo";
import { OrderArraySkeleton } from "../../components/skeletons/OrderArraySkeleton";

export enum OrderStatus {
  PaymentPending = "PaymentPending",
  ToDeliver = "ToDeliver",
  OnDelivery = "OnDelivery",
  Delivered = "Delivered",
  Received = "Received",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
}

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();
  const [mappedToItemsByOrderId, setMappedToItemsByOrderId] =
    useState<mappedCartItemsByOrderResult[]>();

  const router = useRouter();
  const { status: statusParam } = router.query;

  const [creatorOrderitems, { loading, error, data }] =
    useCreatorOrderItemsLazyQuery();

  useEffect(() => {
    creatorOrderitems({
      variables: {
        status: OrderStatus[statusParam as keyof typeof OrderStatus],
      },
    });

    setOrderStatus(OrderStatus[statusParam as keyof typeof OrderStatus]);
  }, [statusParam]);

  useEffect(() => {
    if (data) {
      //if no this -> cannot read map of undefined

      const mapped = toMyOrderByOrderIdMap(
        data?.creatorOrderItems as CartItem[]
      );
      setMappedToItemsByOrderId(mapped);
      console.log({ mapped });
    }
  }, [data]);

  if (loading) {
    return (
      <Wrapper>
        {[
          ...Array(10).map((item, index) => (
            <Box key={index}>
              <OrderArraySkeleton />
            </Box>
          )),
        ]}
      </Wrapper>
    );
  }
  return (
    <HeadingLayout heading="My order" mt={10}>
      <Flex
        width="100%"
        p={2}
        ml={"auto"}
        align="center"
        justifyContent="flex-end"
        overflowX="scroll"
      >
        {/* <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={
            orderStatus === "PaymentPending" ? primaryColor : "white"
          }
          color={orderStatus === "PaymentPending" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrderitems({
              variables: {
                status: OrderStatus.PaymentPending,
              },
            });
            setOrderStatus(OrderStatus.PaymentPending);
          }}
        >
          Not paid
        </Box> */}

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={orderStatus === "ToDeliver" ? primaryColor : "white"}
          color={orderStatus === "ToDeliver" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrderitems({
              variables: {
                status: OrderStatus.ToDeliver,
              },
            });
            setOrderStatus(OrderStatus.ToDeliver);
          }}
        >
          To deliver
        </Box>

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={orderStatus === "OnDelivery" ? primaryColor : "white"}
          color={orderStatus === "OnDelivery" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrderitems({
              variables: {
                status: OrderStatus.OnDelivery,
              },
            });

            setOrderStatus(OrderStatus.OnDelivery);
          }}
        >
          Shipping
        </Box>

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={orderStatus === "Delivered" ? primaryColor : "white"}
          color={orderStatus === "Delivered" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrderitems({
              variables: {
                status: OrderStatus.Delivered,
              },
            });

            setOrderStatus(OrderStatus.Delivered);
          }}
        >
          Delivered
        </Box>
      </Flex>

      {!data ? (
        <Text>No data</Text>
      ) : (
        <Box bgColor="gray.200">
          {mappedToItemsByOrderId?.map((orderItem, index) => (
            <Box bgColor="white">
              <Flex key={index} m="10px">
                <Box>
                  {orderItem.cartItems.map((cartItem, subindex) => (
                    <Box key={subindex} my="6px">
                      <Flex>
                        {!cartItem.mealkit?.images ? null : (
                          <Box flex={1}>
                            <Img
                              src={cartItem.mealkit.images[0]}
                              alt="image"
                              fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                            />
                          </Box>
                        )}

                        <Box flex={3} m={1} textAlign="left">
                          <Heading size="md">{cartItem.mealkit?.name}</Heading>

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
                          <Flex justifyContent="space-between" fontSize="sm">
                            <Text>Total</Text>
                            <Text> {cartItem.total} </Text>
                          </Flex>
                          <Divider />
                          <Flex justifyContent="space-between" fontSize="sm">
                            <Text>Delivery Fee</Text>
                            <Text color="gray.700" fontWeight="normal">
                              {cartItem.mealkit?.deliveryFee}
                            </Text>
                          </Flex>

                          <Divider />
                          <Flex justifyContent="space-between" fontSize="sm">
                            <Text>Gross</Text>

                            <Text>
                              {cartItem.total + cartItem.mealkit?.deliveryFee!}{" "}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              </Flex>

              {/* show delivery info and action */}
              {orderStatus !== OrderStatus.ToDeliver ? null : (
                <Box bgColor="teal.50">
                  <Box p="10px">
                    <Flex alignItems="center">
                      <Avatar
                        margin="auto"
                        m={2}
                        size="xs"
                        src={orderItem.avatar}
                        alt="creator avatar"
                      />
                      <Text>{orderItem.username}</Text>
                    </Flex>

                    {/* delivery info */}
                    <Box>
                      <Heading fontSize="md">Address Info</Heading>
                      {orderItem.address ? (
                        <AddressComponent address={orderItem.address} />
                      ) : null}
                    </Box>

                    <Box>Delivery Fee: {orderItem.deliveryFee}</Box>
                    <NextLink
                      href={{
                        pathname: "/order/create-tracking",
                        query: { orderId: orderItem.orderId },
                      }}
                      //  as={`/create-tracking`}
                    >
                      <Link>
                        <Button colorScheme="teal" my="10px">
                          Deliver to {orderItem.username}
                        </Button>
                      </Link>
                    </NextLink>
                  </Box>
                </Box>
              )}

              {orderStatus !== OrderStatus.OnDelivery ? null : (
                <TrackingDetail orderItem={orderItem} />
              )}
            </Box>
          ))}
        </Box>
      )}
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);
