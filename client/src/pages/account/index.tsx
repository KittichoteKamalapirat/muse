import React from "react";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import { Box, Button, IconButton, Image, Link, Text } from "@chakra-ui/react";
import { withApollo } from "../../util/withApollo";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface indexProps {}

const Account: React.FC<indexProps> = ({}) => {
  const { data: meData, loading } = useMeQuery();

  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box>
        <Text textAlign="center"> Account</Text>
        <Box>
          {" "}
          <Image
            margin="auto"
            width="50%"
            borderRadius="50%"
            border={5}
            borderStyle="solid"
            borderColor="red.400"
            src={meData?.me?.avatar}
            alt="Segun Adebayo"
          />{" "}
        </Box>
        <Box textAlign="center">
          <NextLink href="/account/address/" as="/account/address">
            <Link>ที่อยู่จัดส่ง</Link>
          </NextLink>

          <Button
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
              // router.reload();
            }}
            isLoading={logoutLoading}
          >
            logout
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Account);
