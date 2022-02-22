import { Icon } from "@chakra-ui/react";
import React from "react";
import { primaryColor, inActiveGray } from "../Variables";

interface BasketIconProps {
  isactive?: string;
}

export const BasketIcon = (props: BasketIconProps) => (
  <Icon
    viewBox="0 0 22.61 20.83"
    // fill={props.isactive ? primaryColor : "none"}
    fill="white"
    // stroke={props.isactive ? primaryColor : inActiveGray}
    stroke="gray.700"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"

    // {...props}
  >
    <polygon points="19.64 20.08 2.97 20.08 0.75 7.19 21.86 7.19 19.64 20.08" />

    <line x1="11.31" y1="10.97" x2="11.31" y2="16.53" />
    <line x1="6.86" y1="10.97" x2="6.86" y2="16.53" />
    <line x1="15.75" y1="10.97" x2="15.75" y2="16.53" />

    <line x1="3.34" y1="7.19" x2="8.36" y2="0.75" />
    <line x1="19.38" y1="7.19" x2="14.36" y2="0.75" />
  </Icon>
);
