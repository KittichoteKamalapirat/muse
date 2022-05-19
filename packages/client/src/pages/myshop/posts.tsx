import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import LinkButton from "../../components/atoms/LinkButton";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { LikeSkeleton } from "../../components/skeletons/LikeSkeleton";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { XWrapper } from "../../components/Wrapper/XWrapper";

import { useMeQuery, usePostsByCreatorQuery } from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

interface MyPostsProps {}

const MyPosts: React.FC<MyPostsProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();

  const {
    data: posts,
    loading,
    error,
  } = usePostsByCreatorQuery({
    variables: { userId: meData?.me?.id as string },
  });

  console.log({ posts });
  if (loading) {
    return (
      <Wrapper>
        <LikeSkeleton />
      </Wrapper>
    );
  }

  if (!posts) {
    return <Text>{error?.message}</Text>;
  }
  return (
    <HeadingLayout heading="My posts">
      <XWrapper>
        {posts && posts.postsByCreator.length === 0 ? (
          <Flex
            height="80vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontWeight="normal" fontSize="md" m={2}>
              You have not created any posts yet!
            </Heading>

            <LinkButton pathname="/create-post">
              Create a new post with Meal kit
            </LinkButton>
          </Flex>
        ) : (
          <Box>
            {posts.postsByCreator.map((post) => (
              <Flex
                key={post.id}
                backgroundColor={post.isPublished ? "" : "gray.100"}
              >
                <Box flex={1} my={2}>
                  <NextLink href={`/post/${post.id}`} passHref>
                    <Image
                      src={post.image.url}
                      alt="image"
                      borderRadius="10%"
                    />
                  </NextLink>
                </Box>
                <Box flex={2} m={2}>
                  <Text>{post.title}</Text>
                  <Text>{post.text.slice(0, 60)} ...</Text>
                  <Flex alignItems="center">
                    <HeartIcon isactive={true ? "true" : undefined} />
                    <Text ml={2}>{post.points}</Text>
                  </Flex>
                </Box>

                <Box>
                  <EditDeletePostButtons
                    id={post.id}
                    isPublished={post.isPublished}
                  />
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(MyPosts);
