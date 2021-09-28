import { Icon } from "@chakra-ui/react";
import React from "react";

interface HeartProps {}

export const HeartIcon = (props: any) => (
  <Icon viewBox="0 0 19.99 17.5" {...props}>
    <path d="M10.59,17.5C-.51,11.69.52,6,2.34,3.41s6.24-2.8,8.25,1c2-3.76,6.43-3.55,8.26-1S21.7,11.69,10.59,17.5Z" />
    <path d="M9.89,16.5C-1.21,10.69-.19,5,1.64,2.41s6.24-2.8,8.25,1c2-3.76,6.43-3.55,8.25-1S21,10.69,9.89,16.5Z" />
  </Icon>
);
