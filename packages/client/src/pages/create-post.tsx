import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { CreateMealkit } from "../components/CreateMealkit";
import { CreatePostForm } from "../components/CreatePostForm";
import { CreateRecipe } from "../components/CreateRecipe";
import { CreateThumbnail } from "../components/CreateThumbnail";
import { CreateVideo } from "../components/CreateVideo";
import { HeadingLayout } from "../components/Layout/HeadingLayout";
import {
  SignS3Params,
  useCreateMealkitMutation,
  useCreatePostMutation,
  useCreateVideoMutation,
  useSignMealkitS3Mutation,
  useSignS3Mutation,
  VideoInput,
} from "../generated/graphql";
import { uploadToS3 } from "../util/createPost/uploadToS3";
import { dataURItoBlob } from "../util/dataURItoBlob";
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

const CreatePost: React.FC<{}> = ({ children }) => {
  useIsAuth();
  const router = useRouter();

  //useState Hooks
  const [step, setStep] = useState(1);

  const [submittable, setSubmittable] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  //custom hooks
  const [signS3] = useSignS3Mutation();
  const [createPost] = useCreatePostMutation();

  // Mealkit Handler and variables
  // need signedrequest and video/image file
  // 1) method = signMealkitS3, input = name and type, return = signedRequest and Url where = (in onSubmit)
  // 2) upload to S3 with (axios) using signedRequest and file

  const [createMealkit] = useCreateMealkitMutation();

  const [mealkitInput, setMealkitInput] = useState({
    name: "",
    price: "",
    portion: "",
    items: [],
    images: [""],
  });

  const [signMealkitS3] = useSignMealkitS3Mutation();

  // section1 starts: for uploading a video
  const [videoFile, setVideoFile] = useState({ file: null } as any);
  const [autoThumbnailUrl, setAutoThumbnailUrl] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState("" as any);
  const [autoThumbnailBlob, setAutoThumbnailBlob] = useState<any>(null);

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    console.log("handleOnDropVideo!");
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setVideoFile({ file: acceptedFiles[0] });

    setTimeout(() => {
      setStep(2);
    }, 1000);

    //  redirect to the next page after metadata is load (is set to 500 ms)
  };

  const videoPreviewHandler = (e: React.FormEvent<HTMLDivElement>) => {
    console.log("videoPreviewHandler!");
    const reader = new FileReader();

    if (reader.error) {
      console.log(reader.error.message);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setVideoPreview(reader.result);
      }
    };
    reader.readAsDataURL((e.target as HTMLInputElement).files![0]);
  };

  // automatically create image from video upload
  const handleMetadata = () => {
    const canvas = document.createElement("canvas");
    const video = document.getElementById("preview") as HTMLVideoElement;
    canvas.width = video!.videoWidth;
    canvas.height = video!.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL();
    setAutoThumbnailUrl(dataUrl);

    const blobData = dataURItoBlob(dataUrl);
    setAutoThumbnailBlob(blobData);
    // const params = {Key: "file_name", ContentType: "image/jpeg", Body: blobData};
    // bucket.upload(params, function (err, data) {});

    // setStep(2); //redirect if there is data
  };

  // section1 ends: for uploading a video

  // section2 starts: for uploading thumbnail

  // section2 ends: for uploading thumbnail

  // section3 starts: for post details (which includes recipe)
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

  const [mealkitFiles, setMealkitFiles] = useState<any>([]);

  const handleOnDropMealkitFiles = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }
    let files: any = [];

    setMealkitFiles(acceptedFiles);
  };

  // I need an array of files and and signedRequest
  const uploadMealkitToS3 = async (
    inputObjectsArray: {
      file: any;
      signedRequest: string;
    }[]
  ) => {
    inputObjectsArray.forEach(async (input, index) => {
      const options = {
        headers: {
          "Content-Type": input.file.type,
        },
      };

      await axios.put(input.signedRequest, input.file, options);
    });
  };

  const [mealkitFilesPreview, setMealkitFilesPreview] = useState([] as any[]);

  const mealkitFilesPreviewHandler = (e: React.FormEvent<HTMLDivElement>) => {
    const files: any[] = (e.target as HTMLInputElement).files as any;
    let counter = 0;
    let previews: any[] = [];

    Object.keys(files).forEach((_, index) => {
      const file: any = files[index];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (reader.readyState === 2) {
          previews.push(reader.result);

          counter = counter + 1;

          if (counter === files.length) {
            setMealkitFilesPreview(previews);
          }
        }
      };

      reader.readAsDataURL(file); //get a file object

      if (reader.error) {
        console.log(reader.error.message);
      }
    });
  };

  // section4 ends: mealkit zone

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // S3 mealkit starts
      let input: SignS3Params[] = [];

      mealkitFiles.forEach((file: any) =>
        input.push({ name: file.name, type: file.type })
      );
      const results = await signMealkitS3({ variables: { input } });

      const resultsArray = results.data?.signMealkitS3;

      let urlArray: string[] = [];
      if (resultsArray) {
        for (let i = 0; i < resultsArray?.length; i++) {
          urlArray.push(resultsArray[i].url);
        }
      }

      let fileAndSignedRequestObjectArray: {
        file: any;
        signedRequest: string;
      }[] = [];
      resultsArray?.forEach((urlAndSignedRequestObject, index) => {
        const file = mealkitFiles[index];
        const signedRequest = urlAndSignedRequestObject.signedRequest;
        const object = { file, signedRequest };

        fileAndSignedRequestObjectArray.push(object);
      });
      await uploadMealkitToS3(fileAndSignedRequestObjectArray);

      const cooktime = values.cooktime;
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
        },

        update: (cache) => {
          cache.evict({ fieldName: "posts:{}" });
        },
      });

      const postId = data?.createPost.id;
      if (postId && urlArray.length > 0) {
        const price = parseInt(mealkitInput.price);
        const portion = parseInt(mealkitInput.portion);
        const { data: mealkitResult, errors: mealkitErrors } =
          await createMealkit({
            variables: {
              input: {
                name: mealkitInput.name,
                price: price,
                portion: portion,
                items: mealkitInput.items,
                images: urlArray,
              },
              postId: postId, //not this one
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
      mealkitInput.portion != "" &&
      mealkitInput.price != "" &&
      mealkitInput.images.length > 0
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

    if (mealkitSubmittable && postSubmittable) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [mealkitInput]);
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
                      <CreateVideo
                        // videoFile={videoFile} no need videofile for SAVING TO S3 HERE, be in child component
                        videoPreviewHandler={videoPreviewHandler}
                        videoPreview={videoPreview}
                        nextStep={nextStep}
                        handleMetadata={handleMetadata}
                        autoThumbnailUrl={autoThumbnailUrl}
                      />
                    </HeadingLayout>
                  </Box>
                }
                {
                  <Box display={step === 2 ? "block" : "none"}>
                    <HeadingLayout back={false} heading="Cover Photo">
                      <CreateThumbnail
                        videoPreview={videoPreview}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        autoThumbnailUrl={autoThumbnailUrl}
                      ></CreateThumbnail>
                    </HeadingLayout>
                  </Box>
                }
                {
                  <Box display={step === 3 ? "block" : "none"}>
                    <HeadingLayout back={false} heading="Add Post Detail">
                      <Box>
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
                            variant="transparent"
                            color="brand"
                            onClick={() => nextStep()}
                          >
                            Next
                          </Button>
                        </Flex>
                      </Box>
                    </HeadingLayout>
                  </Box>
                }
                {
                  <Box display={step === 4 ? "block" : "none"}>
                    <HeadingLayout heading="Add a mealkit">
                      <CreateMealkit
                        ingredientsField={ingredientsField}
                        input={mealkitInput}
                        setInput={setMealkitInput}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        mealkitFilesPreview={mealkitFilesPreview}
                        mealkitFilesPreviewHandler={mealkitFilesPreviewHandler}
                        handleOnDropMealkitFiles={(
                          acceptedFiles: any,
                          rejectedFiles: any
                        ) => {
                          handleOnDropMealkitFiles(
                            acceptedFiles,
                            rejectedFiles
                          );
                        }}
                      />
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
