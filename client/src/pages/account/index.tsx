import React from "react";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Avatar,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Center, Heading } from "@chakra-ui/layout";
import { withApollo } from "../../util/withApollo";
import {
  CartItemStatus,
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
import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import SvgToPay from "../../components/svgComponents/ToPay";
import SvgToDeliver from "../../components/svgComponents/ToDeliver";
import SvgToRate from "../../components/svgComponents/ToRate";
import SvgOnDelivery from "../../components/svgComponents/OnDelivery";

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

        <Center mt={8}>
          <Avatar
            margin="auto"
            m={2}
            size="2xl"
            src={meData?.me?.avatar}
            alt="creator avatar"
            border={5}
            borderStyle="solid"
            borderColor="red.400"
            bg="white"
          />
        </Center>

        <Box mt={4}>
          <Heading fontSize="md">My orders</Heading>

          <Flex mt={4}>
            <NextLink
              href={{
                pathname: "/order",
                query: { status: CartItemStatus.PaymentPending },
              }}
            >
              <Link textAlign="center" flex={1}>
                <Center>
                  <SvgToPay />
                </Center>

                <Text>To pay</Text>
              </Link>
            </NextLink>

            <NextLink
              href={{
                pathname: "/order",
                query: { status: CartItemStatus.ToDeliver },
              }}
            >
              <Link textAlign="center" flex={1}>
                <Center>
                  <SvgToDeliver />
                </Center>

                <Text>To deliver</Text>
              </Link>
            </NextLink>

            <NextLink
              href={{
                pathname: "/order",
                query: { status: CartItemStatus.OnDelivery },
              }}
            >
              <Link textAlign="center" flex={1}>
                <Center>
                  <SvgOnDelivery />
                </Center>

                <Text>To recieve</Text>
              </Link>
            </NextLink>
            <NextLink
              href={{
                pathname: "/order",
                query: { status: CartItemStatus.PaymentPending },
              }}
            >
              <Link textAlign="center" flex={1}>
                <Center>
                  <SvgToRate />
                </Center>

                <Text>Rate</Text>
              </Link>
            </NextLink>
          </Flex>
          <Divider mt={2} />

          <Box mt={2}>
            <NextLink
              href={{
                pathname: "/order",
                query: { status: CartItemStatus.Cancelled },
              }}
            >
              <Link>
                <Text>Purchase history</Text>
              </Link>
            </NextLink>
          </Box>
          <Divider mt={2} />
        </Box>

        <Box textAlign="left" mt={4}>
          <Heading fontSize="md">Account Info</Heading>
          <Box mt={2}>
            <NextLink href="/account/info/" as="/account/info">
              <Link>
                <AccountIcon />
                My profile
                {/* ข้อมูลบัญชี */}
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
          <Text fontSize="sm" color={inActiveGray}>
            Current: {meData?.me?.isCreator ? "Creator" : "Personal"} Account
          </Text>
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
