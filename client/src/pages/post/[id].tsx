import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../util/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withApollo } from "../../util/withApollo";

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
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      <Box mb={4}> {data?.post?.text}</Box>
      <Box boxSize="sm">
        <Image src={data?.post?.thumbnailUrl} alt="image" />
      </Box>
      <video width="320" height="240" controls>
        <source src={data?.post?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {meData?.me?.id !== data.post.creator.id ? null : (
        <Box>
          <EditDeletePostButtons id={data.post.id} />
        </Box>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post); //want good SEO
