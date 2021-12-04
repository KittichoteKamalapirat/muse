import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: "small" | "regular";
  m?: number;
  mb?: number;
  mt?: number;
  py?: number;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  m,
  py,
  mb,
  mt,
  variant = "regular",
  ...props
}) => {
  return (
    <Box
      m={m ? m : 8}
      mx="auto"
      maxW={["none", "400px", "40%"]}
      w={["90%", "70%", "50%"]}
      mb={mb}
      mt={mt}
      {...props}
    >
      {children}
    </Box>
  );
};
