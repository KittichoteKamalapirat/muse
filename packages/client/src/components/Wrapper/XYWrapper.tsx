import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  height?: string | number;
}

const XYWrapper = ({ children, height = "600px" }: Props) => {
  return (
    <Flex justifyContent="center" alignItems="center" height={height}>
      <Flex direction="column" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
};
export default XYWrapper;
