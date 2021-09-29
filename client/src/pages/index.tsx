import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { UpvoteSection } from "../components/UpvoteSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { withApollo } from "../util/withApollo";

const Index = () => {
  const { data: meData } = useMeQuery(); //this is renaming synta when destructing data => meData

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
  });

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
      {!data && loading ? (
        <div>loading ... </div>
      ) : (
        <Stack spacing={4}>
          {data!.posts.posts.map((post) =>
            !post ? null : (
              <Box
                key={post.id}
                // shadow="md"
                // borderWidth="1px"
              >
                <Flex alignItems="center">
                  <Image
                    m={2}
                    width="2.5rem"
                    src={post.creator.avatar}
                    alt="creator avatar"
                    borderRadius="50%"
                    border={2}
                    borderStyle="solid"
                    borderColor="red.400"
                  />

                  <Text> {post.creator.username}</Text>
                </Flex>

                <Flex key={post.id}>
                  <Box flex={1}>
                    <video controls>
                      <source src={post.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <Flex justifyContent="space-between">
                      <UpvoteSection post={post} />

                      {meData?.me?.id !== post.creator.id ? null : (
                        <Box>
                          <EditDeletePostButtons id={post.id} />
                        </Box>
                      )}
                    </Flex>
                    <NextLink
                      href={{
                        pathname: "/post/[id]",
                        query: { id: post.id },
                      }}
                    >
                      <Link>
                        <Heading fontSize="xl">{post.title}</Heading>
                      </Link>
                    </NextLink>

                    <Flex justifyContent="space-between" alignItems="center">
                      <Text>{post.textSnippet}... </Text>
                      {/* show the box only if I own the post */}
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )
          )}
        </Stack>
      )}

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
