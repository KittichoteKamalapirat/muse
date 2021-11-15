import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: "small" | "regular";
  mb?: number;
  mt?: number;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  mb,
  mt,
  variant = "regular",
}) => {
  return (
    <Box
      m={8}
      mx="auto"
      maxW={["none", "400px", "40%"]}
      w={["90%", "70%", "50%"]}
      mb={mb}
      mt={mt}
    >
      {children}
    </Box>
  );
};
