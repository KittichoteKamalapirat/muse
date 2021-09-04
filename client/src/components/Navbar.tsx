import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  console.log("data ", data);
  let body = null;

  // data is loading
  if (fetching) {
  } else if (!data?.me) {
    // this can return undefined, then ! turn it to true
    // user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => logout()}
          isLoading={logoutFetching}
          variant={"link"}
        >
          logout
        </Button>
      </Flex>

      // no need ? because it is implied that it exsists, put the ifs befire
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={2} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
