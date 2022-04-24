import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface LoadingProps {
  text?: string;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ text, overlay = false }) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      // position={overlay ? "absolute" : "static"}
      // marginX={overlay ? "auto" : "static"}
      // right={overlay ? 0 : "none"}
      // left={overlay ? 0 : "none"}
      // textAlign="center"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.8s"
          emptyColor="gray.200"
          color="brand"
          size="xl"
        />
        <Text color="brand" fontWeight="bold">
          {text ? text : "Loading..."}
        </Text>
      </Flex>
    </Flex>
  );
};
