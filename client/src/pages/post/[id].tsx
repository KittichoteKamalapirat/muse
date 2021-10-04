import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../util/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withApollo } from "../../util/withApollo";
import IngredientList from "../../components/IngredientList";
import { HeadingLayout } from "../../components/HeadingLayout";
import { Wrapper } from "../../components/Wrapper";

import { ChevronLeftIcon } from "@chakra-ui/icons";

const Post = ({}) => {
  const { data, loading } = useGetPostFromUrl();
  const { data: meData } = useMeQuery();

  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
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
    <Box>
      <HeadingLayout heading={data?.post?.title}></HeadingLayout>

      {/* 
      <Box>
        <Image src={data?.post?.thumbnailUrl} alt="image" />
      </Box> */}

      <video width="100%" controls>
        <source src={data?.post?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Wrapper>
        <Heading fontSize="x-large">เกี่ยวกับเมนูนี้</Heading>
        {!data?.post?.cooktime ? null : (
          <Text mb={4}> เวลาในการทำ: {data.post.cooktime}</Text>
        )}
        <Text mb={4}> {data?.post?.text}</Text>

        <Heading fontSize="large" fontWeight="semibold">
          วัตถุดิบ
        </Heading>
        {!data.post.portion ? null : (
          <Text fontSize="sm">(สำหรับ {data.post.portion} คน)</Text>
        )}

        {!data.post.ingredients ? null : (
          <IngredientList ingredients={data.post.ingredients} />
        )}

        {!data.post.instruction ? null : (
          <Box>
            {" "}
            <Heading fontSize="large" fontWeight="semibold" mt={5}>
              ขั้นตอน
            </Heading>
            {data.post.instruction.map((instruction, index) => (
              <Box key={index}>
                <Flex justifyContent="flex-start">
                  <Text>{index + 1}. </Text> <Text ml={2}>{instruction}</Text>
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
              ข้อแนะนำ
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

        {meData?.me?.id !== data.post.creator.id ? null : (
          <EditDeletePostButtons id={data.post.id} />
        )}
      </Wrapper>
    </Box>
  );
};

export default withApollo({ ssr: true })(Post); //want good SEO
