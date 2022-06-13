import { Box } from "@chakra-ui/react";
import React from "react";
import { MainNav } from "./MainNav";
import { TopNav } from "./TopNav";

export const Navbar = () => {
  return (
    <Box>
      <TopNav />
      <MainNav />
    </Box>
  );
};
