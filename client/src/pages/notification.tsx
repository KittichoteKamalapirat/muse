import { ApolloCache } from "@apollo/client";
import { Avatar } from "@chakra-ui/avatar";
import { Img } from "@chakra-ui/image";
import {
  Box,
  Divider,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { dataURItoBlob } from "dropzone";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { gql } from "urql";
import { Layout } from "../components/Layout/Layout";
import {
  activeColor,
  inactiveColor,
  primaryColor,
} from "../components/Variables";
import { Wrapper } from "../components/Wrapper";
import {
  CartItemNoti,
  CartItemStatus,
  OrderNotisDocument,
  ReadOrderNotisMutation,
  ToggleFollowMutation,
  useMeQuery,
  useOrderNotisQuery,
  useReadOrderNotisMutation,
} from "../generated/graphql";
import { withApollo } from "../util/withApollo";
interface NotificationProps {}

export const updateAfterRead = (cache: ApolloCache<ReadOrderNotisMutation>) => {
  console.log("hi1");

  cache.modify({
    fields: {
      orderNotis(existingNotis = []) {
        console.log({ existingNotis });
        return existingNotis.map((noti: CartItemNoti) => {
          // console.log({ ...noti, read: true });
          return { read: true }; //somehow this works
          // return { ...noti, read: true };
          // return "x";
        });
      },
    },
  });
  console.log("hi2");
};

const Notification: React.FC<NotificationProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();

  const {
    data: orderNoti,
    loading: orderNotiLoading,
    error: errorNori,
  } = useOrderNotisQuery({});

  const [readOrderNotis] = useReadOrderNotisMutation();
  // readOrderNotis();

  useEffect(() => {
    setTimeout(() => {
      readOrderNotis({
        update: (cache) => updateAfterRead(cache),
      });
    }, 1000);
  }, []);

  if (meLoading || orderNotiLoading) {
    return <Text>Loading</Text>;
  }

  if (!meLoading && !meData?.me) {
    router.push("/");
  }

  return (
    <Layout>
      <Wrapper>
        <Box mx={3}>
          <Heading fontSize="2xl">Notification</Heading>
          <Box mt={5}>
            {" "}
            <Heading fontSize="lg">Order Updates</Heading>
            {orderNoti?.orderNotis.map((noti, index) => (
              <LinkBox>
                <Flex
                  key={index}
                  mt={2}
                  borderRight={noti.read ? "null" : "4px"}
                  borderColor={primaryColor}
                  borderRadius="4px"
                >
                  <Avatar src={noti.cartItem.mealkit.images![0]} mx={2} />
                  {/* {noti.cartItem.status === CartItemStatus.PaymentPending && (
                  <>
                    <Text>
                      You received an order for{" "}
                      <Text fontWeight="bold" d="inline">
                        {noti.cartItem.quantity} {noti.cartItem.mealkit.name}
                      </Text>{" "}
                      from{" "}
                      <Text fontWeight="bold" d="inline">
                        {noti.cartItem.user?.username}.
                      </Text>{" "}
                      <Text d="inline">Waiting for payment.</Text>
                    </Text>
                  </>
                )}

                {noti.cartItem.status === CartItemStatus.ToDeliver && (
                  <>
                    <Text>
                      <Text fontWeight="bold" d="inline">
                        {noti.cartItem.user?.username}.
                      </Text>{" "}
                      has completed the payment for{" "}
                      <Text fontWeight="bold" d="inline">
                        {noti.cartItem.quantity} {noti.cartItem.mealkit.name}
                      </Text>{" "}
                      <Text d="inline">Please deliver soon.</Text>
                    </Text>
                  </>
                )} */}

                  <Text>{noti.message}</Text>
                </Flex>
                <LinkOverlay href="/myshop/order?status=ToDeliver"></LinkOverlay>
              </LinkBox>
            ))}
          </Box>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Notification);
