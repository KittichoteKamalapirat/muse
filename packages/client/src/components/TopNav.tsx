import { Flex, Link, Heading } from "@chakra-ui/react";
import React from "react";
import { BasketIcon } from "./Icons/BasketIcon";
import NextLink from "next/link";
import { useCartItemsQuery } from "../generated/graphql";
import Badge from "./atoms/Badge";
interface TopNavProps {}

export const TopNav: React.FC<TopNavProps> = ({}) => {
  const {
    data: cartItems,
    loading: cartItemsLoading,
    error: cartItemsError,
  } = useCartItemsQuery();

  console.log({ cartItems });

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
