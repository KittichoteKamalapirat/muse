import { Box } from "@chakra-ui/react";
import React from "react";

export type ContentWrapperVariant = "small" | "regular";

interface ContentWrapperProps {
  p?: number;
  m?: number;
  mb?: number;
  pb?: number;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  p,
  m,
  mb,
  pb,
  ...props
}) => {
  return (
    <Box p={p || 2} m={m || 2} mb={mb} pb={pb} {...props}>
      {children}
    </Box>
  );
};
