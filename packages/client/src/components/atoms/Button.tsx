import React, { ReactNode } from "react";
import {
  Button as ChakraButton,
  ButtonProps,
  ComponentWithAs,
} from "@chakra-ui/react";

type Props = ButtonProps & {
  children: ReactNode;
  width?: string;
  // textAlign?: "center" | "start" | "end";
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
  width = "100%",
  onClick,
  variant = "solid",
  ...props
}: Props) => {
  return (
    <div>
      <ChakraButton
        width={width}
        mt={2}
        onClick={onClick}
        variant={variant}
        color={variant === "solid" ? "white" : "brand"}
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
