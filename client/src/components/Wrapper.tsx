import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: "small" | "regular";
  mb?: number;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  mb,
  variant = "regular",
}) => {
  return (
    <Box
      m={8}
      mx="auto"
      maxW={["none", "400px", "800px"]}
      w={["90%", "70%", "60%"]}
      mb={mb}
    >
      {children}
    </Box>
  );
};
