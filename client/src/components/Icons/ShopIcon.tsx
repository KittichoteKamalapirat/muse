import { Icon } from "@chakra-ui/react";
import React from "react";
import { inActiveGray, primaryColor } from "../Variables";

interface ShopProps {
  isactive?: string;
}

export const ShopIcon = (props: ShopProps) => (
  <Icon viewBox="0 0 23.81 21.41" {...props}>
    {/* house base */}
    <path
      d="M21.16,9V20.66H14.8v-6a.82.82,0,0,0-.81-.84H9.86A.83.83,0,0,0,9,14.7v6H2.67V9L3,9A2.22,2.22,0,0,0,5.21,6.79H18.59A2.23,2.23,0,0,0,20.83,9Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill={props.isactive ? primaryColor : "none"}
    />

    {/* roof */}
    <line
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
      x1="7.95"
      y1="0.75"
      x2="5.21"
      y2="6.79"
    />
    <line
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
      x1="10.67"
      y1="0.75"
      x2="9.67"
      y2="6.79"
    />
    <line
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
      x1="14.13"
      y1="6.79"
      x2="13.4"
      y2="0.75"
    />
    <line
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
      x1="18.59"
      y1="6.79"
      x2="16.14"
      y2="0.75"
    />

    <polygon
      points="23.06 6.79 0.75 6.79 1.37 5.95 2.34 4.65 5.22 0.75 18.88 0.75 23.06 6.79"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
    />

    {/* curve */}
    <path
      d="M5.21,6.79A2.22,2.22,0,0,1,3,9L2.67,9A2.23,2.23,0,0,1,.75,6.79Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
    />
    <path
      d="M9.67,6.79a2.23,2.23,0,0,1-4.46,0Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
    />
    <path
      d="M14.13,6.79a2.23,2.23,0,0,1-4.46,0Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
    />
    <path
      d="M18.59,6.79a2.23,2.23,0,0,1-4.46,0Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
    />
    <path
      d="M23.06,6.79A2.22,2.22,0,0,1,21.16,9l-.33,0a2.23,2.23,0,0,1-2.24-2.22Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
      fill="none"
    />
  </Icon>
);
