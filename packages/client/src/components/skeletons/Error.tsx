import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { urlResolver } from "../../lib/UrlResolver";
import LinkButton from "../atoms/LinkButton";

interface Props {
  text?: string;
  overlay?: boolean;
}

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
        <Text color="alert" fontWeight="bold" mb={5} textAlign="center">
          {text || "Hmm.. something is wrong"}
        </Text>

        <LinkButton pathname={homeUrl}>Back to Home</LinkButton>
      </Flex>
    </Flex>
  );
};
