import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import {
  useCreatorCartItemsLazyQuery,
  useCreatorCartItemsQuery,
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

  const [creatorCartitems, { loading, error, data }] =
    useCreatorCartItemsLazyQuery();

  useEffect(() => {
    console.log("effect");
    creatorCartitems({
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
            creatorCartitems({
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
            creatorCartitems({
              variables: {
                status: OrderStatus.ToDeliver,
              },
            });
            setOrderStatus(OrderStatus.ToDeliver);
          }}
        >
          To ship
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
            creatorCartitems({
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
            creatorCartitems({
              variables: {
                status: OrderStatus.Complete,
              },
            });

            setOrderStatus(OrderStatus.Complete);
          }}
        >
          Complete
        </Box>
      </Flex>
      <Wrapper mt={0}>
        {!data ? (
          <Text>No data</Text>
        ) : (
          <Box>
            {data.creatorCartItems.map((cartItem) => (
              <Flex textAlign="center">
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

                  <Heading size="lg">Add Delivery fee and update total</Heading>

                  <Box flex={1} m={1}>
                    <Text>Total: {cartItem.total}</Text>
                  </Box>
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Order);
