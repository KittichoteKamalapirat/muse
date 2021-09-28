import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Box mt={20}>
        <Wrapper variant={variant}>{children}</Wrapper>
      </Box>
    </>
  );
};
