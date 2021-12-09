import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { HeadingLayout } from "./Layout/HeadingLayout";
import { MainNav } from "./MainNav";
import SvgFail from "./svgComponents/Fail";

interface UnAuthorizedProps {}

export const UnAuthorized: React.FC<UnAuthorizedProps> = ({}) => {
  return (
    <Box>
      <HeadingLayout heading="Not Authorized"></HeadingLayout>

      <Flex
        flexDirection="column"
        height="80vh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box m={4}>
          <SvgFail fontSize="4rem" />
        </Box>

        <Heading fontSize="lg">Unorthorized</Heading>
        <Text>You are not authorized to view this page</Text>
      </Flex>

      <MainNav></MainNav>
    </Box>
  );
};
