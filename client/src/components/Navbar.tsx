import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import { useRouter } from "next/router";
import { PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import { useApolloClient } from "@apollo/client";
import { HomeIcon } from "./Icons/HomeIcon";
import { AccountIcon } from "./Icons/AccountIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { ActivityIcon } from "./Icons/ActivityIcon";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();

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
        <Box>{data.me.username}</Box>
      </Flex>

      // no need ? because it is implied that it exsists, put the ifs befire
    );
  }
  return (
    <Box>
      <Flex
        zIndex={1}
        position="fixed"
        width="100%"
        top={0}
        bg={["white", "red"]}
        p={2}
        ml={"auto"}
        align="center"
        justifyContent="flex-end"
        bgColor="red.400"
      >
        <InputGroup zIndex={2} bgColor="white">
          <InputLeftElement
            height="100%"
            pointerEvents="none"
            children={<SearchIcon color="grey.300" />}
          />
          <Input zIndex={2} placeholder="search" size="sm" variant="filled" />
        </InputGroup>

        <NextLink href="/create-post">
          <Button as={Link} mr={2}>
            <PlusSquareIcon />{" "}
          </Button>
        </NextLink>
      </Flex>
      <Flex
        zIndex={1}
        position="fixed"
        bottom={0}
        bg={["white", "red"]}
        p={2}
        ml={"auto"}
        align="center"
        width="100%"
        justifyContent="space-around"
      >
        <NextLink href="/">
          <Link>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <HomeIcon />
              <Text fontSize="xs">New Feed</Text>
            </Flex>
          </Link>
        </NextLink>

        <NextLink
          href={{
            pathname: "/like",
          }}
        >
          <Link>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <HeartIcon />
              <Text fontSize="xs">Likes</Text>
            </Flex>
          </Link>
        </NextLink>

        {/* <NextLink
          href={{
            pathname: "/search",
          }}>
          <Link>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center">
              <SearchIcon />
              <Text fontSize="xs">Search</Text>
            </Flex>
          </Link>
        </NextLink> */}

        <NextLink
          href={{
            pathname: "/activity",
          }}
        >
          <Link>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <ActivityIcon />
              <Text fontSize="xs">Acitivity</Text>
            </Flex>
          </Link>
        </NextLink>

        <NextLink
          href={{
            pathname: "/account",
          }}
        >
          <Link>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <AccountIcon />
              <Text fontSize="xs">{body}</Text>
            </Flex>
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
};
