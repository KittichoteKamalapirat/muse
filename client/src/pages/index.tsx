import { PostsDocument, useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Avatar,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { UpvoteSection } from "../components/UpvoteSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { withApollo } from "../util/withApollo";
import { Welcome } from "../components/Welcome";
import { NewsFeedSkeleton } from "../components/Icons/NewsFeedSkeleton";
import { primaryColor } from "../components/Variables";

const Index = () => {
  const { data: meData, loading: meLoading } = useMeQuery(); //this is renaming synta when destructing data => meData

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
  });

  if (meLoading) {
    return <Text>Loading</Text>;
  }
  if (!meData?.me && data?.posts) {
    return <Welcome posts={data.posts.posts} />;
  }
  if (loading) {
    return <NewsFeedSkeleton />;
  }
  if (!loading && !data) {
    return (
      <div>
        <div>query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <Layout>
      {/* Navbar also does server side rendering since it's inside this fille with ssr */}
      {/* add ! because it can't be undefined becase wee catched it! typescrypt didnt know that somehow */}

      <Stack spacing={4} maxW={["none", "40%"]} mx={["none", "auto"]}>
        {data!.posts.posts.map((post) =>
          !post ? (
            <NewsFeedSkeleton />
          ) : (
            <Box
              key={post.id}
              // shadow="md"
              // borderWidth="1px"
            >
              <Flex alignItems="center" justifyContent="space-between">
                <NextLink
                  href={{
                    pathname: "/user/[id]", //has to be id -> not userId. I think it has to match the file
                    query: { id: post.creator.id },
                  }}
                >
                  <Link style={{ textDecoration: "none" }}>
                    <Flex alignItems="center">
                      <Avatar
                        m={2}
                        size="sm"
                        src={post.creator.avatar}
                        alt="creator avatar"
                        border={1}
                        // showBorder={true}
                        // borderStyle="solid"
                        // borderColor={primaryColor}
                        // bg="white"
                      />

                      <Text>{post.creator.username}</Text>
                    </Flex>
                  </Link>
                </NextLink>

                {meData?.me?.id !== post.creator.id ? null : (
                  <Box>
                    <EditDeletePostButtons id={post.id} />
                  </Box>
                )}
              </Flex>

              <Flex key={post.id}>
                <Box flex={1}>
                  <video controls>
                    <source src={post.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Flex justifyContent="space-between">
                    <UpvoteSection post={post} />
                  </Flex>
                  <Box mx={2}>
                    <NextLink
                      href={{
                        pathname: "/post/[id]",
                        query: { id: post.id },
                      }}
                    >
                      <Link style={{ textDecoration: "none" }}>
                        <Heading fontSize="xl">{post.title}</Heading>
                        <Text>{post.textSnippet}... </Text>
                      </Link>
                    </NextLink>
                  </Box>
                </Box>
              </Flex>
            </Box>
          )
        )}
      </Stack>

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            bgColor="lightgrey"
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
