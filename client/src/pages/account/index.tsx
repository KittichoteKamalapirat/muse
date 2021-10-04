import React from "react";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { withApollo } from "../../util/withApollo";
import {
  useAddressQuery,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { InfoIcon, StarIcon } from "@chakra-ui/icons";
import { AccountIcon } from "../../components/Icons/AccountIcon";

interface indexProps {}

const Account: React.FC<indexProps> = ({}) => {
  const { data: meData, loading } = useMeQuery();
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  let body;
  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  } else if (!loading && !meData?.me) {
    body = (
      <Flex
        minH="500px"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {" "}
        <Box textAlign="center">
          <Text>You are not signed in</Text>
          <Text>
            Please{" "}
            <NextLink href="/login">
              <Link fontWeight="700" color="red.400">
                Login
              </Link>
            </NextLink>
          </Text>
        </Box>
        <Box textAlign="center" mt={5}>
          <Text>
            Don't have an account?{" "}
            <NextLink href="/register">
              <Link fontWeight="700" color="red.400">
                Register
              </Link>
            </NextLink>
          </Text>
        </Box>
      </Flex>
    );
  } else {
    body = (
      <Box>
        <Text textAlign="center"> Account</Text>
        <Box>
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

        <Box ml={4} textAlign="left">
          <Box mt={2}>
            <NextLink href="/account/info/" as="/account/info">
              <Link>
                <AccountIcon mr={2} />
                ข้อมูลบัญชี
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>

          <Box mt={2}>
            <NextLink href="/account/address/" as="/account/address">
              <Link>
                <InfoIcon mr={2} />
                ที่อยู่จัดส่ง
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>

          <Box mt={2}>
            <NextLink href="/like" as="/like">
              <Link>
                <StarIcon mr={2} />
                Liked recipe
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>
          <Flex justifyContent="center">
            <Button
              onClick={async () => {
                await logout();
                router.push("/");
                await apolloClient.resetStore();

                // router.reload();
              }}
              isLoading={logoutLoading}
              mt={10}
            >
              logout
            </Button>
          </Flex>
        </Box>
      </Box>
    );
  }

  return <Layout>{body}</Layout>;
};

export default withApollo({ ssr: false })(Account);
