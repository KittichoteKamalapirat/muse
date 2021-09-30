import { Box, Flex, Text } from "@chakra-ui/layout";

import { Button, Image, AspectRatio } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation, useSignS3Mutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../util/useIsAuth";
import Dropzone from "react-dropzone";
import axios from "axios";
import moment from "moment";
import { withApollo } from "../util/withApollo";
import { ArrowUpIcon, EditIcon, TriangleUpIcon } from "@chakra-ui/icons";

const CreatePost: React.FC<{}> = ({}) => {
  //router import for below, not for useIsAuth
  useIsAuth();
  const [signS3] = useSignS3Mutation();
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  const [videoPreview, setVideoPreview] = useState("" as any);
  const [thumbnailPreview, setThumbnailPreview] = useState("" as any);

  const [videoFile, setVideoFile] = useState({ file: null } as any);
  const [thumbnailFile, setThumbnailFile] = useState({ file: null } as any);

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setVideoFile({ file: acceptedFiles[0] });
  };

  const handleOnDropThumbnail = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
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

  const videoPreviewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("video hi");
    const reader = new FileReader();
    console.log("hi");
    if (reader.error) {
      console.log(reader.error.message);
    }
    reader.onload = () => {
      console.log("before videopreview");
      if (reader.readyState === 2) {
        setVideoPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const thumbnailPreviewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("thumbnailPreviewHandler");
    const reader = new FileReader();
    if (reader.error) {
      console.log(reader.error.message);
    }
    reader.onload = () => {
      if (reader.readyState === 2) {
        setThumbnailPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  return (
    <Layout variant="small">
      <Box m="1rem">
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
                variables: {
                  videoname: videoFile.file.name,
                  thumbnailname: thumbnailFile.file.name,
                  videoFiletype: videoFile.file.type,
                  thumbnailFiletype: thumbnailFile.file.type,
                },
                // filename: formatFilename(file.name),
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
              const { errors } = await createPost({
                variables: {
                  input: {
                    title: values.title,
                    text: values.text,
                    videoUrl: videoUrl,
                    thumbnailUrl: thumbnailUrl,
                  },
                },
                update: (cache) => {
                  cache.evict({ fieldName: "posts:{}" });
                },
              });
              if (!errors) {
                router.push("/");
              }
            } catch (error) {
              console.log(error);
            }

            // if there is error, the global error in craeteUrqlclient will handle it, so no need to handle here
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Dropzone
                onDrop={handleOnDropVideo}
                // maxSize={1000 * 1}
                multiple={false}
                // accept="video/mp4"
              >
                {({ getRootProps, getInputProps }) => (
                  <Box mt={2}>
                    {/* <Box mb={2}>Video</Box> */}
                    <Box cursor="pointer" padding={4}>
                      <div {...getRootProps()}>
                        <input
                          // onChange={(e) => console.log("onchange")}

                          {...getInputProps()}
                          onChange={(e) => {
                            console.log("onchange");
                            videoPreviewHandler(e);
                          }}
                        />
                        {!videoPreview ? (
                          <Flex
                            direction="column"
                            alignItems="center"
                            border="1px"
                            borderColor="gray.200"
                            bgColor="gray.50"
                          >
                            <ArrowUpIcon mt="3rem" />
                            <Text textAlign="center" mb="2rem">
                              Drag and drop a video here, or click to select the
                              file
                            </Text>
                          </Flex>
                        ) : (
                          <Flex justifyContent="center" alignItems="end">
                            <video controls width="50%">
                              <source src={videoPreview} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <EditIcon m={2} />
                          </Flex>
                        )}
                      </div>
                    </Box>
                  </Box>
                )}
              </Dropzone>

              <InputField name="title" placeholder="title" label="title" />
              <Box mt={4}>
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
                      {/* <Box mb={2}>Thumbnail Image</Box> */}
                      <Box
                        cursor="pointer"
                        // border="1px"
                        // borderColor="gray.200"
                        padding={4}
                      >
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps()}
                            onChange={(e) => thumbnailPreviewHandler(e)}
                          />

                          {!videoPreview ? null : !thumbnailPreview ? (
                            <Flex
                              direction="column"
                              alignItems="center"
                              border="1px"
                              borderColor="gray.200"
                              bgColor="gray.50"
                            >
                              <ArrowUpIcon mt="3rem" />
                              <Text textAlign="center" mb="2rem">
                                Drag and drop a video here, or click to select
                                the file
                              </Text>
                            </Flex>
                          ) : (
                            <Flex justifyContent="center">
                              {/* <AspectRatio ratio={1}> */}
                              <Image
                                src={thumbnailPreview}
                                alt="image"
                                boxSize="50%"
                                fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                              />
                              {/* </AspectRatio> */}
                            </Flex>
                          )}
                        </div>
                      </Box>
                    </Box>
                  )}
                </Dropzone>
              </Box>
              <Flex justifyContent="center">
                {" "}
                <Button
                  mb="4rem"
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  {" "}
                  Create Post
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
