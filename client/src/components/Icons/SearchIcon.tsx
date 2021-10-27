import { Icon } from "@chakra-ui/react";
import React from "react";

interface SearchProps {
  isactive: boolean;
}

export const SearchIcon = (props: SearchProps) => (
  <Icon viewBox="0 0 18.05 18.34" {...props}>
    <circle cx="7.32" cy="7.62" r="6.12" />
    <line x1="11.65" y1="11.94" x2="18.05" y2="18.34" />
    <circle cx="6.62" cy="6.62" r="6.12" />
    <line x1="10.94" y1="10.94" x2="17.34" y2="17.34" />
  </Icon>
);
