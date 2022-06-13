import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LinkButton from "../../../components/atoms/LinkButton";
import { CartItemStatusTab } from "../../../components/CartItemStatusTab";
import { AddressComponent } from "../../../components/Icons/AddressComponent";
import { TrackingDetail } from "../../../components/Icons/TrackingDetail";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Error } from "../../../components/skeletons/Error";
import { OrderArraySkeleton } from "../../../components/skeletons/OrderArraySkeleton";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  CartItemStatus,
  useCreatorOrdersLazyQuery,
} from "../../../generated/graphql";
import { withApollo } from "../../../util/withApollo";

//format
// by orderId
// then by creator inside

const Order = () => {
  const router = useRouter();
  const { status: statusParam } = router.query;

  const [cartItemStatus, setCartItemStatus] = useState<CartItemStatus>(
    statusParam as CartItemStatus
  );

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

  if (error) {
    <Error text={error.message} />;
  }

  return (
    <HeadingLayout heading="My order" mt={"40px"}>
      <CartItemStatusTab
        userOrders={creatorOrders}
        cartItemStatus={cartItemStatus}
        setCartItemStatus={setCartItemStatus}
        isForCreator={true}
      />

      <XWrapper>
        {/* address */}

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
                              fallbackSrc="oops.png"
                            />
                          </Box>

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

                  <Text>
                    {orderItem.deliveryFee +
                      orderItem.cartItems.reduce(
                        (prev, curr) => prev + curr.total,
                        0
                      )}{" "}
                  </Text>
                </Flex>

                {[
                  CartItemStatus.PaymentPending,
                  CartItemStatus.ToDeliver,
                  CartItemStatus.OnTheWay,
                ].includes(cartItemStatus!) && (
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

                      <LinkButton
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
                      >
                        {orderItem.tracking
                          ? "Update tracking"
                          : `Deliver to ${orderItem.username}`}
                      </LinkButton>
                    </Box>
                  </Box>
                )}

                {cartItemStatus !== CartItemStatus.OnTheWay &&
                  orderItem.tracking && (
                    <TrackingDetail tracking={orderItem.tracking} />
                  )}
              </Box>
            ))}
          </Box>
        )}
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);
