import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import UrlResolver from "../../lib/UrlResolver";
import Button from "../atoms/Button";
import LinkButton from "../atoms/LinkButton";

interface Props {
  text?: string;
  overlay?: boolean;
}

const urlResolver = new UrlResolver();

export const Error = ({ text, overlay = false }: Props) => {
  const homeUrl = urlResolver.index();
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <WarningIcon color="alert" fontSize="5xl" mb={5} />
        <Text color="alert" fontWeight="bold" mb={5}>
          {text || "Hmm.. something is wrong"}
        </Text>

        <LinkButton pathname={homeUrl}>Back to Home</LinkButton>
      </Flex>
    </Flex>
  );
};
