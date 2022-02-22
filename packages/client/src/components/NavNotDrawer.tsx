import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Button,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";

import { Divider, Flex, Text } from "@chakra-ui/layout";
import React, { LegacyRef } from "react";
import NextLink from "next/link";
import { primaryColor } from "./Variables";
import { HamburgerIcon } from "@chakra-ui/icons";

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
        <NextLink href="/creator">
          <Link mx={5}>
            {" "}
            <Text whiteSpace="nowrap"> Creator Center</Text>{" "}
          </Link>
        </NextLink>
        <NextLink href="/login">
          <Link mx={5}> Log in</Link>
        </NextLink>

        <NextLink href="/register">
          <Link mx={5} fontWeight="bold" color={primaryColor}>
            {" "}
            Sign up
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
