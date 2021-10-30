import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import {
  useUserQuery,
  usePostsByCreatorQuery,
  useMeQuery,
} from "../../generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import { withApollo } from "../../util/withApollo";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";

interface MyPostsProps {}

const MyPosts: React.FC<MyPostsProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();

  const { data: posts, loading } = usePostsByCreatorQuery({
    variables: { userId: meData?.me?.id as string },
  });

  return (
    <HeadingLayout heading="My posts">
      <Wrapper>
        {!posts ? (
          // <Box>hi</Box>
          <Box>This user has no posts.</Box>
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
                    <HeartIcon isactive={true} />
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
