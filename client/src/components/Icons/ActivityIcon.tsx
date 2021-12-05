import { Icon } from "@chakra-ui/react";
import React from "react";
import { primaryColor, inActiveGray } from "../Variables";

interface ActivityProps {
  isactive?: string;
}

export const ActivityIcon = (props: ActivityProps) => (
  <Icon
    viewBox="0 0 17.35 17.5"
    // {...props}
  >
    <path
      d="M14.15,16.5H1.62A1,1,0,0,1,.5,15.57V1.43A1,1,0,0,1,1.62.5h9.81a1,1,0,0,1,1.13.93V14.75a1.74,1.74,0,0,0,1.58,1.73Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      fill={props.isactive ? primaryColor : "none"}
      strokeWidth={2}
    />
    <path
      d="M16.65,12.23v1.92a2.36,2.36,0,0,1-2.34,2.35.47.47,0,0,1-.17,0,1.74,1.74,0,0,1-1.58-1.73V11.36a.27.27,0,0,1,.27-.27h2.69A1.13,1.13,0,0,1,16.65,12.23Z"
      stroke={props.isactive ? primaryColor : inActiveGray}
      fill={props.isactive ? "none" : "none"}
      strokeWidth={2}
    />
    <line
      x1="2.77"
      y1="3.4"
      x2="10.05"
      y2="3.4"
      stroke={props.isactive ? "white" : inActiveGray}
      strokeWidth={2}
    />
    <line
      x1="2.77"
      y1="6.49"
      x2="10.05"
      y2="6.49"
      stroke={props.isactive ? "white" : inActiveGray}
      strokeWidth={2}
    />
    <line
      x1="2.77"
      y1="9.58"
      x2="10.05"
      y2="9.58"
      stroke={props.isactive ? "white" : inActiveGray}
      strokeWidth={2}
    />
    <line
      x1="2.77"
      y1="12.66"
      x2="7.74"
      y2="12.66"
      stroke={props.isactive ? "white" : inActiveGray}
      strokeWidth={2}
    />
  </Icon>
);
