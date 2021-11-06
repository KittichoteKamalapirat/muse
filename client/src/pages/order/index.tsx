import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/HeadingLayout";

import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import NextLink from "next/link";
import {
  useAddressQuery,
  useCartItemsLazyQuery,
  useMyOrdersLazyQuery,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

export enum OrderStatus {
  PaymentPending = "PaymentPending",
  ToDeliver = "ToDeliver",
  OnDelivery = "OnDelivery",
  Complete = "Complete",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
}

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();

  const router = useRouter();
  const { status: statusParam } = router.query;
  const { data: address, loading: addressLoading } = useAddressQuery();

  // const [myOrders, { loading, error, data }] = useCartItemsLazyQuery();

  const [myOrders, { loading, error, data }] = useMyOrdersLazyQuery();
  console.log("hi");
  console.log(data);

  useEffect(() => {
    myOrders({
      variables: {
        status: OrderStatus[statusParam as keyof typeof OrderStatus],
      },
    });

    setOrderStatus(OrderStatus[statusParam as keyof typeof OrderStatus]);
  }, [statusParam]);

  if (loading) {
    return <Text>loading...</Text>;
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
            myOrders({
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
            myOrders({
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
            myOrders({
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
          borderColor={orderStatus === "Complete" ? primaryColor : "white"}
          color={orderStatus === "Complete" ? primaryColor : inActiveGray}
          mx={1}
          Complete
          onClick={() => {
            myOrders({
              variables: {
                status: OrderStatus.Complete,
              },
            });

            setOrderStatus(OrderStatus.Complete);
          }}
        >
          Rate
        </Box>
      </Flex>
      <Wrapper mt={0}>
        <Box mt={2}>
          <Heading fontSize="md">Delivery Address</Heading>
          <Text d="inline">{address?.address.line1}</Text>
          <Text d="inline">{address?.address.line2}, </Text>
          <Text d="inline">{address?.address.subdistrict} </Text>
          <Text>{address?.address.district} </Text>
          <Text d="inline">{address?.address.province}</Text>
          {/* <Text>{address?.address.country}</Text> */}
          <Text d="inline"> {address?.address.postcode}</Text>
        </Box>

        {!data ? (
          <Text>No data</Text>
        ) : (
          <Box>
            {data.myOrders.map((order, index) => (
              <Box key={index}>
                {/* <Text>{order.grossOrder}</Text> */}

                {order.cartItems.map((cartItem, i) => (
                  <Flex textAlign="center" key={i}>
                    <Box flex={1} m={1}>
                      {!cartItem.mealkit?.images ? null : (
                        <Image
                          src={cartItem.mealkit?.images[0]}
                          alt="image"
                          fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                        />
                      )}
                    </Box>

                    <Box flex={3} m={1} textAlign="left">
                      <Heading size="md">{cartItem.mealkit?.name}</Heading>

                      <Box flex={1} m={1}>
                        <Text>{cartItem.quantity}</Text>
                      </Box>

                      <Text color="gray.700" fontSize="md" fontWeight="normal">
                        quantity: {cartItem.quantity}
                      </Text>
                      <Heading size="lg">
                        Add Delivery fee and update total
                      </Heading>

                      <Box flex={1} m={1}>
                        <Text>Total: {cartItem.total}</Text>
                      </Box>
                    </Box>
                  </Flex>
                ))}
                <Text>{order.payment?.amount}</Text>

                <Flex justifyContent="flex-end">
                  <NextLink
                    href={{
                      pathname: "/payment/[id]",
                      query: {
                        id: order.payment?.id,
                      },
                    }}
                    as={`/payment/${order.payment?.id}`}
                    // as={{
                    //   pathname: "/payment/[id]",
                    //   query: {
                    //     id: order.payment?.id,
                    //   },
                    // }}
                  >
                    <Link>
                      <Button colorScheme="teal">Pay now</Button>
                    </Link>
                  </NextLink>
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);
