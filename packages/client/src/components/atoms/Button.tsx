import React, { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps,
  ComponentWithAs,
} from "@chakra-ui/react";

type Props = ButtonProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?:
    | "outline"
    | "solid"
    | "unstyled"
    | "link"
    | "ghost"
    | (string & {})
    | undefined;
};

const Button: ComponentWithAs<"button", Props> = ({
  children,
  onClick,
  variant = "solid",
  ...props
}: Props) => {
  return (
    <ChakraButton
      width="100%"
      mt={2}
      onClick={onClick}
      variant={variant}
      color={variant === "solid" ? "white" : "brand"}
      _hover={{
        backgroundColor: variant === "solid" ? "brandHover" : "brandHoverPale",
      }}
      {...props} // props like width can overwrite width= 00%
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
