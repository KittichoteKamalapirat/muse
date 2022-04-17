import { Box } from "@chakra-ui/react";
import React from "react";
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
