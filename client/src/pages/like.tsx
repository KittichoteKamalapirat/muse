import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery, useVotedPostsQuery } from "../generated/graphql";
import { withApollo } from "../util/withApollo";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface likeProps {}

const Like: React.FC = ({}) => {
  const { data, error, loading, fetchMore, variables } = useVotedPostsQuery({
    variables: { limit: 10, cursor: null as null | string },
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();

  let body = null;

  if (loading) {
    body = <Text>Loading</Text>;
  } else if (!meData?.me) {
    router.push("/");
    // body = <Text>You don't have a favorite recipe</Text>;
  } else {
    body = (
      <Box>
        {data?.votedPosts.posts.map((post, index) => (
          <NextLink
            key={index}
            href={{
              pathname: "/post/[id]",
              query: { id: post.id },
            }}
          >
            <Link>
              <Flex m={2}>
                <Box flex={1} m={2}>
                  <Image
                    src={post.thumbnailUrl}
                    alt="image"
                    borderRadius="10%"
                  />
                </Box>
                <Box flex={2} m={2}>
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Text>{post.textSnippet}...</Text>
                </Box>
              </Flex>
            </Link>
          </NextLink>
        ))}
      </Box>
    );
  }
  return (
    <Layout>
      <Text ml="1rem" fontSize="xl">
        เมนูโปรดของฉัน
      </Text>
      <Box>{body}</Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Like);
