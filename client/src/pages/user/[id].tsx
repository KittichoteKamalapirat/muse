import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper";
import {
  useMeQuery,
  usePostsByCreatorQuery,
  useUserQuery,
} from "../../generated/graphql";
import { useGetUserId } from "../../util/useGetUserId";
import { withApollo } from "../../util/withApollo";

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const userId = useGetUserId();
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { id: userId },
  });
  const { data: posts, loading } = usePostsByCreatorQuery({
    variables: { userId: userId },
  });
  console.log(userId);
  console.log({ posts });
  console.log(posts?.postsByCreator.length);

  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }
  return (
    <HeadingLayout
      heading={userLoading || !userData ? "" : userData.user!.username}
    >
      <Wrapper>
        <Box>
          <Image
            margin="auto"
            width="40%"
            borderRadius="50%"
            border={5}
            borderStyle="solid"
            borderColor="red.400"
            src={userData?.user?.avatar}
            alt={userData?.user?.username}
          />{" "}
        </Box>
        <Box mt={4}>
          <Heading fontSize="xl">Menu</Heading>
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
                </Flex>
              ))}
            </Box>
          )}
        </Box>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: true })(User);
