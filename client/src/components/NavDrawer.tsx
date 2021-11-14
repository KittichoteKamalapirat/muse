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
import SvgHamburger from "./svgComponents/Hamburger";
import NextLink from "next/link";
import { primaryColor } from "./Variables";

interface NavDrawerProps {}

export const NavDrawer: React.FC<NavDrawerProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      <Box ref={btnRef} onClick={onOpen}>
        <SvgHamburger />
      </Box>
      <Drawer
        isOpen={isOpen}
        // placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="white">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" alignItems="flex-end">
              <Flex
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                my={2}
              >
                <NextLink href="/login">
                  <Link> Sign in</Link>
                </NextLink>

                <Text color="gray.400">or</Text>

                <NextLink href="/register">
                  <Link color={primaryColor}> Sign up</Link>
                </NextLink>
              </Flex>

              <Divider mb={2} />

              <Box my={2}>
                <NextLink href="/">
                  <Link> Home</Link>
                </NextLink>
              </Box>

              <Box my={2}>
                <NextLink href="/creator">
                  <Link> Seller Center</Link>
                </NextLink>
              </Box>
              {/* <Box my={2}>
                <NextLink href="/about">
                  <Link> About</Link>
                </NextLink>
              </Box> */}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
