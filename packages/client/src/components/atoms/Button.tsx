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
  textAlign?: "center" | "start" | "end";
};

const Button = ({
  children,
  position,
  textAlign = "center",
  ...props
}: Props) => {
  return (
    <div style={{ textAlign }}>
      <ChakraButton color="white">{children}</ChakraButton>
    </div>
  );
};

export default Button;
