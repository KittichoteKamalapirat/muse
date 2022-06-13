import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { FollowSection } from "../../components/FollowSection";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { Layout } from "../../components/Layout/Layout";
import { ReviewStars } from "../../components/ReviewStars";
import { Error } from "../../components/skeletons/Error";
import { ContentWrapper } from "../../components/Wrapper/ContentWrapper";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import {
  usePostsByCreatorQuery,
  User,
  useUserQuery,
} from "../../generated/graphql";
import { useGetUserId } from "../../util/useGetUserId";
import { withApollo } from "../../util/withApollo";

const PublicProfile = () => {
  const userId = useGetUserId();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserQuery({
    variables: { id: userId },
  });

  const { data: posts, loading: postLoading } = usePostsByCreatorQuery({
    variables: { userId: userId },
  });

  if (userLoading || postLoading) {
    return (
      <Layout heading="loading">
        <div>loading ...</div>
      </Layout>
    );
  }

  if (userError) {
    return (
      <Layout heading="error">
        <Error text={userError.message} />
      </Layout>
    );
  }
  return (
    <HeadingLayout
      heading={userLoading || !userData ? "" : userData.user.username}
    >
      <Wrapper>
        <ContentWrapper>
          <Flex alignItems="center" mt={20}>
            <Box flex={1}>
              {" "}
              <Image
                margin="auto"
                borderRadius="50%"
                border={5}
                borderStyle="solid"
                borderColor="red.400"
                src={userData?.user?.avatar}
                alt="avatar"
              />
            </Box>

            <Box flex={1} ml={2}>
              <Box textAlign="center">
                <Text> {userData?.user.followerNum}</Text>
                <Text fontSize="sm">Followers</Text>
              </Box>
            </Box>

            <Box>
              <Flex flexDirection="column" alignItems="center">
                {" "}
                <Text>{userData?.user.userReview.reviewScore}</Text>{" "}
                <Flex fontSize="sm">
                  <ReviewStars
                    reviewScore={
                      userData?.user.userReview.reviewScore as number
                    }
                    reviewsCounter={userData?.user.userReview.reviewCounter}
                    flexDirection="column"
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Box flex={1} ml={2}>
            <Text>{userData?.user?.about}</Text>
          </Box>
          <Box>
            {userData && (
              <FollowSection
                targetUserId={userId}
                user={userData?.user as User}
              />
            )}
          </Box>
          <Box mt={4}>
            <Heading fontSize="xl">Menu</Heading>
            {!posts ? (
              <Box>This user has no posts.</Box>
            ) : (
              <Box>
                {posts.postsByCreator.map((post) => (
                  <Flex key={post.id}>
                    <Box flex={1} my={2}>
                      <Image
                        src={post.image.url}
                        alt="image"
                        borderRadius="10%"
                      />
                    </Box>
                    <Box flex={2} m={2}>
                      <Text>{post.title}</Text>
                      <Text>{post.text.slice(0, 60)} ...</Text>
                      <Flex alignItems="center">
                        <HeartIcon isactive="true" />
                        <Text ml={2}>{post.points}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        </ContentWrapper>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: true })(PublicProfile);
