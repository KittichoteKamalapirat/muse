import { Image } from "@chakra-ui/image";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Button,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { usePostsByCreatorQuery, useMeQuery } from "../../generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import { withApollo } from "../../util/withApollo";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { LikeSkeleton } from "../../components/skeletons/LikeSkeleton";
import NextLink from "next/link";

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
      <Wrapper>
        {posts && posts.postsByCreator.length === 0 ? (
          <Flex
            height="80vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontWeight="normal" fontSize="md" m={2}>
              You have not created any posts yet!{" "}
            </Heading>
            <Button>
              <NextLink href="/create-post">
                <Text as={Link}>
                  {/* <SmallAddIcon />  */}
                  Create a new post with Meal kit
                </Text>
              </NextLink>
            </Button>
          </Flex>
        ) : (
          <Box>
            {posts.postsByCreator.map((post) => (
              <Flex key={post.id}>
                <Box flex={1} my={2}>
                  <Image
                    src={post.thumbnailUrl}
                    alt="image"
                    borderRadius="10%"
                  />
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
                  <EditDeletePostButtons id={post.id} />
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(MyPosts);
