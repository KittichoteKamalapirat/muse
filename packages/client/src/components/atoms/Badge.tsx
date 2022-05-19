import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  isDisplayed: boolean;
  badgeContent: string | number;
  children: ReactNode;
}

const Badge = ({ isDisplayed, badgeContent, children }: Props) => {
  return (
    <Box position="relative">
      <Box>
        <Text
          display={isDisplayed ? "none" : "block"}
          position="absolute"
          top="-6px"
          right="-7px"
          bgColor="alert"
          color="white"
          minWidth="1.2rem"
          maxH="1.2rem"
          borderRadius="8px"
          textAlign="center"
          fontSize="xs"
          px="2px"
        >
          {badgeContent}
        </Text>
        {children}
      </Box>
    </Box>
  );
};
export default Badge;
