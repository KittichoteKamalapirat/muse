import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Box>
        <Spinner
          thickness="4px"
          speed="0.8s"
          emptyColor="gray.200"
          color="brand"
          size="xl"
        />
        <Text>Loading...</Text>
      </Box>
    </Flex>
  );
};
