import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Image, Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Link, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { AddressComponent } from "../../components/Icons/AddressComponent";
import { TrackingDetail } from "../../components/Icons/TrackingDetail";
import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import NextLink from "next/link";
import {
  CartItemStatus,
  useCreatorOrdersLazyQuery,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";
import { OrderArraySkeleton } from "../../components/skeletons/OrderArraySkeleton";
import order from "../order";

//format
// by orderId
// then by creator inside

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const [cartItemStatus, setCartItemStatus] = useState<CartItemStatus>();

  const router = useRouter();
  const { status: statusParam } = router.query;

  const [creatorOrders, { loading, error, data: creatorOrdersData }] =
    useCreatorOrdersLazyQuery();

  console.log({ creatorOrdersData });

  useEffect(() => {
    creatorOrders({
      variables: {
        status: CartItemStatus[statusParam as keyof typeof CartItemStatus],
      },
    });

    setCartItemStatus(
      CartItemStatus[statusParam as keyof typeof CartItemStatus]
    );
  }, [statusParam, creatorOrders]);

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
    <HeadingLayout heading="My order" mt={"40px"}>
      <Flex
        width="100%"
        p={2}
        ml={"auto"}
        align="center"
        justifyContent="flex-end"
        overflowX="scroll"
      >
        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={
            cartItemStatus === "PaymentPending" ? primaryColor : "white"
          }
          color={
            cartItemStatus === "PaymentPending" ? primaryColor : inActiveGray
          }
          mx={1}
          onClick={() => {
            creatorOrders({
              variables: {
                status: CartItemStatus.PaymentPending,
              },
            });
            setCartItemStatus(CartItemStatus.PaymentPending);
          }}
        >
          Not paid
        </Box>

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={cartItemStatus === "ToDeliver" ? primaryColor : "white"}
          color={cartItemStatus === "ToDeliver" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrders({
              variables: {
                status: CartItemStatus.ToDeliver,
              },
            });
            setCartItemStatus(CartItemStatus.ToDeliver);
          }}
        >
          To deliver
        </Box>

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={cartItemStatus === "OnDelivery" ? primaryColor : "white"}
          color={cartItemStatus === "OnDelivery" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrders({
              variables: {
                status: CartItemStatus.OnDelivery,
              },
            });

            setCartItemStatus(CartItemStatus.OnDelivery);
          }}
        >
          Shipping
        </Box>

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={cartItemStatus === "Delivered" ? primaryColor : "white"}
          color={cartItemStatus === "Delivered" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            creatorOrders({
              variables: {
                status: CartItemStatus.Delivered,
              },
            });

            setCartItemStatus(CartItemStatus.Delivered);
          }}
        >
          Delivered
        </Box>
      </Flex>

      {!creatorOrdersData ? (
        <Text>No data</Text>
      ) : (
        <Box bgColor="gray.200">
          {creatorOrdersData.creatorOrders.map((orderItem, index) => (
            <Box bgColor="white" key={index}>
              <Flex m="10px">
                <Box>
                  {orderItem.cartItems.map((cartItem, subindex) => (
                    <Box key={subindex} my="6px">
                      <Flex>
                        <Box flex={1}>
                          <Image
                            src={cartItem.mealkit.thumbnail.url}
                            alt="image"
                            fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                          />
                        </Box>

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
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              </Flex>

              {/* show delivery info and action */}

              <Flex justifyContent="space-between" fontSize="sm">
                <Text>Delivery Fee</Text>
                <Text color="gray.700" fontWeight="normal">
                  {orderItem.deliveryFee}
                </Text>
              </Flex>

              <Divider />
              <Flex justifyContent="space-between" fontSize="sm">
                <Text>Gross</Text>

                <Text>{orderItem.deliveryFee!} </Text>
              </Flex>

              {cartItemStatus !== CartItemStatus.ToDeliver ? null : (
                <Box>
                  <Box p="10px">
                    <Flex alignItems="center">
                      <Avatar
                        margin="auto"
                        m={2}
                        size="xs"
                        src={orderItem.avatar}
                        name="creator avatar"
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
                        pathname: "/order/tracking/create",
                        query: {
                          cartItemIds: orderItem.cartItems.map(
                            (cartItem) => cartItem.id
                          ),

                          ...(orderItem.tracking?.id && {
                            id: orderItem.tracking?.id,
                          }),
                        },
                      }}
                      passHref
                    >
                      <Link>
                        <Button my="10px" color="white">
                          {orderItem.tracking
                            ? "Update tracking"
                            : `Deliver to ${orderItem.username}`}
                        </Button>
                      </Link>
                    </NextLink>
                  </Box>
                </Box>
              )}

              {cartItemStatus !== CartItemStatus.OnDelivery &&
                orderItem.tracking && (
                  <TrackingDetail tracking={orderItem.tracking} />
                )}
            </Box>
          ))}
        </Box>
      )}
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);
