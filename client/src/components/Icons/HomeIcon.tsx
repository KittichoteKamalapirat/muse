import { Icon } from "@chakra-ui/react";
import React from "react";
import { inActiveGray, primaryColor } from "../Variables";

interface HomeProps {
  isactive?: string;
}

export const HomeIcon = (props: HomeProps) => (
  <Icon
    viewBox="0 0 22.89 22.52"
    // {...props}
  >
    {/* <path d="M22,13.77H20.22v7.86a.88.88,0,0,1-.88.89H14.91V16.63a.89.89,0,0,0-.89-.89H10.07a.88.88,0,0,0-.88.89v5.89H4.75a.88.88,0,0,1-.88-.89V13.77H2.09a.88.88,0,0,1-.64-1.49l10-10.51a.91.91,0,0,1,1.29,0l10,10.51A.88.88,0,0,1,22,13.77Z" /> */}
    <path
      d="M21.3,12.77H19.52v7.87a.88.88,0,0,1-.88.88H14.21V15.63a.89.89,0,0,0-.89-.89h-4a.89.89,0,0,0-.89.89v5.89H4.05a.88.88,0,0,1-.88-.88V12.77H1.38a.88.88,0,0,1-.63-1.49L10.7.77A.91.91,0,0,1,12,.77l10,10.51A.88.88,0,0,1,21.3,12.77Z"
      fill={props.isactive ? primaryColor : "none"}
      stroke={props.isactive ? primaryColor : inActiveGray}
      strokeWidth={2}
    />
  </Icon>
);
