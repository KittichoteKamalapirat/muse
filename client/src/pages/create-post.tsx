import { Box, Flex, Text } from "@chakra-ui/layout";

import { Button, IconButton, Img } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import {
  SignS3Params,
  useCreateMealkitMutation,
  useCreatePostMutation,
  useSignMealkitS3Mutation,
  useSignS3Mutation,
} from "../generated/graphql";
import { useRouter } from "next/router";

import { useIsAuth } from "../util/useIsAuth";
import axios from "axios";
import moment from "moment";
import { withApollo } from "../util/withApollo";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { CreateMealkit } from "../components/CreateMealkit";
import { CreateRecipe } from "../components/CreateRecipe";
import { CreatePostForm } from "../components/CreatePostForm";
import { CreateVideo } from "../components/CreateVideo";
import { HeadingLayout } from "../components/HeadingLayout";
import { CreateThumbnail } from "../components/CreateThumbnail";
import { printSourceLocation } from "graphql";
import { dataURItoBlob } from "../util/dataURItoBlob";

const CreatePost: React.FC<{}> = ({ children }) => {
  //router import for below, not for useIsAuth

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [autoThumbnailUrl, setAutoThumbnailUrl] = useState<string>("");
  const [autoThumbnailBlob, setAutoThumbnailBlob] = useState<any>(null);

  useIsAuth();
  const router = useRouter();

  // Variables definitions
  const [signS3] = useSignS3Mutation();
  const [createPost] = useCreatePostMutation();

  const [videoPreview, setVideoPreview] = useState("" as any);

  const [thumbnailPreview, setThumbnailPreview] = useState("" as any);

  const [videoFile, setVideoFile] = useState({ file: null } as any);
  // const [autoThumbnailUrl, setAutoThumbnailUrl] = useState({
  //   file: null,
  // } as any);

  const [thumbnailFile, setThumbnailFile] = useState({ file: null } as any);

  const handleOnDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setVideoFile({ file: acceptedFiles[0] });
  };

  const handleOnDropThumbnail = (acceptedFiles: any, rejectedFiles: any) => {
    console.log({ acceptedFiles });
    if (rejectedFiles.length > 0) {
      return alert(rejectedFiles[0].errors[0].message);
    }

    setThumbnailFile({ file: acceptedFiles[0] });
    console.log("xx");
    console.log(thumbnailFile.file);
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
        "Content-Type": thumbnailFile ? thumbnailFile.type : "img/png",
      },
    };
    console.log({ thumbnailOptions });

    await axios.put(videoSignedRequest, videoFile, videoOptions);

    await axios.put(
      thumbnailSignedRequest,
      thumbnailFile || autoThumbnailBlob,
      thumbnailOptions
    );
  };

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
  const postValues = {
    title: "",
    text: "",
    portion: "",
    cooktime: "",
    advice: "",
    videoUrl: "change this later",
  };

  const videoPreviewHandler = (e: React.FormEvent<HTMLDivElement>) => {
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

  const thumbnailPreviewHandler = (e: React.FormEvent<HTMLDivElement>) => {
    const reader = new FileReader();
    if (reader.error) {
      console.log(reader.error.message);
    }
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log("result");
        console.log(reader.result);
        setThumbnailPreview(reader.result);
      }
    };

    reader.readAsDataURL((e.target as HTMLInputElement).files![0]);
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

  // mealkit zone

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
      console.log(`axios${index}`);
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
          console.log("ready!");
          previews.push(reader.result);
          console.log(index);
          counter = counter + 1;

          if (counter === files.length) {
            console.log({ counter });
            console.log("length");
            console.log(files.length);
            setMealkitFilesPreview(previews);
            console.log({ previews });
          }
        }
      };

      reader.readAsDataURL(file); //get a file object

      if (reader.error) {
        console.log(reader.error.message);
      }
    });

    // setTimeout(() => {
    //   console.log({ mealkitFiles });
    //   setMealkitFilesPreview(mealkitFiles);
    // }, 5000);
  };

  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values: any = [...ingredientsField];

    values[index][event.target.name] = event.target.value;
    setIngredientsField(values);
  };

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

  // automatically create image from video upload

  console.log(autoThumbnailUrl.length);

  const handleMetadata = () => {
    const canvas = document.createElement("canvas");
    const video = document.getElementById("preview") as HTMLVideoElement;
    canvas.width = video!.videoWidth;
    canvas.height = video!.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log("7");
    const dataUrl = canvas.toDataURL();
    setAutoThumbnailUrl(dataUrl);

    const blobData = dataURItoBlob(dataUrl);
    setAutoThumbnailBlob(blobData);
    // const params = {Key: "file_name", ContentType: "image/jpeg", Body: blobData};
    // bucket.upload(params, function (err, data) {});

    setStep(2);
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // S3 Video and images starts

      console.log("here11");
      console.log({ thumbnailFile });
      console.log({ videoFile });
      if (thumbnailFile.file) {
        console.log("null but true");
      }

      const response = await signS3({
        variables: {
          videoname: videoFile.file.name,
          thumbnailname: !thumbnailFile.file
            ? mealkitInput.name
            : thumbnailFile.file.name,
          videoFiletype: videoFile.file.type,
          thumbnailFiletype: !thumbnailFile.file
            ? "image/png"
            : thumbnailFile.file.type,
        },
        // filename: formatFilename(file.name),
      });
      console.log(response);
      console.log("here22");

      let videoUrl = "";
      let videoSignedRequest = "";
      let thumbnailUrl = "";
      let thumbnailSignedRequest = "";

      if (response.data) {
        // const { signedRequest, url } = response.data.signS3;
        videoUrl = response.data.signS3!.videoUrl;
        thumbnailUrl = response.data.signS3!.thumbnailUrl;
        videoSignedRequest = response.data.signS3!.videoSignedRequest;
        thumbnailSignedRequest = response.data.signS3!.thumbnailSignedRequest;

        await uploadToS3(
          videoFile.file,
          thumbnailFile.file,
          videoSignedRequest,
          thumbnailSignedRequest
        );
      }
      // S3 end

      // S3 mealkit starts
      let input: SignS3Params[] = [];

      console.log("here33");
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
      console.log("urlArray1");
      console.log({ urlArray });

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

      console.log({ input });
      console.log({ results });
      const cooktime = values.cooktime;
      const { data, errors } = await createPost({
        variables: {
          input: {
            title: values.title,
            text: values.text,
            videoUrl: videoUrl,
            instruction: instructionField,
            cooktime: values.cooktime,
            portion: values.portion,
            advice: [values.advice],
            thumbnailUrl: thumbnailUrl,
            ingredients: ingredientsField,
          },
        },

        update: (cache) => {
          cache.evict({ fieldName: "posts:{}" });
        },
      });

      console.log("post created? ");
      console.log(data);

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
        console.log("himealkit");
        console.log({ mealkitErrors });
        console.log({ mealkitResult });
        if (!errors && !mealkitErrors) {
          router.push("/");
        }
      }
    } catch (error) {
      // console.log("errro here 2");
      console.error(error);
      // console.log(error);
    }
    setSubmitting(false);
  };
  console.log("ingredientsField in parents");
  console.log({ ingredientsField });
  let render: any;
  switch (step) {
    case 1:
      render = (
        <HeadingLayout heading="New Video">
          <CreateVideo
            handleOnDropVideo={(acceptedFiles: any, rejectedFiles: any) =>
              handleOnDropVideo(acceptedFiles, rejectedFiles)
            }
            videoPreviewHandler={videoPreviewHandler}
            videoPreview={videoPreview}
            nextStep={nextStep}
            handleMetadata={handleMetadata}
            autoThumbnailUrl={autoThumbnailUrl}
          />
        </HeadingLayout>
      );
      break;

    case 2:
      render = (
        <HeadingLayout back={false} heading="Cover Photo">
          <CreateThumbnail
            videoPreview={videoPreview}
            thumbnailPreview={thumbnailPreview}
            thumbnailPreviewHandler={(e: React.FormEvent<HTMLDivElement>) =>
              thumbnailPreviewHandler(e)
            }
            handleOnDropThumbnail={(acceptedFiles: any, rejectedFiles: any) =>
              handleOnDropThumbnail(acceptedFiles, rejectedFiles)
            }
            prevStep={prevStep}
            nextStep={nextStep}
            autoThumbnailUrl={autoThumbnailUrl}
          ></CreateThumbnail>
        </HeadingLayout>
      );
      break;

    case 3:
      render = (
        <HeadingLayout back={false} heading="Add Post Detail">
          <Box>
            <CreatePostForm
              videoPreview={videoPreview}
              thumbnailPreview={thumbnailPreview}
              nextStep={nextStep}
              prevstep={prevStep}
            />
            <CreateRecipe
              ingredientsField={ingredientsField}
              instructionField={instructionField}
              handleChangeInput={handleChangeInput}
              handleAddField={handleAddField}
              handleRemoveField={handleRemoveField}
              handleInstructionChangeInput={handleInstructionChangeInput}
              handleAddInstructionField={handleAddInstructionField}
              handleRemoveInstructionField={handleRemoveInstructionField}
            />

            <Flex justifyContent="space-between" alignItems="center" mt={5}>
              <IconButton
                aria-label="Search database"
                icon={<ChevronLeftIcon />}
                onClick={() => prevStep()}
                fontSize="x-large"
                color="dark.200"
                variant="none"
              />

              <Button color="green.400" onClick={() => nextStep()}>
                Next
              </Button>

              {/* <IconButton
                aria-label="Search database"
                icon={<ChevronRightIcon />}
                onClick={() => nextStep()}
                fontSize="x-large"
                color="dark.200"
                variant="none"
              /> */}
            </Flex>
          </Box>
        </HeadingLayout>
      );

      break;
    case 4:
      render = (
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
              console.log("handleondropvids");
              console.log({ acceptedFiles });
              handleOnDropMealkitFiles(acceptedFiles, rejectedFiles);
            }}
          />
        </HeadingLayout>
      );
      break;
    default:
      render = <Text>step default {step}</Text>;
  }
  return (
    <Box>
      <Box m="1rem">
        <Formik
          initialValues={postValues}
          onSubmit={async (values) => {
            handleSubmit(values);

            // if there is error, the global error in craeteUrqlclient will handle it, so no need to handle here
          }}
        >
          {({ isSubmitting }) => (
            <Box>
              <Form>
                {render}
                {/* <CreateIngredient /> */}
                {step !== 4 ? null : (
                  <Flex mt={10} justifyContent="center">
                    {" "}
                    <Button mb="4rem" type="submit" isLoading={submitting}>
                      {" "}
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
