import React, { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps,
  ComponentWithAs,
} from "@chakra-ui/react";

type Props = ButtonProps & {
  children: ReactNode;
  textAlign?: "center" | "start" | "end";
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: Function;
  variant?: "outline" | "solid" | "unstyled" | "link" | "ghost";
};

const Button: ComponentWithAs<"button", Props> = ({
  children,
  textAlign = "center",
  size = "md",
  onClick,
  variant = "solid",
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
        onClick={onClick}
        variant={variant}
        _hover={{
          backgroundColor:
            variant === "solid" ? "brandHover" : "brandHoverPale",
        }}
        {...props}
      >
        {children}
      </ChakraButton>
    </div>
  );
};

export default Button;
