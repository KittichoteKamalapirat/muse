import { Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import LinkButton from "./atoms/LinkButton";
import { primaryColor } from "./Variables";

export const NavNoDrawer = () => {
  return (
    <Flex alignItems="flex-end">
      <Flex
        width="100%"
        justifyContent="space-between"
        my={2}
        alignItems="center"
      >
        <LinkButton href="/creator" variant="outline">
          Creator Center
        </LinkButton>

        <NextLink href="/login" passHref>
          <Link mx={5}> Log in</Link>
        </NextLink>

        <NextLink href="/register" passHref>
          <Link mx={5} fontWeight="bold" color={primaryColor}>
            Sign up
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
