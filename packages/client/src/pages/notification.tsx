import { ApolloCache } from "@apollo/client";
import { Avatar } from "@chakra-ui/avatar";
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { primaryColor } from "../components/Variables";
import { Wrapper } from "../components/Wrapper";
import {
  CartItemNoti,
  ReadOrderNotisMutation,
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
          return { read: true }; //somehow this works
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

  console.log(orderNoti);

  const [readOrderNotis] = useReadOrderNotisMutation();
  // readOrderNotis();

  useEffect(() => {
    setTimeout(() => {
      readOrderNotis({
        update: (cache) => updateAfterRead(cache),
      });
    }, 1000);
  }, [readOrderNotis]);

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
            {orderNoti?.orderNotis.map((noti) => (
              <LinkBox key={noti.id}>
                <Flex
                  mt={2}
                  borderRight={noti.read ? "null" : "4px"}
                  borderColor={primaryColor}
                  borderRadius="4px"
                >
                  <Avatar src={noti.cartItem.mealkit.thumbnail.url} mx={2} />

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
