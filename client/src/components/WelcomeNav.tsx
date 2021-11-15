import { Button } from "@chakra-ui/button";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import React from "react";
import { primaryColor } from "./Variables";
import NextLink from "next/link";
import SvgThflag from "./svgComponents/Thflag";
import { NavDrawer } from "./NavDrawer";

interface WelcomeNavProps {}

export const WelcomeNav: React.FC<WelcomeNavProps> = ({ children }) => {
  return (
    <Box pt={20}>
      <Box
        zIndex={1}
        position="fixed"
        top={0}
        bg={primaryColor}
        p={2}
        ml={"auto"}
        align="center"
        width="100%"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          color="white"
          maxWidth="1000px"
        >
          <NextLink href="/">
            <Link
              style={{ textDecoration: "none" }}
              // textDecoration="none"
            >
              <Heading fontSize="lg">Cookknow</Heading>
            </Link>
          </NextLink>
          <NavDrawer />
        </Flex>
      </Box>

      {children}
    </Box>
  );
};
