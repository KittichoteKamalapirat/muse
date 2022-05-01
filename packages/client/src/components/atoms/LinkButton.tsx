import {
  ButtonProps as ChakraButtonProps,
  ComponentWithAs,
  IconProps,
  Link,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Button from "./Button";
import NextLink from "next/link";

type Props = ChakraButtonProps & {
  children: ReactNode;
  pathname?: string;
  href?: any;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const LinkButton = ({
  children,
  href,
  pathname,
  leftIcon,
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
          {...props}
        >
          {children}
        </Button>
      </Link>
    </NextLink>
  );
};

export default LinkButton;
