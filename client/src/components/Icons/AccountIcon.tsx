import { Icon } from "@chakra-ui/react";
import React from "react";
import { primaryColor, inActiveGray } from "../Variables";

interface AccountIconProps {
  isactive?: string;
}

export const AccountIcon = (props: AccountIconProps) => (
  <Icon viewBox="0 0 17.7 21.84">
    <circle
      cx="8.74"
      cy="5.99"
      r="5.49"
      fill={props.isactive ? primaryColor : "none"}
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
    />
    {/* <path
      d="M8.74,13.31h0C4.18,13.31.5,16,.5,19.27h0c0,.87,1,1.57,2.17,1.57H14.83c1.18,0,2.17-.7,2.17-1.57h0C17,16,13.3,13.31,8.74,13.31Z"
      fill={props.isactive ? primaryColor : "none"}
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
    /> */}
  </Icon>
);
