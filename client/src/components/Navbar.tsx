import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import { useRouter } from "next/router";
import { SearchIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useApolloClient } from "@apollo/client";
import { HomeIcon } from "./Icons/HomeIcon";
import { AccountIcon } from "./Icons/AccountIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { ActivityIcon } from "./Icons/ActivityIcon";
import { inActiveGray, primaryColor } from "./Variables";
import { BasketIcon } from "./Icons/BasketIcon";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const homeActive = router.pathname === "/";
  const likeActive = router.pathname === "/like";
  const activityActive = router.pathname === "/activity";
  const basketActive = router.pathname === "/basket";

  const accountActive = router.pathname === "/account";

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
        <InputGroup zIndex={2} bgColor="white" size="sm">
          <InputLeftAddon
            bgColor="white"
            // height="100%"
            pointerEvents="none"
            children={<SearchIcon color={inActiveGray} />}
          />

          <Input
            border="none"
            zIndex={2}
            placeholder="search"
            variant="outline"
          />
        </InputGroup>

        {!data?.me?.isCreator ? null : (
          <NextLink href="/create-post">
            <Button as={Link} mr={2}>
              <SmallAddIcon />{" "}
            </Button>
          </NextLink>
        )}
        <NextLink href="/cart">
          <Link ml={"auto"} fontSize="sm" textDecoration="none">
            <BasketIcon />
          </Link>
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
          <Link
            style={{ textDecoration: "none" }}
            // textDecoration="none"
          >
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <HomeIcon isactive={homeActive} />
              <Text
                fontSize="xs"
                fontWeight="medium"
                textColor={homeActive ? primaryColor : inActiveGray}
              >
                New Feed
              </Text>
            </Flex>
          </Link>
        </NextLink>

        <NextLink
          href={{
            pathname: "/like",
          }}
        >
          <Link style={{ textDecoration: "none" }}>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <HeartIcon isactive={likeActive} />
              <Text
                fontSize="xs"
                fontWeight="medium"
                textColor={likeActive ? primaryColor : inActiveGray}
              >
                Likes
              </Text>
            </Flex>
          </Link>
        </NextLink>

        <NextLink
          href={{
            pathname: "/activity",
          }}
        >
          <Link style={{ textDecoration: "none" }}>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <ActivityIcon isactive={activityActive} />
              <Text
                fontSize="xs"
                fontWeight="medium"
                textColor={activityActive ? primaryColor : inActiveGray}
              >
                Activity
              </Text>
            </Flex>
          </Link>
        </NextLink>

        <NextLink
          href={{
            pathname: "/account",
          }}
        >
          <Link style={{ textDecoration: "none" }}>
            {!data?.me ? (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <AccountIcon isactive={accountActive} />
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  textColor={accountActive ? primaryColor : inActiveGray}
                >
                  Account
                </Text>
              </Flex>
            ) : (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  width="1.3rem"
                  src={data?.me?.avatar}
                  // alt="creator avatar"
                  borderRadius="50%"
                  border={1}
                  borderStyle="solid"
                  borderColor={accountActive ? primaryColor : inActiveGray}
                />
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  textColor={accountActive ? primaryColor : inActiveGray}
                >
                  {body}
                </Text>
              </Flex>
            )}
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
};
