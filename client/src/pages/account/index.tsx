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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import { withApollo } from "../../util/withApollo";
import {
  MeDocument,
  MeQuery,
  useAddressQuery,
  useLogoutMutation,
  useMeQuery,
  useSwitchAccountTypeMutation,
} from "../../generated/graphql";
import { useApolloClient, gql } from "@apollo/client";
import { useRouter } from "next/router";
import {
  ChevronDownIcon,
  InfoIcon,
  SpinnerIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { AccountIcon } from "../../components/Icons/AccountIcon";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";

interface indexProps {}

const Account: React.FC<indexProps> = ({}) => {
  const { data: meData, loading } = useMeQuery();
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const [switchAccountType, { data: isCreator }] =
    useSwitchAccountTypeMutation();

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
          <Text>Please </Text>
          <NextLink href="/login">
            <Link fontWeight="700" color="red.400">
              Login
            </Link>
          </NextLink>
        </Box>
        <Box textAlign="center" mt={5}>
          Don't have an account?{" "}
          <NextLink href="/register">
            <Link fontWeight="700" color="red.400">
              Register
            </Link>
          </NextLink>
        </Box>
      </Flex>
    );
  } else {
    body = (
      <Box>
        {meData?.me?.isCreator ? (
          <Heading textAlign="center" fontSize="xl">
            {" "}
            Creator
          </Heading>
        ) : (
          ""
        )}

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

        <Box mt={4}>
          <Heading fontSize="md">My orders</Heading>

          <Flex mt={4}>
            {/* <Box flex={1}>
              <Box textAlign="center">
                <SpinnerIcon />
                <Text>Pending</Text>
              </Box>
            </Box> */}

            <NextLink href="/myshop/order" as="/myshop/order">
              <Link textAlign="center" flex={1}>
                <SpinnerIcon />
                <Text>To deliver</Text>
              </Link>
            </NextLink>

            <NextLink href="/myshop/order" as="/myshop/order">
              <Link textAlign="center" flex={1}>
                <SpinnerIcon />
                <Text>Delivering</Text>
              </Link>
            </NextLink>
            <NextLink href="/myshop/order" as="/myshop/order">
              <Link textAlign="center" flex={1}>
                <SpinnerIcon />
                <Text>Complete</Text>
              </Link>
            </NextLink>

            <NextLink href="/myshop/order" as="/myshop/order">
              <Link textAlign="center" flex={1}>
                <Text>...</Text>
                <Text>Others</Text>
              </Link>
            </NextLink>
          </Flex>
          <Divider mt={2} />

          <Box mt={2}>
            <NextLink href="/" as="/">
              <Link>
                {/* <AccountIcon /> */}
                Order History
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>
        </Box>

        <Box textAlign="left">
          <Box mt={2}>
            <NextLink href="/account/info/" as="/account/info">
              <Link>
                <AccountIcon />
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
                <HeartIcon isactive={false} mr={2} />
                Liked recipe
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>

          <Box mt={2}>
            {" "}
            <Menu>
              <MenuButton
                // as={Button}
                // rightIcon={<ChevronDownIcon />}
                _focus={{ boxShadow: "outline" }}
                textColor={primaryColor}
              >
                Switch Account type
              </MenuButton>
              <MenuList bgColor="white">
                <MenuItem
                  onClick={() =>
                    switchAccountType({
                      variables: { becomeCreator: true },
                      update: (cache, { data }) => {
                        cache.writeFragment({
                          id: "User:" + meData?.me?.id,
                          fragment: gql`
                            fragment __ on User {
                              isCreator
                            }
                          `,
                          data: { isCreator: true },
                        });
                      },
                    })
                  }
                >
                  {" "}
                  Switch to Creator Account
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    switchAccountType({
                      variables: { becomeCreator: false },
                      update: (cache, { data }) => {
                        cache.writeFragment({
                          id: "User:" + meData?.me?.id,
                          fragment: gql`
                            fragment __ on User {
                              isCreator
                            }
                          `,
                          data: { isCreator: false },
                        });
                      },
                    })
                  }
                >
                  Switch to Personal Account
                </MenuItem>
              </MenuList>
            </Menu>
            {/* <Text>{meData?.me?.isCreator ? "Creator" : "Personal"}</Text> */}
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

  return (
    <Layout>
      <Wrapper>{body}</Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Account);
