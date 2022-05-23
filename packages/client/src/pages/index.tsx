import { LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { Avatar, Box, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useCallback, useRef } from "react";
import Button from "../components/atoms/Button";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout/Layout";
import { ReviewStars } from "../components/ReviewStars";
import { Error } from "../components/skeletons/Error";
import { NewsFeedSkeleton } from "../components/skeletons/NewsFeedSkeleton";
import { UpvoteSection } from "../components/UpvoteSection";
import { Welcome } from "../components/Welcome";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../util/withApollo";

const Index = () => {
  const { data: meData, loading: meLoading } = useMeQuery(); //this is renaming synta when destructing data => meData

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
    fetchPolicy: "no-cache", // without this, somehow pots become duplicate
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    // node is basically the current last post
    (node) => {
      if (observer.current) observer.current.disconnect(); // disconnect from the previous last element
      observer.current = new IntersectionObserver((entries) => {
        // entries is an array of everything it is watching
        // in our case, there is just one thing
        if (data?.posts.hasMore && entries[0].isIntersecting) {
          fetchMore({
            variables: {
              limit: variables?.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            },
          });
        }
      });
      if (node) observer.current.observe(node); // observe our last node
    },
    [data?.posts.hasMore]
  );

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
    return <Error text={error?.message} />;
  }
  return (
    <Layout heading="home">
      {/* Navbar also does server side rendering since it's inside this fille with ssr */}
      {/* add ! because it can't be undefined becase wee catched it! typescrypt didnt know that somehow */}

      <Stack
        spacing={4}
        maxW={["none", "none", "30%", " 20%"]}
        mx={["none", "auto"]}
      >
        {data!.posts.posts.map((post, index) =>
          !post ? (
            <NewsFeedSkeleton />
          ) : (
            <Box
              key={post.id}
              ref={data.posts.posts.length === index + 1 ? lastPostRef : null}
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
                    <EditDeletePostButtons
                      id={post.id}
                      isPublished={post.isPublished}
                    />
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
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
