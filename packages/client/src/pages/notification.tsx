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
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import { primaryColor } from "../components/Variables";
import { Wrapper } from "../components/Wrapper/Wrapper";

import {
  CartItemNoti,
  ReadOrderNotisMutation,
  useMeQuery,
  useOrderNotisQuery,
  useReadOrderNotisMutation,
} from "../generated/graphql";
import formatRelativeDate from "../util/formatRelativeDate";
import { withApollo } from "../util/withApollo";
interface Props {}

export const updateAfterRead = (cache: ApolloCache<ReadOrderNotisMutation>) => {
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
};

const Notification = ({}: Props) => {
  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
  const router = useRouter();

  const {
    data: orderNoti,
    loading: orderNotiLoading,
    error: errorNori,
  } = useOrderNotisQuery();

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
    return <Loading />;
  }

  if (meError || errorNori) {
    return <Error />;
  }

  if (!meLoading && !meData?.me) {
    router.push("/");
  }

  // show no noti of noties based on conditions
  const body = (() => {
    if (orderNoti?.orderNotis.length === 0) {
      return <Text>You have no notifications.</Text>;
    }

    return (
      <Box>
        {orderNoti?.orderNotis.map((noti) => (
          <LinkBox key={noti.id} mt={5}>
            <Flex
              alignItems="center"
              mt={2}
              borderRight={noti.read ? "null" : "4px"}
              borderColor={primaryColor}
              borderRadius="4px"
            >
              <Avatar src={noti.avatarHref} mx={2} />

              <Text>
                <span dangerouslySetInnerHTML={{ __html: noti.message }} />{" "}
                <span style={{ color: "#718096" }}>
                  {formatRelativeDate(noti.createdAt)}
                </span>
              </Text>
            </Flex>

            <LinkOverlay href={noti.detailUrl}></LinkOverlay>
          </LinkBox>
        ))}
      </Box>
    );
  })();

  return (
    <Layout heading="notifications">
      <Wrapper>
        <Box mx={3}>
          <Heading fontSize="2xl">Notification</Heading>
          {body}
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Notification);
