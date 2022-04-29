import { Link } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Button from "./Button";
import NextLink from "next/link";

interface Props {
  children: ReactNode;
  pathname: string;
}

const ButtonLink = ({ children, pathname, ...props }: Props) => {
  return (
    <NextLink href={{ pathname }} passHref>
      <Link
        _hover={{
          textDecoration: "none",
        }}
      >
        <Button
          p={3}
          color="white"
          width="100%"
          _hover={{
            backgroundColor: "brandHover",
          }}
        >
          {children}
        </Button>
      </Link>
    </NextLink>
  );
};

export default ButtonLink;
