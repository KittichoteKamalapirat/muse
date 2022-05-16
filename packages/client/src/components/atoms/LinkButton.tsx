import { ButtonProps as ChakraButtonProps, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactNode } from "react";
import Button from "./Button";

type Props = ChakraButtonProps & {
  children: ReactNode;
  pathname?: string;
  href?: any;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  width?: "100%" | "fit-content" | "min-content";
};

const LinkButton = ({
  children,
  href,
  pathname,
  leftIcon,
  width = "100%",
  ...props
}: Props) => {
  return (
    <NextLink href={href || { pathname }} passHref>
      <Link
        _hover={{
          textDecoration: "none",
        }}
      >
        <Button
          _hover={{
            backgroundColor: "brandHover",
          }}
          leftIcon={leftIcon}
          width={width}
          {...props}
        >
          {children}
        </Button>
      </Link>
    </NextLink>
  );
};

export default LinkButton;
