import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../Navbar";
import { WrapperVariant } from "../Wrapper/Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Box mt="60px" mb="80px">
        {/* <Wrapper variant={variant}>{children}</Wrapper> */}
        {children}
      </Box>
    </>
  );
};
