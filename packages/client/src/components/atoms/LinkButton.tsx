import { ButtonProps as ChakraButtonProps, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactNode } from "react";
import Button from "./Button";

type Props = ChakraButtonProps & {
  children: ReactNode;
  pathname?: string;
  variant?:
    | "outline"
    | "solid"
    | "unstyled"
    | "link"
    | "ghost"
    // | (string & {})
    | string
    | undefined;
  href?: any;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  width?: "100%" | "fit-content" | "min-content";
  isExternal?: boolean;
};

const LinkButton = ({
  children,
  href,
  pathname,
  leftIcon,
  width = "100%",
  variant,
  isExternal = false,
  ...props
}: Props) => {
  return (
    <NextLink href={href || { pathname }} passHref>
      <Link
        isExternal={isExternal}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Button leftIcon={leftIcon} width={width} variant={variant} {...props}>
          {children}
        </Button>
      </Link>
    </NextLink>
  );
};

export default LinkButton;
