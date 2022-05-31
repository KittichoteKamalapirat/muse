import { AddIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import LinkButton from "../atoms/LinkButton";

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
