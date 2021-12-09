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
import { Layout } from "../components/Layout/Layout";
import {
  activeColor,
  inactiveColor,
  primaryColor,
} from "../components/Variables";
import { Wrapper } from "../components/Wrapper";
import {
  CartItemStatus,
  useMeQuery,
  useOrderNotisQuery,
  useReadOrderNotisMutation,
} from "../generated/graphql";
import { withApollo } from "../util/withApollo";
interface NotificationProps {}

const Notification: React.FC<NotificationProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();
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
      readOrderNotis();
    }, 5000);
  }, []);

  if (meLoading || orderNotiLoading) {
    return <Text>Loading</Text>;
  }

  if (!meLoading && !meData?.me) {
    router.push("/");
  }

  return (
    <Layout>
      <Box mx={3}>
        <Heading>My Notification</Heading>
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
    </Layout>
  );
};

export default withApollo({ ssr: false })(Notification);
