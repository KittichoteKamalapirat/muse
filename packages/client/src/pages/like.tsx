import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Error } from "../components/skeletons/Error";
import { LikeSkeleton } from "../components/skeletons/LikeSkeleton";
import { Loading } from "../components/skeletons/Loading";
import { ContentWrapper } from "../components/Wrapper/ContentWrapper";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useMeQuery, useVotedPostsQuery } from "../generated/graphql";
import { withApollo } from "../util/withApollo";

const Like = () => {
  const { data, error, loading, fetchMore, variables } = useVotedPostsQuery({
    variables: { limit: 10, cursor: null as null | string },
    fetchPolicy: "cache-and-network",
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();

  if (loading) {
    return (
      <Wrapper>
        {[...Array(10)].map((x, index) => (
          <Box key={index} my={4}>
            <LikeSkeleton />{" "}
          </Box>
        ))}{" "}
      </Wrapper>
    );
  }

  if (error) {
    <Error text={error.message} />;
  }

  if (!meData?.me) {
    router.push("/");
  }

  const body = (() => {
    if (data?.votedPosts.posts.length === 0)
      return <Text>You don&apos;t have a favorite recipe</Text>;

    return (
      <Box>
        {data?.votedPosts.posts.map((post, index) => (
          <NextLink
            key={index}
            href={{
              pathname: "/post/[id]",
              query: { id: post.id },
            }}
            passHref
          >
            <Link>
              <Flex my={1}>
                <Box flex={1} m={1}>
                  <Image src={post.image.url} alt="image" borderRadius="10%" />
                </Box>
                <Box flex={2} m={1}>
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Text>{post.textSnippet}...</Text>
                </Box>
              </Flex>
            </Link>
          </NextLink>
        ))}
      </Box>
    );
  })();

  return (
    <Layout heading="like">
      <Wrapper>
        <ContentWrapper>
          <Heading fontSize="2xl">My Likes</Heading>
          <Box>{body}</Box>
        </ContentWrapper>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Like);
