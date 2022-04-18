import { useDisclosure } from "@chakra-ui/hooks";
import { Flex, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { primaryColor } from "./Variables";

interface NavNoDrawerProps {}

export const NavNoDrawer: React.FC<NavNoDrawerProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <Flex alignItems="flex-end">
      <Flex
        width="100%"
        justifyContent="space-between"
        my={2}
        alignItems="center"
      >
        <NextLink href="/creator" passHref>
          <Link mx={5}>
            {" "}
            <Text whiteSpace="nowrap"> Creator Center</Text>{" "}
          </Link>
        </NextLink>
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
