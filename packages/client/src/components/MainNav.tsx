import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery, useOrderNotisQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import Badge from "./atoms/Badge";
import { AccountIcon } from "./Icons";

import { BellIcon } from "./Icons/BellIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { HomeIcon } from "./Icons/HomeIcon";
import { ShopIcon } from "./Icons/ShopIcon";
import { inActiveGray, primaryColor } from "./Variables";

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

  const notiUnreadNum = orderNoti?.orderNotis.filter(
    (noti) => noti.read == false
  ).length;

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
      zIndex={10}
      position="fixed"
      bottom={0}
      bg={"white"}
      p={2}
      alignItems={["end", "end", "center"]}
      justifyContent="space-around"
      width={["100%", "100%", "80px"]}
      height={[null, null, "100%"]}
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
            <Badge
              isDisplayed={notiUnreadNum === 0}
              badgeContent={notiUnreadNum as number}
            >
              <BellIcon isactive={notiActive ? "true" : undefined} />
            </Badge>

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
