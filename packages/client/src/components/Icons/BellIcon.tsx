import { Icon } from "@chakra-ui/react";
import React from "react";
import { inActiveGray, primaryColor } from "../Variables";

interface BellProps {
  isactive?: string;
}

export const BellIcon = (props: BellProps) => (
  <Icon viewBox="0 0 23.81 21.41" {...props} width="1.1rem" height="1.1rem">
    <path
      d="M18.26,14.42l-2.19-1.84A6.56,6.56,0,0,1,14,9.4l-.59-2a6,6,0,0,0-6-4.06L7,1.91A1.76,1.76,0,0,0,4.76.83,1.77,1.77,0,0,0,3.46,3l.43,1.43A5.94,5.94,0,0,0,1.06,11l.59,2a6.68,6.68,0,0,1,0,3.81L.77,19.57a.37.37,0,0,0,.11.4.46.46,0,0,0,.44.09l16.74-4.92a.47.47,0,0,0,.32-.32A.4.4,0,0,0,18.26,14.42Z"
      fill={props.isactive ? primaryColor : "none"}
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeMiterlimit={10}
      strokeWidth={2}
    />

    <path
      d="M10 18.8a.26.26 0 0 1 .34.28A3 3 0 0 1 5 20.67a.27.27 0 0 1 .13-.42Z"
      fill={props.isactive ? primaryColor : inActiveGray}
      strokeMiterlimit={10}
    />
  </Icon>
);
