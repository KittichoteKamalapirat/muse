import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { FollowSection } from "../../components/FollowSection";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import { Layout } from "../../components/Layout/Layout";
import { inActiveGray, primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import {
  useFollowersQuery,
  useMeQuery,
  usePostsByCreatorQuery,
  User,
  useToggleFollowMutation,
  useUserQuery,
} from "../../generated/graphql";
import { useGetUserId } from "../../util/useGetUserId";
import { withApollo } from "../../util/withApollo";
import { ReviewStars } from "../../components/ReviewStars";
import { ContentWrapper } from "../../components/Wrapper/ContentWrapper";

interface PublicProfileProps {}

const PublicProfile: React.FC<PublicProfileProps> = ({}) => {
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

  const {
    data: followerData,
    loading: followerLoading,
    error: followerError,
  } = useFollowersQuery({
    variables: { userId: userId },
  });

  if (userLoading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }

  if (userError) {
    return <Text>{userError.message}</Text>;
  }
  return (
    <HeadingLayout
      heading={userLoading || !userData ? "" : userData.user!.username}
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
                    reviewScore={userData?.user.userReview.reviewScore!}
                    reviewsCounter={userData?.user.userReview.reviewCounter}
                    flexDirection="column"
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Box flex={1} ml={2}>
            {/* <Heading fontSize="md">{userData?.user?.username}</Heading> */}
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
                        <HeartIcon isactive={true ? "true" : undefined} />
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
