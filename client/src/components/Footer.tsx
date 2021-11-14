import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import SvgThflag from "./svgComponents/Thflag";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <>
      <Box textAlign="center" bgColor="gray.600" color="white" py={4}>
        <Text>Copyright &copy; 2021 Cookknow</Text>

        {/* add terms and privary */}
        <Flex justifyContent="center" alignItems="center">
          <Text d="inline" mr={2}>
            Thailand
          </Text>
          <SvgThflag />
        </Flex>
      </Box>
    </>
  );
};
