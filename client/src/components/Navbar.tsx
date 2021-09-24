import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import { useRouter } from "next/router";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(), //we paused this because it will return null anyway (no cookie, without cookie forwarding)
    // no need to request in the browser side, just on client, but the server still knows anyway due to cookei forwarding
  });
  // this is SSR so browser -> next.js -> graphql

  // without cookie  forwarding, and pause in the server
  //  server(graphQL) does not know who is me (no cookie), so don't know who voted (in post)
  // nextJS knows -> so know it's Bob
  //  client knows who is me

  // after cookie forwarding
  // server knows who is me, knows who voted
  // client knows who is me

  let body = null;

  // data is loading
  if (loading) {
  } else if (!data?.me) {
    // this can return undefined, then ! turn it to true
    // user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={2}>
            <PlusSquareIcon />{" "}
          </Button>
        </NextLink>

        <Box mr={2}>{data.me.username}</Box>
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

        <NextLink
          href={{
            pathname: "/user/account-info/[id]",
            query: { id: data.me.id },
          }}
        >
          <Link>My account</Link>
        </NextLink>
      </Flex>

      // no need ? because it is implied that it exsists, put the ifs befire
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg={["white", "red"]}
      p={2}
      ml={"auto"}
      align="center"
    >
      <Flex maxW={800} flex={1} align="center" m="auto">
        <NextLink href="/">
          <Link>
            <Heading>Cookknow</Heading>
          </Link>
        </NextLink>

        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
