import { Box } from "@chakra-ui/layout";
import React from "react";

interface FooterLayoutProps {
  mb?: string;
}

export const FooterLayout: React.FC<FooterLayoutProps> = ({ children, mb }) => {
  return <Box mb={mb || "60px"}>{children}</Box>;
};
