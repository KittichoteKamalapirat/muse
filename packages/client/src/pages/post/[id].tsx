import { Avatar, Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import IngredientList from "../../components/IngredientList";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { Layout } from "../../components/Layout/Layout";
import { MealkitInfo } from "../../components/MealkitInfo";
import { Loading } from "../../components/skeletons/Loading";
import { ContentWrapper } from "../../components/Wrapper/ContentWrapper";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Ingredient, useMeQuery } from "../../generated/graphql";
import { useGetPostFromUrl } from "../../util/useGetPostFromUrl";
import { withApollo } from "../../util/withApollo";

const Post = ({}) => {
  const { data, loading } = useGetPostFromUrl();
  const { data: meData } = useMeQuery();

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (!data?.post) {
    //finish downloading, cannot finda post( like wrong id)
    return (
      <Layout>
        <div>could not find a post</div>
      </Layout>
    );
  }
  return (
    // <Box bgColor="gray.100">
    <>
      <HeadingLayout heading={data?.post?.title}>
        <Wrapper>
          <Box
            // maxW={["none", "none", "40%"]}
            mx={["none", "auto"]}
            bgColor="white"
          >
            <Flex justifyContent="space-between">
              <Flex alignItems="center">
                <Avatar
                  m={2}
                  size="sm"
                  src={data?.post.creator.avatar}
                  name="creator avatar"
                  border={1}
                />
                <Text>{data?.post.creator.username}</Text>
              </Flex>

              {meData?.me?.id !== data.post.creator.id ? null : (
                <EditDeletePostButtons
                  id={data.post.id}
                  isPublished={data.post.isPublished}
                />
              )}
            </Flex>
            <video
              controls
              src={data?.post.video.url}
              poster={data?.post.image.url}
            />

            <ContentWrapper>
              <Heading fontSize="x-large">
                {/* เกี่ยวกับเมนูนี้ */}
                About this dish
              </Heading>
              {!data?.post?.cooktime ? null : (
                <Text mb={4}> เวลาในการทำ: {data.post.cooktime}</Text>
              )}
              <Text mb={4}> {data?.post?.text}</Text>

              <Heading fontSize="large" fontWeight="semibold">
                {/* วัตถุดิบ */}
                Ingredients
              </Heading>
              {!data.post.portion ? null : (
                <Text fontSize="sm">(สำหรับ {data.post.portion} คน)</Text>
              )}

              {!data.post.ingredients ? null : (
                <IngredientList
                  ingredients={data.post.ingredients as Ingredient[]}
                />
              )}

              {!data.post.instruction ? null : (
                <Box>
                  {" "}
                  <Heading fontSize="large" fontWeight="semibold" mt={5}>
                    {/* ขั้นตอน */}
                    Instruction
                  </Heading>
                  {data.post.instruction.map((instruction, index) => (
                    <Box key={index}>
                      <Flex justifyContent="flex-start">
                        <Text>{index + 1}. </Text>{" "}
                        <Text ml={2}>{instruction}</Text>
                      </Flex>
                      <Divider variant="dashed" />
                    </Box>
                  ))}
                </Box>
              )}

              {!data.post.advice ? null : (
                <Box>
                  {" "}
                  <Heading fontSize="large" fontWeight="semibold" mt={5}>
                    {/* ข้อแนะนำ */}
                    Tips
                  </Heading>
                  {data.post.advice.map((advice, index) => (
                    <Box key={index}>
                      <Flex justifyContent="flex-start">
                        <Text>{index + 1}. </Text> <Text ml={2}>{advice}</Text>
                      </Flex>
                      <Divider variant="dashed" />
                    </Box>
                  ))}
                </Box>
              )}
            </ContentWrapper>
          </Box>

          {/* </Box> */}
          <MealkitInfo postId={data.post.id} />
        </Wrapper>
      </HeadingLayout>
    </>
  );
};

export default withApollo({ ssr: true })(Post); //want good SEO
