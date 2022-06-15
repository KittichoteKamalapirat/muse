import { Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useCartItemsQuery } from "../generated/graphql";
import Badge from "./atoms/Badge";
import { BasketIcon } from "./Icons/BasketIcon";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";

export const TopNav = () => {
  const {
    data: cartItems,
    loading: cartItemsLoading,
    error: cartItemsError,
  } = useCartItemsQuery();

  if (cartItemsLoading) {
    return <Loading />; // IMPORTANT: don't add layout because it will result in infinite loop navbar calling layout calling navbart
  }
  if (cartItemsError) {
    return <Error text={cartItemsError.message} />;
  }

  const cartItemsNum = cartItems?.cartItems.length;
  return (
    <Flex
      zIndex={10}
      justifyContent="center"
      position="fixed"
      width="100%"
      top={0}
      bg="white"
      p={2}
      borderBottom="solid"
      borderBottomColor="gray.200"
      borderBottomWidth="1px"
    >
      <Flex
        width={["100%", "100%", "40%"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <NextLink href="/" passHref>
          <Link mx={2} fontSize="sm" style={{ textDecoration: "none" }}>
            <Heading fontSize="sm">Cookknow</Heading>
          </Link>
        </NextLink>

        <NextLink href="/cart" passHref>
          <Link mx={2} fontSize="sm">
            <Badge
              isDisplayed={cartItemsNum === 0}
              badgeContent={cartItemsNum as number}
            >
              <BasketIcon />
            </Badge>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
