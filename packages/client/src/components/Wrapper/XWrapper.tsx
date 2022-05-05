import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const XWrapper = ({ children, ...props }: Props) => {
  return (
    <Box width="100%" {...props}>
      <Flex flexDirection="column" alignItems="center">
        <Box maxWidth={["95%", "30%"]}>{children}</Box>
      </Flex>
    </Box>
  );
};
