import React, { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps,
  ComponentWithAs,
} from "@chakra-ui/react";
import { whiten } from "@chakra-ui/theme-tools";

type Props = ButtonProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: "100%" | "fit-content" | "min-content" | string;
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
  width = "100%",

  ...props
}: Props) => {
  const color = (() => {
    switch (variant) {
      case "solid":
        return "white";
      case "unstyled":
        return "black";
      default:
        return "brand";
    }
  })();

  const hoverColor = (() => {
    switch (variant) {
      case "solid":
        return "brandHover";
      case "unstyled":
        return "white";
      default:
        return "brandHoverPale";
    }
  })();

  console.log(hoverColor);
  return (
    <ChakraButton
      width={width}
      mt={2}
      onClick={onClick}
      variant={variant}
      color={color}
      textAlign={(variant = "unstyled" ? "left" : "center")}
      _hover={{
        backgroundColor: hoverColor,
      }}
      {...props} // props like width can overwrite width= 00%
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
