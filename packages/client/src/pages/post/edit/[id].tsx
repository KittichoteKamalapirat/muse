import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout/Layout";
import { Wrapper } from "../../../components/Wrapper";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetPostId } from "../../../util/useGetPostId";
import { withApollo } from "../../../util/withApollo";
import { Loading } from "../../../components/skeletons/Loading";

const EditPost = ({}) => {
  const router = useRouter(); //for pushing after we finished updating
  const postId = useGetPostId();
  const { data, loading } = usePostQuery({
    skip: postId === -1, //-1 won't by an id of any posts, just indication that we got bad url parameter
    variables: {
      id: postId,
    },
  });
  const [updatePost] = useUpdatePostMutation();
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
    <HeadingLayout heading="Edit post">
      <Wrapper variant="small">
        <Formik
          initialValues={{
            title: data.post.title,
            text: data.post.text,
            videoUrl: data.post.video.url,
          }}
          onSubmit={async (values) => {
            // console.log(values);
            // const { error } = await createPost({ input: values });
            // console.log("error", error);
            // // if there is error, the global error in craeteUrqlclient will handle it, so no need to handle here
            // if (!error) {
            //   router.push("/");
            // }
            // await updatePost({ variables: { id: postId, ...values } });
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="title" />
              <Box mt={4}>
                {" "}
                <InputField
                  textarea={true}
                  name="text"
                  placeholder="text..."
                  label="Body"
                />
              </Box>

              <Button mt={4} type="submit" isLoading={isSubmitting}>
                {" "}
                Update Post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(EditPost);
