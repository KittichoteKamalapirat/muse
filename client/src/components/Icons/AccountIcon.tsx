import { Icon } from "@chakra-ui/react";
import React from "react";
import { primaryColor, inActiveGray } from "../Variables";

interface AccountIconProps {}

{
  /* <style>.cls-1{fill:#fac5cc;}.cls-2{fill:none;stroke:#8e8e8e;stroke-miterlimit:10;}</style> */
}

export const AccountIcon = (props: any) => (
  <Icon viewBox="0 0 17.7 21.84" {...props}>
    {/* <circle
      cx="9.44"
      cy="6.99"
      r="5.49"
      stroke="white"
    />
    <path
      stroke="white"
      d="M9.44,14.31h0c-4.55,0-8.24,2.67-8.24,6h0c0,.87,1,1.57,2.17,1.57H15.53c1.18,0,2.17-.7,2.17-1.57h0C17.68,17,14,14.31,9.44,14.31Z"
    /> */}
    <circle
      cx="8.74"
      cy="5.99"
      r="5.49"
      fill={props.isActive ? primaryColor : "none"}
      stroke={props.isActive ? primaryColor : inActiveGray}
      strokeWidth={2}
    />
    <path
      d="M8.74,13.31h0C4.18,13.31.5,16,.5,19.27h0c0,.87,1,1.57,2.17,1.57H14.83c1.18,0,2.17-.7,2.17-1.57h0C17,16,13.3,13.31,8.74,13.31Z"
      fill={props.isActive ? primaryColor : "none"}
      stroke={props.isActive ? primaryColor : inActiveGray}
      strokeWidth={2}
    />
  </Icon>
);
