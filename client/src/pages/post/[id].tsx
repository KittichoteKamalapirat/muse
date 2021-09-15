import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { createUrqlClient } from "../../util/createUrqlClient";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../util/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();
  const [{ data: meData }] = useMeQuery();

  if (fetching) {
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
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      <Box mb={4}> {data?.post?.text}</Box>
      <Box boxSize="sm">
        <Image src={data?.post?.thumbnailUrl} alt="image" />
      </Box>

      {meData?.me?.id !== data.post.creator.id ? null : (
        <Box>
          <EditDeletePostButtons id={data.post.id} />
        </Box>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post); //want good SEO
