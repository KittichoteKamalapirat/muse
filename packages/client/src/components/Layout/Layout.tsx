import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Navbar } from "../Navbar";
import { WrapperVariant } from "../Wrapper/Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  heading: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, heading }) => {
  return (
    <>
      <Head>
        <title>{`${heading} - Cookknow `} </title>
      </Head>
      <Navbar />
      <Box mt="60px" mb="80px">
        {/* <Wrapper variant={variant}>{children}</Wrapper> */}
        {children}
      </Box>
    </>
  );
};
