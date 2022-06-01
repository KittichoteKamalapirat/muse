import { useDisclosure } from "@chakra-ui/hooks";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { primaryColor } from "./Variables";

interface NavDrawerProps {}

export const NavDrawer: React.FC<NavDrawerProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      <Box ref={btnRef as any} onClick={onOpen}>
        <HamburgerIcon />
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
                <NextLink href="/login" passHref>
                  <Link> Sign in</Link>
                </NextLink>

                <Text color="gray.400">or</Text>

                <NextLink href="/register" passHref>
                  <Link color={primaryColor}> Sign up</Link>
                </NextLink>
              </Flex>

              <Divider mb={2} />

              <Box my={2}>
                <NextLink href="/" passHref>
                  <Link> Home</Link>
                </NextLink>
              </Box>

              <Box my={2} color="brand" fontWeight="bold">
                <NextLink href="/creator" passHref>
                  <Link>Creator Center</Link>
                </NextLink>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
