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
  size?: "xs" | "sm" | "md" | "lg";
};

const Button = ({
  children,
  position,
  textAlign = "center",
  size = "sm",
  ...props
}: Props) => {
  return (
    <div>
      <ChakraButton
        width="100%"
        color="white"
        my={2}
        size={size}
        textAlign={textAlign}
      >
        {children}
      </ChakraButton>
    </div>
  );
};

export default Button;
