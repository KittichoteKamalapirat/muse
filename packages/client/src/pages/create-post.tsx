import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Button from "../components/atoms/Button";
import { CreateMealkit } from "../components/CreateMealkit";
import { CreatePostForm } from "../components/CreatePostForm";
import { CreateRecipe } from "../components/CreateRecipe";
import { CreateThumbnail } from "../components/CreateThumbnail";
import { CreateVideo } from "../components/CreateVideo";
import { HeadingLayout } from "../components/Layout/HeadingLayout";
import { Loading } from "../components/skeletons/Loading";
import { XWrapper } from "../components/Wrapper/XWrapper";
import {
  useCreateMealkitMutation,
  useCreatePostMutation,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";

import { ResourceType } from "../types/utils/ResourceType";
import { dataURItoFile } from "../util/dataURItoFile";
import getRESTOptions from "../util/getRESTOptions";
import { useIsAuth } from "../util/useIsAuth";
import { withApollo } from "../util/withApollo";

const postValues = {
  title: "",
  text: "",
  portion: "",
  cooktime: "",
  advice: "",
  videoUrl: "change this later",
};

3;

const CreatePost: React.FC<{}> = ({ children }) => {
  useIsAuth();
  const router = useRouter();

  //useState Hooks
  const [step, setStep] = useState<number>(3);

  const [submittable, setSubmittable] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] =
    useState<boolean>(false);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  //graphql hooks
  const [createPost] = useCreatePostMutation();
  const [createMealkit] = useCreateMealkitMutation();

  // Mealkit Handler and variables
  // need signedrequest and video/image file
  // 1) method = signMealkitS3, input = name and type, return = signedRequest and Url where = (in onSubmit)
  // 2) upload to S3 with (axios) using signedRequest and file

  // local state
  const [mealkitInput, setMealkitInput] = useState({
    name: "",
    price: "",
    mealkitPortion: "",
    items: [],
    images: [""],
  });

  // section1 starts: for uploading a video
  const [autoThumbnailS3UrlAndId, setAutoThumbnailS3UrlAndId] =
    useState<FileMetadata | null>(null);

  const [autoThumbnailFile, setAutoThumbnailFile] = useState<any>(null);

  // automatically create image from video upload

  // save autoThumbnail to s3
  const handleMetadata = async () => {
    setIsGeneratingThumbnail(true);
    // used in CreateVideo but state to update is here
    const canvas = document.createElement("canvas");
    const video = document.getElementById("preview") as HTMLVideoElement;
    canvas.width = video!.videoWidth;
    canvas.height = video!.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL();

    const fileName = dataUrl
      .substring(dataUrl.lastIndexOf("/") + 1)
      // remove all special characters
      .replace(/[^a-zA-Z ]/g, ""); // = in file name seems to cause error?

    const fileData = dataURItoFile(dataUrl, fileName);

    setAutoThumbnailFile(fileData);

    // sign and save
    const input: FileInput = {
      name: fileData.name,
      fileType: fileData.type,
      resourceType: ResourceType.POST,
    };

    const options = getRESTOptions(fileData.type);
    console.log({ options });
    console.log({ input });
    const response = await axios.post(urlResolver.signS3(), input);

    console.log({ response });
    const response2 = await axios.put(response.data.sign, fileData, options);
    console.log({ response2 });

    // todo add loading indicator
    // wait for file to be uploaded
    if (response2) {
      console.log("got response 2");
      // -> this one kinda works!, video loaded first!
      setAutoThumbnailS3UrlAndId({
        id: response.data.id,
        url: response.data.url,
      });
      setIsGeneratingThumbnail(false);
    }
  };

  // section1 ends: for uploading a video
  const [videoS3UrlAndID, setVideoS3UrlAndID] = useState<FileMetadata | null>(
    null
  ); //is what saved to our db
  // section2 starts: for uploading thumbnail
  const [thumbnailS3UrlAndID, setThumbnailS3UrlAndID] =
    useState<FileMetadata | null>(null);

  // section2 ends: for uploading thumbnail

  // section3 starts: for post details (which includes recipe)
  const [mealkitS3UrlAndIds, setMealkitS3UrlAndIds] = useState<FileMetadata[]>(
    []
  );
  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values: any = [...ingredientsField];

    values[index][event.target.name] = event.target.value;
    setIngredientsField(values);
  };

  // ingredient zone start
  const [ingredientsField, setIngredientsField] = useState([
    {
      ingredient: "",
      amount: "",
      unit: "",
    },
  ]);

  const [instructionField, setInstructionField] = useState([""]);

  const handleInstructionChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values: any = [...instructionField];

    values[index] = event.target.value;
    setInstructionField(values);
  };

  const handleAddField = (index: any) => {
    const values = [...ingredientsField];
    values.splice(index + 1, 0, {
      ingredient: "",
      amount: "",
      unit: "",
    });
    setIngredientsField(values);
  };

  const handleAddInstructionField = (index: any) => {
    const values = [...instructionField];
    values.splice(index + 1, 0, "");
    setInstructionField(values);
  };

  const handleRemoveField = (index: any) => {
    const values = [...ingredientsField];
    if (values.length > 1) {
      values.splice(index, 1);
      setIngredientsField(values);
    }
  };

  const handleRemoveInstructionField = (index: any) => {
    const values = [...instructionField];
    if (values.length > 1) {
      values.splice(index, 1);
      setInstructionField(values);
    }
  };

  // section3 ends: for post details (which includes recipe)

  // section4 starts: mealkit zone

  // section4 ends: mealkit zone

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const { data, errors } = await createPost({
        variables: {
          input: {
            title: values.title,
            text: values.text,
            instruction: instructionField,
            cooktime: values.cooktime,
            portion: values.portion,
            advice: [values.advice],
            ingredients: ingredientsField,
          },
          videoId: videoS3UrlAndID?.id as number,
          // if no thumbnail -> use the auto Thumbnail url instead
          imageId: thumbnailS3UrlAndID
            ? (thumbnailS3UrlAndID?.id as number)
            : (autoThumbnailS3UrlAndId?.id as number),
        },

        update: (cache) => {
          cache.evict({ fieldName: "posts:{}" });
        },
      });

      const postId = data?.createPost.id;

      if (postId) {
        const price = parseInt(mealkitInput.price);
        const mealkitPortion = parseInt(mealkitInput.mealkitPortion);
        const { data: mealkitResult, errors: mealkitErrors } =
          await createMealkit({
            variables: {
              input: {
                name: mealkitInput.name,
                price: price,
                portion: mealkitPortion,
                items: mealkitInput.items,
                images: [],
              },
              postId: postId,
              fileIds: mealkitS3UrlAndIds.map((item) => item.id),
            },
          });
        if (!errors && !mealkitErrors) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  // const formRef = useRef() as MutableRefObject<HTMLInputElement>;
  const formRef = useRef() as RefObject<
    FormikProps<{
      title: string;
      text: string;
      portion: string;
      cooktime: string;
      advice: string;
      videoUrl: string;
    }>
  >;

  useEffect(() => {
    let mealkitSubmittable: boolean = false;
    let postSubmittable: boolean = false;

    if (
      mealkitInput.name != "" &&
      mealkitInput.mealkitPortion != "" &&
      mealkitInput.price != ""
      // &&    mealkitInput.images.length > 0
      // mealkitInput.items.length > 0
    ) {
      mealkitSubmittable = true;
    }

    if (
      formRef.current?.values.title != "" &&
      formRef.current?.values.text != "" &&
      formRef.current?.values.cooktime != "" &&
      formRef.current?.values.portion != ""
    ) {
      postSubmittable = true;
    }

    console.log(mealkitSubmittable);
    console.log(postSubmittable);

    if (mealkitSubmittable && postSubmittable) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [mealkitInput]);

  // handle autothumbnail show, don't go to next step to fast
  useEffect(() => {
    if (autoThumbnailS3UrlAndId) {
      nextStep();
    }
  }, [autoThumbnailS3UrlAndId?.url]);
  return (
    <Box>
      <Box m="1rem">
        <Formik
          initialValues={postValues}
          innerRef={formRef}
          onSubmit={async (values) => {
            handleSubmit(values);

            // if there is error, the global error in craeteUrqlclient will handle it, so no need to handle here
          }}
        >
          {({ isSubmitting }) => (
            <Box>
              <Form>
                {
                  <Box display={step === 1 ? "block" : "none"}>
                    <HeadingLayout heading="New Video">
                      <XWrapper>
                        <CreateVideo
                          nextStep={nextStep}
                          handleMetadata={handleMetadata}
                          videoS3UrlAndID={videoS3UrlAndID}
                          setVideoS3UrlAndID={setVideoS3UrlAndID}
                          isGeneratingThumbnail={isGeneratingThumbnail}
                        />
                      </XWrapper>
                    </HeadingLayout>
                    {isGeneratingThumbnail && (
                      <Loading text="generating thumbnail" overlay={true} />
                    )}
                  </Box>
                }
                {
                  <Box display={step === 2 ? "block" : "none"}>
                    <HeadingLayout back={false} heading="Cover Photo">
                      <XWrapper>
                        <CreateThumbnail
                          prevStep={prevStep}
                          nextStep={nextStep}
                          autoThumbnailS3UrlAndId={autoThumbnailS3UrlAndId}
                          thumbnailS3UrlAndID={thumbnailS3UrlAndID}
                          setThumbnailS3UrlAndID={setThumbnailS3UrlAndID}
                        ></CreateThumbnail>
                      </XWrapper>
                    </HeadingLayout>
                  </Box>
                }
                {
                  <Box display={step === 3 ? "block" : "none"}>
                    <HeadingLayout back={false} heading="Add Post Detail">
                      <XWrapper>
                        <CreatePostForm
                          nextStep={nextStep}
                          prevstep={prevStep}
                        />
                        <CreateRecipe
                          ingredientsField={ingredientsField}
                          instructionField={instructionField}
                          handleChangeInput={handleChangeInput}
                          handleAddField={handleAddField}
                          handleRemoveField={handleRemoveField}
                          handleInstructionChangeInput={
                            handleInstructionChangeInput
                          }
                          handleAddInstructionField={handleAddInstructionField}
                          handleRemoveInstructionField={
                            handleRemoveInstructionField
                          }
                        />

                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          mt={5}
                        >
                          <IconButton
                            aria-label="Search database"
                            icon={<ChevronLeftIcon />}
                            onClick={() => prevStep()}
                            fontSize="x-large"
                            color="dark.200"
                            variant="transparent"
                          />

                          <Button
                            variant="ghost"
                            color="brand"
                            onClick={() => nextStep()}
                            aria-label="Go to mealkit details tab"
                          >
                            Next
                          </Button>
                        </Flex>
                      </XWrapper>
                    </HeadingLayout>
                  </Box>
                }
                {
                  <Box display={step === 4 ? "block" : "none"}>
                    <HeadingLayout heading="Add a mealkit" back={false}>
                      <XWrapper>
                        <CreateMealkit
                          ingredientsField={ingredientsField}
                          input={mealkitInput}
                          setInput={setMealkitInput}
                          nextStep={nextStep}
                          prevStep={prevStep}
                          mealkitS3UrlAndIds={mealkitS3UrlAndIds}
                          setMealkitS3UrlAndIds={setMealkitS3UrlAndIds}
                        />
                      </XWrapper>
                    </HeadingLayout>
                  </Box>
                }

                {step !== 4 ? null : (
                  <Flex
                    flexDirection="column"
                    mt={10}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!submittable && (
                      <Text color="alert">
                        Some required fields are missing
                      </Text>
                    )}
                    <Button
                      type="submit"
                      width="100%"
                      isLoading={submitting}
                      disabled={!submittable} //post page (won't be empty), thumbnail page (empty is ok since there's default one),  post details page (only advice can be empty), mealkit page (can't be empty)
                    >
                      Create Post
                    </Button>
                  </Flex>
                )}
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: false })(CreatePost);
