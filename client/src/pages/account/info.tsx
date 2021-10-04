import { InfoIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, Link, Text, Flex } from "@chakra-ui/layout";
import React from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { Wrapper } from "../../components/Wrapper";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../util/isServer";
import { withApollo } from "../../util/withApollo";

interface infoProps {}

const Info: React.FC<infoProps> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <HeadingLayout heading="My Account Information">
      <Wrapper>
        <Box mt={2}>
          <Flex alignItems="flex-end">
            <Text flex={1} fontSize="md">
              username
            </Text>
            <Text flex={3} fontSize="lg">
              {data?.me?.username}
            </Text>
          </Flex>

          <Divider mt={2} />
        </Box>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Info);
