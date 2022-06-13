import { Box, Divider, Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import LinkButton from "../../../components/atoms/LinkButton";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Error } from "../../../components/skeletons/Error";
import { Loading } from "../../../components/skeletons/Loading";
import { ContentWrapper } from "../../../components/Wrapper/ContentWrapper";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import { useMeQuery } from "../../../generated/graphql";
import { isServer } from "../../../util/isServer";
import { withApollo } from "../../../util/withApollo";

const Info = () => {
  const { data, loading, error } = useMeQuery({
    skip: isServer(),
  });

  if (loading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout heading="error">
        <Error text={error.message} />
      </Layout>
    );
  }

  return (
    <HeadingLayout heading="My Account Information">
      <XWrapper mt={20}>
        <ContentWrapper>
          <Box>
            <Heading size="xs" as="h3">
              username
            </Heading>
            <Text fontSize="md">{data?.me?.username}</Text>
          </Box>
          <Divider mt={2} />

          <Box>
            <Heading size="xs" as="h3">
              email
            </Heading>
            <Text fontSize="md">{data?.me?.email}</Text>
          </Box>
          <Divider mt={2} />

          <Box>
            <Heading size="xs" as="h3">
              phonenumber
            </Heading>
            <Text fontSize="md">{data?.me?.phonenumber}</Text>
          </Box>
          <Divider mt={2} />

          {!data?.me?.isCreator ? null : (
            <Box>
              <Heading size="xs" as="h3">
                about
              </Heading>
              <Text fontSize="md">{data?.me?.about}</Text>
            </Box>
          )}
          <Divider mt={2} />

          <Box justifyContent="center" mt={4}>
            <LinkButton pathname="/account/info/update">
              Edit account info
            </LinkButton>
          </Box>
        </ContentWrapper>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Info);
