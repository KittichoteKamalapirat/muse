import { Button } from "@chakra-ui/button";
import { Image, Img } from "@chakra-ui/image";
import {
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/HeadingLayout";

import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import NextLink from "next/link";
import {
  CartItem,
  useAddressQuery,
  useCartItemsByOrderStatusLazyQuery,
  useCartItemsLazyQuery,
  useMyOrdersLazyQuery,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  mappedCartItemsByOrderResult,
  toMyOrderByOrderIdMap,
} from "../../util/toMyOrderByOrderIdMap";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import order from "../myshop/order";
import { AddressComponent } from "../../components/Icons/AddressComponent";
import { TrackingDetail } from "../../components/Icons/TrackingDetail";
import {
  mappedCartItemsByCreatorResult,
  toCartItemsByCreatorMap,
} from "../../util/toCartItemsByCreatorMap";
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
  const router = useRouter();
  const { status: statusParam } = router.query;

  //useState
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();
  const [mappedCartItems, setMappedCartItems] =
    useState<mappedCartItemsByCreatorResult[]>();

  //apollo hooks
  const { data: address, loading: addressLoading } = useAddressQuery();
  const [
    myOrders,
    { data: myOrderData, loading: myOrderLoading, error: myOrderError },
  ] = useMyOrdersLazyQuery();
  console.log({ myOrderData });

  const [cartItemsByOrderStatus, { loading, error, data }] =
    useCartItemsByOrderStatusLazyQuery();

  console.log(myOrderData?.myOrders);

  //useEffect

  useEffect(() => {
    if (data?.cartItemsByOrderStatus) {
      const mappedCartItems: mappedCartItemsByCreatorResult[] =
        toCartItemsByCreatorMap(data.cartItemsByOrderStatus);
      setMappedCartItems(mappedCartItems);
    }
  }, [data]);

  useEffect(() => {
    if (statusParam === OrderStatus.PaymentPending) {
      myOrders({ variables: { status: OrderStatus.PaymentPending } });
      setOrderStatus(OrderStatus[statusParam as keyof typeof OrderStatus]);
      return;
    }

    cartItemsByOrderStatus({
      variables: {
        status: OrderStatus[statusParam as keyof typeof OrderStatus],
      },
    });

    setOrderStatus(OrderStatus[statusParam as keyof typeof OrderStatus]);
  }, [statusParam]);

  if (loading || myOrderLoading) {
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
      >
        <Box
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
            myOrders({ variables: { status: OrderStatus.PaymentPending } });

            cartItemsByOrderStatus({
              variables: {
                status: OrderStatus.PaymentPending,
              },
            });

            setOrderStatus(OrderStatus.PaymentPending);
          }}
        >
          To pay
        </Box>

        <Box
          flex={1}
          textAlign="center"
          borderBottom={1}
          borderStyle="solid"
          borderColor={orderStatus === "ToDeliver" ? primaryColor : "white"}
          color={orderStatus === "ToDeliver" ? primaryColor : inActiveGray}
          mx={1}
          onClick={() => {
            cartItemsByOrderStatus({
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
            cartItemsByOrderStatus({
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
          Delivered
          onClick={() => {
            cartItemsByOrderStatus({
              variables: {
                status: OrderStatus.Delivered,
              },
            });

            setOrderStatus(OrderStatus.Delivered);
          }}
        >
          Rate
        </Box>
      </Flex>

      <Wrapper mt={0}>
        {[
          OrderStatus.PaymentPending,
          OrderStatus.ToDeliver,
          OrderStatus.OnDelivery,
        ].includes(orderStatus!) &&
          (address ? (
            <Box mt={2}>
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
                    <NextLink href="/account/address/edit">
                      <Link>
                        <Button colorScheme="teal" my="10px">
                          Edit Address
                        </Button>
                      </Link>
                    </NextLink>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          ) : (
            <Box>
              <Text>You have not added your address. Please add one</Text>
              <NextLink
                href="/account/address/create"
                as="/account/address/create"
              >
                <Button colorScheme="teal" leftIcon={<AddIcon />}>
                  Add address
                </Button>
              </NextLink>
            </Box>
          ))}

        {orderStatus === OrderStatus.PaymentPending && !myOrderLoading && (
          <Box>
            {myOrderData?.myOrders.map((order, index) => (
              <Box>
                {toCartItemsByCreatorMap(order.cartItems).map((orderItem) => (
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
                                <Heading size="md">
                                  {cartItem.mealkit?.name}
                                </Heading>

                                <Text>{cartItem.user?.username}</Text>

                                <Flex
                                  justifyContent="space-between"
                                  fontSize="sm"
                                >
                                  <Text>Unit price</Text>
                                  <Text color="gray.700" fontWeight="normal">
                                    {cartItem.mealkit?.price}
                                  </Text>
                                </Flex>

                                <Flex
                                  justifyContent="space-between"
                                  fontSize="sm"
                                >
                                  <Text>Quantity</Text>
                                  <Text color="gray.700" fontWeight="normal">
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
                                <Flex
                                  justifyContent="space-between"
                                  fontSize="sm"
                                >
                                  <Text>Delivery Fee</Text>
                                  <Text color="gray.700" fontWeight="normal">
                                    {cartItem.mealkit?.deliveryFee}
                                  </Text>
                                </Flex>

                                <Divider />
                                <Flex
                                  justifyContent="space-between"
                                  fontSize="sm"
                                >
                                  <Text>Gross</Text>

                                  <Text>
                                    {cartItem.total +
                                      cartItem.mealkit?.deliveryFee!}{" "}
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

                <Flex justifyContent="space-between" fontSize="sm">
                  <Text>Total Payment Amount</Text>
                  <Text color="gray.700" fontWeight="normal">
                    {order.grossOrder}
                  </Text>
                </Flex>

                <NextLink
                  href="/payment/[id]"
                  as={`/payment/${order.paymentId}`}
                >
                  <Link>
                    <Button colorScheme="teal" my="10px">
                      Make a payment
                    </Button>
                  </Link>
                </NextLink>
              </Box>
            ))}
          </Box>
        )}

        {/* cartItems map */}
        {orderStatus != OrderStatus.PaymentPending &&
          mappedCartItems?.map((orderItem, index) => (
            <Box bgColor="white">
              <LinkBox>
                <Flex alignItems="center">
                  <Avatar
                    margin="auto"
                    m={2}
                    size="xs"
                    src={orderItem.avatar}
                    alt="creator avatar"
                  />
                  <LinkOverlay href={`/user/${orderItem.creatorId}`}>
                    <Text>{orderItem.creatorName}</Text>
                  </LinkOverlay>

                  <ChevronRightIcon mt="2px" />
                </Flex>
              </LinkBox>

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
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);

// {!data ? (
//   <Text>No data</Text>
// ) : (
//   <Box>
//     {data.myOrders.map((order, index) => (
//       <Box key={index}>
//         {/* <Text>{order.grossOrder}</Text> */}

//         {order.cartItems.map((cartItem, i) => (
//           <Flex textAlign="center" key={i}>
//             <Box flex={1} m={1}>
//               {!cartItem.mealkit?.images ? null : (
//                 <Image
//                   src={cartItem.mealkit?.images[0]}
//                   alt="image"
//                   fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
//                 />
//               )}
//             </Box>

//             <Box flex={3} m={1} textAlign="left">
//               <Heading size="md">{cartItem.mealkit?.name}</Heading>

//               <Box flex={1} m={1}>
//                 <Text>{cartItem.quantity}</Text>
//               </Box>

//               <Text color="gray.700" fontSize="md" fontWeight="normal">
//                 quantity: {cartItem.quantity}
//               </Text>
//               <Heading size="lg">
//                 Add Delivery fee and update total
//               </Heading>

//               <Box flex={1} m={1}>
//                 <Text>Total: {cartItem.total}</Text>
//               </Box>
//             </Box>
//           </Flex>
//         ))}
//         <Text>{order.payment?.amount}</Text>

//         <Flex justifyContent="flex-end">
//           <NextLink
//             href={{
//               pathname: "/payment/[id]",
//               query: {
//                 id: order.payment?.id,
//               },
//             }}
//             as={`/payment/${order.payment?.id}`}
//           >
//             <Link>
//               <Button colorScheme="teal">Pay now</Button>
//             </Link>
//           </NextLink>
//         </Flex>
//       </Box>
//     ))}
//   </Box>
// )}
