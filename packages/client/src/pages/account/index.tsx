import { gql, useApolloClient } from "@apollo/client";
import { Center, Heading } from "@chakra-ui/layout";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/atoms/Button";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { Layout } from "../../components/Layout/Layout";
import { Loading } from "../../components/skeletons/Loading";
import SvgAccountIcon from "../../components/svgComponents/AccountIcon";
import SvgBoxIcon from "../../components/svgComponents/BoxIcon";
import SvgPinIcon from "../../components/svgComponents/PinIcon";
import SvgRateIcon from "../../components/svgComponents/RateIcon";
import SvgTruckIcon from "../../components/svgComponents/TruckIcon";
import SvgWalletIcon from "../../components/svgComponents/WalletIcon";
import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { ContentWrapper } from "../../components/Wrapper/ContentWrapper";
import {
  CartItemStatus,
  useLogoutMutation,
  useMeQuery,
  useSwitchAccountTypeMutation,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

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
        <Loading />
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
          <NextLink href="/login" passHref>
            <Link fontWeight="700" color="red.400">
              Login
            </Link>
          </NextLink>
        </Box>
        <Box textAlign="center" mt={5}>
          Don&apos;t have an account?{" "}
          <NextLink href="/register" passHref>
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
        <Heading textAlign="center" fontSize="2xl">
          {meData?.me?.username}
          {meData?.me?.isCreator && <Text color="brand">(Creator)</Text>}
        </Heading>

        <Center mt={8}>
          <LinkBox>
            <Avatar
              margin="auto"
              m={2}
              size="2xl"
              src={meData?.me?.avatar}
              name="creator avatar"
              border={5}
              borderStyle="solid"
              borderColor="red.400"
              bg="white"
            />

            <LinkOverlay href="/account/avatar" />
          </LinkBox>
        </Center>

        <Box mt={4}>
          <Heading fontSize="md">My orders</Heading>

          <Flex mt={4} justifyContent="space-around">
            <LinkBox>
              <NextLink
                href={{
                  pathname: "/order",
                  query: { status: CartItemStatus.PaymentPending },
                }}
                passHref
              >
                <LinkOverlay textAlign="center" flex={1}>
                  <Center>
                    <SvgWalletIcon />
                  </Center>

                  <Text>To pay</Text>
                </LinkOverlay>
              </NextLink>
            </LinkBox>

            <LinkBox>
              <NextLink
                href={{
                  pathname: "/order",
                  query: { status: CartItemStatus.ToDeliver },
                }}
                passHref
              >
                <LinkOverlay textAlign="center" flex={1}>
                  <Center>
                    <SvgBoxIcon />
                  </Center>

                  <Text>To deliver</Text>
                </LinkOverlay>
              </NextLink>
            </LinkBox>

            <LinkBox>
              <NextLink
                href={{
                  pathname: "/order",
                  query: { status: CartItemStatus.OnTheWay },
                }}
                passHref
              >
                <LinkOverlay textAlign="center" flex={1}>
                  <Center>
                    <SvgTruckIcon fontSize="1.2rem" />
                  </Center>

                  <Text>To recieve</Text>
                </LinkOverlay>
              </NextLink>
            </LinkBox>

            <LinkBox>
              <NextLink
                href={{
                  pathname: "/order",
                  query: { status: CartItemStatus.Received },
                }}
                passHref
              >
                <LinkOverlay textAlign="center" flex={1}>
                  <Center>
                    <SvgRateIcon fontSize="1.2rem" />
                  </Center>

                  <Text>Rate</Text>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </Flex>
          <Divider mt={2} />

          <Box mt={2}>
            <NextLink
              href={{
                pathname: "/order",
                query: { status: CartItemStatus.Cancelled },
              }}
              passHref
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

          <Flex>
            <LinkBox flex={1}>
              <Flex
                flexDirection="column"
                alignItems="center"
                boxShadow="xs"
                p={4}
                m={1}
                rounded="md"
              >
                <SvgAccountIcon />
                <NextLink href="/account/info/" as="/account/info" passHref>
                  <LinkOverlay>
                    <Text fontSize="md">My profile</Text>
                  </LinkOverlay>
                </NextLink>
              </Flex>
            </LinkBox>

            <LinkBox flex={1}>
              <Flex
                flexDirection="column"
                alignItems="center"
                boxShadow="xs"
                p={4}
                m={1}
                rounded="md"
              >
                <SvgPinIcon />
                <NextLink
                  href="/account/address/"
                  as="/account/address"
                  passHref
                >
                  <LinkOverlay>
                    <Text fontSize="md">Address</Text>
                  </LinkOverlay>
                </NextLink>
              </Flex>
            </LinkBox>

            <LinkBox flex={1}>
              <Flex
                flexDirection="column"
                alignItems="center"
                boxShadow="xs"
                p={4}
                m={1}
                rounded="md"
              >
                <HeartIcon color="#eb5757" />
                <NextLink href="/like" as="/like" passHref>
                  <LinkOverlay>
                    <Text fontSize="md">Liked</Text>
                  </LinkOverlay>
                </NextLink>
              </Flex>
            </LinkBox>
          </Flex>

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
              }}
              isLoading={logoutLoading}
              variant="outline"
              color="black"
              width="min-content"
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
      <Wrapper>
        <ContentWrapper>{body}</ContentWrapper>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Account);
