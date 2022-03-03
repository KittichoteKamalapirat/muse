import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import { HomeIcon } from "./Icons/HomeIcon";
import { AccountIcon } from "./Icons/AccountIcon";
import { HeartIcon } from "./Icons/HeartIcon";
import { ActivityIcon } from "./Icons/ActivityIcon";
import { inActiveGray, primaryColor } from "./Variables";
import { BasketIcon } from "./Icons/BasketIcon";
import { ShopIcon } from "./Icons/ShopIcon";
import { MainNav } from "./MainNav";
import { TopNav } from "./TopNav";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Box>
      <TopNav />
      <MainNav />
    </Box>
  );
};
