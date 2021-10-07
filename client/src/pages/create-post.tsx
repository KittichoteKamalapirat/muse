import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

import {
  Button,
  Image,
  AspectRatio,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
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
import {
  AddIcon,
  ArrowUpIcon,
  EditIcon,
  MinusIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { CreateIngredient } from "../components/CreateIngredient";
import { CreateMealkit } from "../components/CreateMealkit";
import { CreateRecipe } from "../components/CreateRecipe";
import { CreatePostForm } from "../components/CreatePostForm";
import { CreateVideo } from "../components/CreateVideo";

const CreatePost: React.FC<{}> = ({ children }) => {
  //router import for below, not for useIsAuth

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useIsAuth();
  const router = useRouter();

  // Variables definitions
  const [signS3] = useSignS3Mutation();
  const [createPost] = useCreatePostMutation();

  const postValues = {
    title: "",
    text: "",
    portion: 0,
    cooktime: "",
    advice: "",
    videoUrl: "change this later",
  };

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

  // ingredient  zone ends

  const [mealkitInput, setMealkitInput] = useState({
    price: 0,
    portion: 0,
    items: [""],
    images: [""],
  });

  const handleSubmit = async (values: any) => {
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
        thumbnailSignedRequest = response.data.signS3!.thumbnailSignedRequest;

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
      if (!errors) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // switch (step) {
  //   case 1:
  //     return <Text>step 1</Text>;
  //   case 2:
  //     return <Text>step 2</Text>;
  //   case 3:
  //     return <Text>step 3</Text>;
  //   case 4:
  //     return <Text>step 4</Text>;
  //   default:
  //     return <Text>step redeault</Text>;
  // }
  return (
    <Layout variant="small">
      {/* <Text>{step}</Text>
        <Button onClick={nextStep}>Next</Button>
        <Button onClick={prevStep}>Back</Button> */}

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
                <CreateVideo
                  handleOnDropVideo={(acceptedFiles: any, rejectedFiles: any) =>
                    handleOnDropVideo(acceptedFiles, rejectedFiles)
                  }
                  videoPreviewHandler={videoPreviewHandler}
                  videoPreview={videoPreview}
                />
                <CreatePostForm
                  videoPreview={videoPreview}
                  thumbnailPreview={thumbnailPreview}
                  thumbnailPreviewHandler={(
                    e: React.FormEvent<HTMLDivElement>
                  ) => thumbnailPreviewHandler(e)}
                  handleOnDropThumbnail={(
                    acceptedFiles: any,
                    rejectedFiles: any
                  ) => handleOnDropThumbnail(acceptedFiles, rejectedFiles)}
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

                <CreateMealkit
                  input={mealkitInput}
                  setInput={setMealkitInput}
                />

                {/* <CreateIngredient /> */}
                <Flex mt={10} justifyContent="center">
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
            </Box>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
