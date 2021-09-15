import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation, useSignS3Mutation } from "../generated/graphql";
import { createUrqlClient } from "../util/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../util/useIsAuth";
import Dropzone from "react-dropzone";
import axios from "axios";
import moment from "moment";

const CreatePost: React.FC<{}> = ({}) => {
  //router import for below, not for useIsAuth
  const [, signS3] = useSignS3Mutation();
  const router = useRouter();

  const [videoFile, setVideoFile] = useState({ file: null } as any);
  const [thumbnailFile, setThumbnailFile] = useState({ file: null } as any);

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
    console.log("handleDrop");
    console.log(acceptedFiles[0]);
    setVideoFile({ file: acceptedFiles[0] });
  };

  const handleOnDropThumbnail = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
    console.log("handleDrop");
    console.log(acceptedFiles[0]);
    setThumbnailFile({ file: acceptedFiles[0] });
  };

  const uploadToS3 = async (
    videoFile: any,
    thumbnailFile: any,
    videoSignedRequest: string,
    thumbnailSignedRequest: string
  ) => {
    const videoOptions = {
      headers: {
        "Content-Type": videoFile.type,
      },
    };

    const thumbnailOptions = {
      headers: {
        "Content-Type": thumbnailFile.type,
      },
    };

    await axios.put(videoSignedRequest, videoFile, videoOptions);
    await axios.put(thumbnailSignedRequest, thumbnailFile, thumbnailOptions);
  };

  const formatFilename = (filename: string) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Wrapper variant="small">
        <Formik
          initialValues={{
            title: "",
            text: "",
            videoUrl: "change this later",
          }}
          onSubmit={async (values) => {
            try {
              // S3
              const response = await signS3({
                // filename: formatFilename(file.name),
                videoname: videoFile.file.name,
                thumbnailname: thumbnailFile.file.name,
                videoFiletype: videoFile.file.type,
                thumbnailFiletype: thumbnailFile.file.type,
              });
              let videoUrl = "";
              let videoSignedRequest = "";
              let thumbnailUrl = "";
              let thumbnailSignedRequest = "";

              if (response.data) {
                // const { signedRequest, url } = response.data.signS3;
                videoUrl = response.data.signS3!.videoUrl;
                thumbnailUrl = response.data.signS3!.thumbnailUrl;
                videoSignedRequest = response.data.signS3!.videoSignedRequest;
                thumbnailSignedRequest =
                  response.data.signS3!.thumbnailSignedRequest;

                await uploadToS3(
                  videoFile.file,
                  thumbnailFile.file,
                  videoSignedRequest,
                  thumbnailSignedRequest
                );
              }
              // S3 end
              const { error } = await createPost({
                input: {
                  title: values.title,
                  text: values.text,
                  videoUrl: videoUrl,
                  thumbnailUrl: thumbnailUrl,
                },
              });
              if (error) {
                console.log("error", error);
                throw new Error();
              } else {
                router.push("/");
              }
            } catch (error) {
              console.log(error.message);
            }

            // if there is error, the global error in craeteUrqlclient will handle it, so no need to handle here
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
                <Dropzone
                  onDrop={handleOnDropThumbnail}
                  // maxSize={1000 * 1}
                  multiple={false}
                  // accept="video/mp4"
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box mt={2}>
                      <Box mb={2}>Video</Box>
                      <Box
                        cursor="pointer"
                        border="1px"
                        borderColor="gray.200"
                        padding={4}
                      >
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            Drag and drop a thumbnail image here, or click to
                            select the file
                          </p>
                        </div>
                      </Box>
                    </Box>
                  )}
                </Dropzone>
                <Dropzone
                  onDrop={handleOnDropVideo}
                  // maxSize={1000 * 1}
                  multiple={false}
                  // accept="video/mp4"
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box mt={2}>
                      <Box mb={2}>Video</Box>
                      <Box
                        cursor="pointer"
                        border="1px"
                        borderColor="gray.200"
                        padding={4}
                      >
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            Drag and drop a video here, or click to select the
                            file
                          </p>
                        </div>
                      </Box>
                    </Box>
                  )}
                </Dropzone>
              </Box>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                {" "}
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
