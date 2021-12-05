import { Flex, Link, Avatar, Text, Box } from "@chakra-ui/react";
import React from "react";
import { AccountIcon } from "./Icons/AccountIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { HomeIcon } from "./Icons/HomeIcon";
import { ShopIcon } from "./Icons/ShopIcon";
import { primaryColor, inActiveGray } from "./Variables";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import SvgBell from "./svgComponents/Bell";
import { BellIcon } from "./Icons/BellIcon";
import { BasketIcon } from "./Icons/BasketIcon";

interface MainNavProps {}

export const MainNav: React.FC<MainNavProps> = ({}) => {
  const router = useRouter();

  const { data, loading } = useMeQuery({
    skip: isServer(), //we paused this because it will return null anyway (no cookie, without cookie forwarding)
    // no need to request in the browser side, just on client, but the server still knows anyway due to cookei forwarding
  });

  const homeActive = router.pathname === "/";
  const likeActive = router.pathname === "/like";
  const notiActive = router.pathname === "/notification";
  // const cartActive = router.pathname === "/cart";
  const shopActive = router.pathname === "/myshop";
  const accountActive = router.pathname === "/account";

  console.log({ homeActive });
  console.log({ likeActive });
  console.log({ notiActive });
  console.log({ shopActive });
  console.log({ accountActive });

  console.log({ data });

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
    return null;
  } else if (!data?.me) {
    // this can return undefined, then ! turn it to "true"
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

  if (!data) {
    return <Text>no data</Text>; //without this line -> icon messedup
  }

  return (
    <Flex
      direction={["row", "row", "column"]}
      zIndex={1}
      position="fixed"
      bottom={0}
      bg={"white"}
      p={2}
      alignItems="center"
      width={["100%", "100%", "80px"]}
      height={[null, null, "100%"]}
      justifyContent="space-around"
      borderRight="solid"
      borderRightColor="gray.200"
      borderRightWidth="1px"
    >
      <NextLink href="/">
        <Link style={{ textDecoration: "none" }} flex={1}>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <HomeIcon isactive={homeActive ? "true" : undefined} />
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
        <Link style={{ textDecoration: "none" }} flex={1}>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <HeartIcon isactive={likeActive ? "true" : undefined} />
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
      {data?.me?.isCreator && (
        <NextLink href="/myshop">
          <Link as={Link} mr={2} style={{ textDecoration: "none" }} flex={1}>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <ShopIcon isactive={shopActive ? "true" : undefined} />
              <Text
                fontSize="xs"
                fontWeight="medium"
                textColor={shopActive ? primaryColor : inActiveGray}
              >
                My shop
              </Text>
            </Flex>
          </Link>
        </NextLink>
      )}

      <NextLink
        href={{
          pathname: "/notification",
        }}
      >
        <Link style={{ textDecoration: "none" }} flex={1}>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <BellIcon isactive={notiActive ? "true" : undefined} />

            <Text
              fontSize="xs"
              fontWeight="medium"
              textColor={notiActive ? primaryColor : inActiveGray}
            >
              Notification
            </Text>
          </Flex>
        </Link>
      </NextLink>
      <NextLink
        href={{
          pathname: "/account",
        }}
      >
        <Link style={{ textDecoration: "none" }} flex={1}>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {!data?.me ? (
              <>
                <AccountIcon isactive={accountActive ? "true" : undefined} />
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  textColor={accountActive ? primaryColor : inActiveGray}
                >
                  Account
                </Text>
              </>
            ) : (
              <>
                <Avatar size="xs" src={data?.me?.avatar} alt="creator avatar" />

                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  textColor={accountActive ? primaryColor : inActiveGray}
                >
                  {currentUser}
                </Text>
              </>
            )}
          </Flex>
        </Link>
      </NextLink>
    </Flex>
  );
};
