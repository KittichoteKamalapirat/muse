import { Icon } from "@chakra-ui/react";
import React from "react";
import { inActiveGray, primaryColor } from "../Variables";

interface HeartProps {
  isactive?: string;
  color?: string;
  mr?: number;
}

export const HeartIcon = (props: HeartProps) => (
  <Icon viewBox="0 0 19.99 17.5" {...props}>
    <path
      d="M9.89,16.5C-1.21,10.69-.19,5,1.64,2.41s6.24-2.8,8.25,1c2-3.76,6.43-3.55,8.25-1S21,10.69,9.89,16.5Z"
      fill={
        props.isactive || props.color ? props.color || primaryColor : "none"
      }
      stroke={
        props.isactive || props.color
          ? props.color || primaryColor
          : inActiveGray
      }
      strokeWidth={2}
    />
  </Icon>
);
