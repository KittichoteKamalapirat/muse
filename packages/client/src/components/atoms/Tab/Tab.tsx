import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { CartItemStatus } from "../../../generated/graphql";
import { primaryColor, inActiveGray } from "../../Variables";

interface Props {
  currentStatus: CartItemStatus;
  tabStatus: CartItemStatus;
  onClick?: () => void;
  children: ReactNode;
}

const Tab = ({ currentStatus, tabStatus, onClick, children }: Props) => {
  const isActive = currentStatus === tabStatus;
  return (
    <Box
      flex={1}
      textAlign="center"
      display="inline-block"
      whiteSpace="nowrap"
      fontWeight={isActive ? "bold" : ""}
      borderStyle="solid"
      borderColor={isActive ? primaryColor : "white"}
      color={isActive ? primaryColor : "gray.500"}
      _hover={{
        backgroundColor: "gray.50",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      borderBottom={3}
      p={2}
      mx={2}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
export default Tab;
