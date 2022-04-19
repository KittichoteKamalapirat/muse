import React, { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps,
  ComponentWithAs,
} from "@chakra-ui/react";

enum Position {
  center = "center",
  left = "left",
  right = "right",
}
// interface Props extends ComponentWithAs<"button", ButtonProps> {
//   children: ReactNode;
//   position?: Position;
// }

type Props = ButtonProps & {
  children: ReactNode;
  position?: Position;
};

const Button = ({ children, position, ...props }: Props) => {
  return <ChakraButton color="white">{children}</ChakraButton>;
};

export default Button;
