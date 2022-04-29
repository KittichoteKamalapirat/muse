import { Flex, Link, Heading } from "@chakra-ui/react";
import React from "react";
import { BasketIcon } from "./Icons/BasketIcon";
import NextLink from "next/link";
interface TopNavProps {}

export const TopNav: React.FC<TopNavProps> = ({}) => {
  return (
    <Flex
      zIndex={10}
      justifyContent="center"
      position="fixed"
      width="100%"
      top={0}
      bg="white"
      p={2}
      // ml={"auto"}
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
            <BasketIcon />
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
