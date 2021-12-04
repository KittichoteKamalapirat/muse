import { Flex, Link, Avatar, Text, Box } from "@chakra-ui/react";
import React from "react";
import { AccountIcon } from "./Icons/AccountIcon";
import { ActivityIcon } from "./Icons/ActivityIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { HomeIcon } from "./Icons/HomeIcon";
import { ShopIcon } from "./Icons/ShopIcon";
import { primaryColor, inActiveGray } from "./Variables";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";

interface MainNavProps {}

export const MainNav: React.FC<MainNavProps> = ({}) => {
  const router = useRouter();

  const { data, loading } = useMeQuery({
    skip: isServer(), //we paused this because it will return null anyway (no cookie, without cookie forwarding)
    // no need to request in the browser side, just on client, but the server still knows anyway due to cookei forwarding
  });

  const homeActive = router.pathname === "/";
  const likeActive = router.pathname === "/like";
  const activityActive = router.pathname === "/activity";
  const basketActive = router.pathname === "/basket";
  const shopActive = router.pathname === "/myshop";

  const accountActive = router.pathname === "/account";

  // this is SSR so browser -> next.js -> graphql

  // without cookie  forwarding, and pause in the server
  //  server(graphQL) does not know who is me (no cookie), so don't know who voted (in post)
  // nextJS knows -> so know it's Bob
  //  client knows who is me

  // after cookie forwarding
  // server knows who is me, knows who voted
  // client knows who is me

  let currentUser = null;

  // data is loading
  if (loading) {
  } else if (!data?.me) {
    // this can return undefined, then ! turn it to true
    // user not logged in
    currentUser = (
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
    currentUser = (
      <Flex align="center">
        <Box>{data.me.username}</Box>
      </Flex>

      // no need ? because it is implied that it exsists, put the ifs befire
    );
  }

  return (
    <Flex
      direction={["row", "row", "column"]}
      zIndex={1}
      position="fixed"
      bottom={0}
      left={0}
      bg={"white"}
      p={2}
      ml={"auto"}
      align="center"
      width={["100%", "100%", "80px"]}
      height={[null, null, "100%"]}
      justifyContent="space-around"
      borderRight="solid"
      borderRightColor="gray.200"
      borderRightWidth="1px"
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

      {!data?.me?.isCreator ? null : (
        <NextLink href="/myshop">
          <Link as={Link} mr={2} style={{ textDecoration: "none" }}>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {" "}
              <ShopIcon isactive={shopActive} />
              <Text
                fontSize="xs"
                fontWeight="medium"
                textColor={shopActive ? primaryColor : inActiveGray}
              >
                My shop
              </Text>
            </Flex>
            {/* <SmallAddIcon />{" "} */}
          </Link>
        </NextLink>
      )}

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
              <Avatar size="xs" src={data?.me?.avatar} alt="creator avatar" />

              <Text
                fontSize="xs"
                fontWeight="medium"
                textColor={accountActive ? primaryColor : inActiveGray}
              >
                {currentUser}
              </Text>
            </Flex>
          )}
        </Link>
      </NextLink>
      {/* {loading ? null : accountIcon} */}
    </Flex>
  );
};
