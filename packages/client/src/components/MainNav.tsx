import { Flex, Link, Avatar, Text, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AccountIcon } from "./Icons/AccountIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { HomeIcon } from "./Icons/HomeIcon";
import { ShopIcon } from "./Icons/ShopIcon";
import { primaryColor, inActiveGray } from "./Variables";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  useMeQuery,
  useOrderNotisQuery,
  useReadOrderNotisMutation,
} from "../generated/graphql";
import { isServer } from "../util/isServer";
import SvgBell from "./svgComponents/Bell";
import { BellIcon } from "./Icons/BellIcon";
import { BasketIcon } from "./Icons/BasketIcon";
import { updateAfterRead } from "../pages/notification";

interface MainNavProps {}

export const MainNav: React.FC<MainNavProps> = ({}) => {
  const router = useRouter();

  const {
    data: orderNoti,
    loading: orderNotiLoading,
    error: errorNori,
  } = useOrderNotisQuery();

  const { data, loading } = useMeQuery({
    skip: isServer(), //we paused this because it will return null anyway (no cookie, without cookie forwarding)
    // no need to request in the browser side, just on client, but the server still knows anyway due to cookei forwarding
  });
  // const [readOrderNotis] = useReadOrderNotisMutation();

  // const [notiLength, setNotiLength] = useState<number>(0)

  const homeActive = router.pathname === "/";
  const likeActive = router.pathname === "/like";
  const notiActive = router.pathname === "/notification";
  // const cartActive = router.pathname === "/cart";
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

  // useEffect(() => {
  //   console.log("from mainnav");
  //   if (notiActive) {
  //     console.log("from mainnav2");
  //     readOrderNotis({
  //       update: (cache) => updateAfterRead(cache),
  //     });
  //   }
  //   console.log("from mainnav3");
  // }, []);

  // data is loading
  if (loading || orderNotiLoading) {
    return null;
  } else if (!data?.me) {
    // this can return undefined, then ! turn it to "true"
    // user not logged in

    currentUser = (
      <>
        <NextLink href="/login" passHref>
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register" passHref>
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
      py={[null, null, 20]}
    >
      <NextLink href="/" passHref>
        <Link
          style={{ textDecoration: "none" }}
          flex={1}
          aria-label="New Feed Button"
        >
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
        passHref
      >
        <Link
          style={{ textDecoration: "none" }}
          flex={1}
          aria-label="Likes Button"
        >
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
        <NextLink href="/myshop" passHref>
          <Link
            as={Link}
            mr={2}
            style={{ textDecoration: "none" }}
            flex={1}
            aria-label="My Shop Button"
          >
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
        passHref
      >
        <Link
          style={{ textDecoration: "none" }}
          flex={1}
          aria-label="Notification Button"
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box position="relative">
              <BellIcon isactive={notiActive ? "true" : undefined} />
              <Text
                display={
                  orderNoti?.orderNotis.filter((noti) => noti.read == false)
                    .length === 0
                    ? "none"
                    : "block"
                }
                position="absolute"
                top="-6px"
                right="-7px"
                bgColor="alert"
                color="white"
                minWidth="1.2rem"
                maxH="1.2rem"
                borderRadius="8px"
                textAlign="center"
                fontSize="xs"
                px="2px"
              >
                {
                  orderNoti?.orderNotis.filter((noti) => noti.read == false)
                    .length
                }
              </Text>
            </Box>

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
        passHref
      >
        <Link
          style={{ textDecoration: "none" }}
          flex={1}
          aria-label="My Account Button"
        >
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
                <Avatar
                  size="xs"
                  src={data?.me?.avatar}
                  name="creator avatar"
                />

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
