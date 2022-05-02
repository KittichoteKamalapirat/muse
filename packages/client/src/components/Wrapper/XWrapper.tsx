import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const XWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Box width="100%">
      <Flex flexDirection="column" alignItems="center">
        <Box maxWidth={["95%", "30%"]}>{children}</Box>
      </Flex>
    </Box>
  );
};
