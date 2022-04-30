import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LinkButton from "../../components/atoms/LinkButton";
import { CartItemStatusTab } from "../../components/CartItemStatusTab";
import { AddressComponent } from "../../components/Icons/AddressComponent";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { NotPaymentPending } from "../../components/orders/NotPaymentPending";
import { OrderArraySkeleton } from "../../components/skeletons/OrderArraySkeleton";
import { primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import {
  CartItemStatus,
  useAddressQuery,
  useUserOrdersLazyQuery,
} from "../../generated/graphql";
import { mappedCartItemsByCreatorResult } from "../../util/toCartItemsByCreatorMap";
import { withApollo } from "../../util/withApollo";

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const router = useRouter();
  const { status: statusParam } = router.query;

  //useState
  const [cartItemStatus, setCartItemStatus] = useState<CartItemStatus>(
    // CartItemStatus.PaymentPending
    statusParam as CartItemStatus
  );

  console.log({ statusParam });
  console.log({ cartItemStatus });
  const [mappedCartItems, setMappedCartItems] =
    useState<mappedCartItemsByCreatorResult[]>();

  //apollo hooks
  const { data: address, loading: addressLoading } = useAddressQuery();
  const [
    userOrders,
    { data: userOrderData, loading: userOrderLoading, error: userOrderError },
  ] = useUserOrdersLazyQuery();
  console.log("xxx");
  console.log(userOrderData);
  useEffect(() => {
    if (statusParam === CartItemStatus.PaymentPending) {
      userOrders({ variables: { status: CartItemStatus.PaymentPending } });
      setCartItemStatus(
        CartItemStatus[statusParam as keyof typeof CartItemStatus]
      );
      return;
    }

    userOrders({
      variables: {
        status: CartItemStatus[statusParam as keyof typeof CartItemStatus],
      },
    });

    setCartItemStatus(
      CartItemStatus[statusParam as keyof typeof CartItemStatus]
    );
  }, [statusParam, userOrders]);

  if (userOrderLoading || addressLoading) {
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
    <HeadingLayout heading="My order" mt={"40px"} backUrl="/account">
      <CartItemStatusTab
        userOrders={userOrders}
        cartItemStatus={cartItemStatus}
        setCartItemStatus={setCartItemStatus}
      />
      <Box bgColor="blackAlpha.50">
        {/* show address */}

        <Box mt={0}>
          {[
            CartItemStatus.PaymentPending,
            CartItemStatus.ToDeliver,
            CartItemStatus.OnTheWay,
          ].includes(cartItemStatus!) &&
            (address ? (
              <Box mt={2} bgColor="white">
                <Accordion allowToggle={true}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton justifyContent="space-between">
                        <Heading fontSize="md">Delivery Address</Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <AddressComponent address={address?.address} />
                      <LinkButton pathname="/account/address/edit">
                        Edit Address
                      </LinkButton>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            ) : (
              <Box>
                <Text>You have not added your address. Please add one</Text>

                <LinkButton
                  pathname="/account/address/create"
                  leftIcon={<AddIcon />}
                >
                  Add Address
                </LinkButton>
              </Box>
            ))}

          {/* address end */}

          {/* show myorder to pay! => myOrder! */}
          {cartItemStatus !== CartItemStatus.PaymentPending &&
            !userOrderLoading && (
              <NotPaymentPending
                userOrderData={userOrderData}
                cartItemStatus={cartItemStatus}
              />
            )}

          {cartItemStatus === CartItemStatus.PaymentPending &&
            !userOrderLoading && (
              <Box>
                {userOrderData?.userOrders.map((order, index) => (
                  <Box mt={1} p={5} bgColor="white" key={index}>
                    {order.byCreator.map((byCreator, subIndex) => (
                      <Box bgColor="white" key={subIndex}>
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
                                  <Box flex={1}>
                                    <Image
                                      src={cartItem.mealkit.thumbnail.url}
                                      alt="image"
                                      fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                                    />
                                  </Box>

                                  <Box flex={3} m={1} textAlign="left">
                                    <Heading size="md">
                                      {cartItem.mealkit?.name}
                                    </Heading>

                                    <Text>{cartItem.user?.username}</Text>

                                    <Flex
                                      justifyContent="space-between"
                                      fontSize="sm"
                                    >
                                      <Text>Unit price</Text>
                                      <Text
                                        color="gray.700"
                                        fontWeight="normal"
                                      >
                                        {cartItem.mealkit?.price}
                                      </Text>
                                    </Flex>

                                    <Flex
                                      justifyContent="space-between"
                                      fontSize="sm"
                                    >
                                      <Text>Quantity</Text>
                                      <Text
                                        color="gray.700"
                                        fontWeight="normal"
                                      >
                                        x {cartItem.quantity}
                                      </Text>
                                    </Flex>
                                    <Divider />
                                    <Flex
                                      justifyContent="space-between"
                                      fontSize="sm"
                                    >
                                      <Text>Total</Text>
                                      <Text> {cartItem.total} </Text>
                                    </Flex>
                                    <Divider />

                                    <Divider />
                                    <Flex
                                      justifyContent="space-between"
                                      fontSize="sm"
                                    ></Flex>
                                  </Box>
                                </Flex>
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
                        <Divider />
                      </Box>
                    ))}
                    <Flex
                      justifyContent="space-between"
                      fontWeight="bold"
                      mt={5}
                      color={primaryColor}
                    >
                      {" "}
                      <Text>Gross Order</Text>
                      <Text>{order.grossOrder}</Text>
                    </Flex>

                    <LinkButton
                      href={`/payment/${order.paymentId}`}
                      leftIcon={<AddIcon />}
                    >
                      Make a payment
                    </LinkButton>
                  </Box>
                ))}
              </Box>
            )}

          {/* show myorder to be shippepd, shipping, received  use cartItemsbyorderstatus*/}
        </Box>
      </Box>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);
