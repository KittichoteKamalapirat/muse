import { Box } from "@chakra-ui/react";
import React from "react";

export type ContentWrapperVariant = "small" | "regular";

interface ContentWrapperProps {
  p?: number;
  m?: number;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  p,
  m,
  ...props
}) => {
  return (
    <Box p={p || 2} m={m || 2} {...props}>
      {children}
    </Box>
  );
};
