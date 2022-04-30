import { InfoIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, Link, Text, Flex } from "@chakra-ui/layout";
import React from "react";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Wrapper } from "../../../components/Wrapper";
import { useMeQuery } from "../../../generated/graphql";
import { isServer } from "../../../util/isServer";
import { withApollo } from "../../../util/withApollo";
import NextLink from "next/link";
import { primaryColor } from "../../../components/Variables";
import { Button } from "@chakra-ui/button";
import LinkButton from "../../../components/atoms/LinkButton";

interface infoProps {}

const Info: React.FC<infoProps> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <HeadingLayout heading="My Account Information">
      <Wrapper>
        <Box mt={2}>
          <Flex alignItems="start">
            <Text flex={1} fontSize="md">
              username
            </Text>
            <Text flex={2} fontSize="md">
              {data?.me?.username}
            </Text>
          </Flex>
          <Divider mt={2} />

          <Flex alignItems="start">
            <Text flex={1} fontSize="md">
              email
            </Text>
            <Text flex={2} fontSize="md">
              {data?.me?.email}
            </Text>
          </Flex>
          <Divider mt={2} />

          <Flex alignItems="start">
            <Text flex={1} fontSize="md">
              phonenumber
            </Text>
            <Text flex={2} fontSize="md">
              {data?.me?.phonenumber}
            </Text>
          </Flex>
          <Divider mt={2} />

          {!data?.me?.isCreator ? null : (
            <Flex alignItems="start">
              <Text flex={1} fontSize="md">
                about
              </Text>
              <Text flex={2} fontSize="md">
                {data?.me?.about}
              </Text>
            </Flex>
          )}
          <Divider mt={2} />

          <Flex justifyContent="center" mt={4}>
            <LinkButton pathname="/account/info/update">
              Edit account info
            </LinkButton>
          </Flex>
        </Box>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Info);
