import { PostsDocument, useMeQuery, usePostsQuery } from "../generated/graphql";

import NextLink from "next/link";
import { Link, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Avatar,
  Stack,
  Text,
  Img,
} from "@chakra-ui/react";
import React from "react";
import { UpvoteSection } from "../components/UpvoteSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { withApollo } from "../util/withApollo";
import { Welcome } from "../components/Welcome";

import { NewsFeedSkeleton } from "../components/skeletons/NewsFeedSkeleton";
import { Layout } from "../components/Layout/Layout";
import { ReviewStars } from "../components/ReviewStars";

const Index = () => {
  const { data: meData, loading: meLoading } = useMeQuery(); //this is renaming synta when destructing data => meData

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
  });

  // 1. both loading -> retunr skeleton
  // 2. not meLoading && no meData -> redirect to welcome
  // 3. not loading && no data
  // 4. both not loading -> data and
  if (loading || meLoading) {
    return <NewsFeedSkeleton />;
  }

  if (!meData?.me) {
    return <Welcome />;
  }

  if (!data) {
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

      <Stack
        spacing={4}
        maxW={["none", "none", "30%", " 20%"]}
        mx={["none", "auto"]}
      >
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
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/user/[id]", //has to be id -> not userId. I think it has to match the file
                      query: { id: post.creator.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>
                      <Flex alignItems="center">
                        <Avatar
                          m={2}
                          size="sm"
                          src={post.creator.avatar}
                          name="creator avatar"
                          border={1}
                        />

                        <Text>{post.creator.username}</Text>
                      </Flex>
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>

                {meData?.me?.id !== post.creator.id ? null : (
                  <Box>
                    <EditDeletePostButtons id={post.id} />
                  </Box>
                )}
              </Flex>
              <Flex key={post.id}>
                <Box flex={1}>
                  <video
                    controls
                    src={post.video.url}
                    poster={post.image.url}
                  />

                  <Flex justifyContent="space-between">
                    <UpvoteSection post={post} />
                  </Flex>

                  <LinkBox _hover={{ cursor: "pointer" }}>
                    <Box mx={2}>
                      <NextLink
                        href={{
                          pathname: "/post/[id]",
                          query: { id: post.id },
                        }}
                        passHref
                      >
                        <LinkOverlay>
                          <Heading fontSize="xl">{post.title}</Heading>
                          <Text>{post.textSnippet}... </Text>
                        </LinkOverlay>
                      </NextLink>
                    </Box>

                    <Box
                      m={1}
                      // borderWidth="1px" borderColor="gray.200"
                    >
                      {post.mealkits?.map((mealkit) => (
                        <Flex key={mealkit.id}>
                          <Img
                            src={mealkit.mealkitFiles[0].url}
                            width="25%"
                            borderRadius={5}
                          />
                          <Box m={1}>
                            <Heading fontSize="md">
                              Meal Kit: {mealkit.name}
                            </Heading>
                            <Text>
                              For: {mealkit.portion}{" "}
                              {mealkit.portion > 1 ? "people" : "person"}
                            </Text>
                            <Box justifyContent="space-between">
                              {mealkit.reviewsCounter !== 0 && (
                                <ReviewStars
                                  reviewScore={mealkit.reviewAvg}
                                  reviewsCounter={mealkit.reviewsCounter}
                                />
                              )}

                              <Text>฿ {mealkit.price}</Text>
                            </Box>
                          </Box>
                        </Flex>
                      ))}
                    </Box>
                  </LinkBox>
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
