import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/layout";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { CreateMealkit, MealkitFormValues } from "../components/CreateMealkit";
import {
  CreatePostForm,
  PostDetailsFormValues,
} from "../components/CreatePostForm";
import { CreateRecipe } from "../components/CreateRecipe";
import { CreateThumbnail } from "../components/CreateThumbnail";
import { CreateVideo } from "../components/CreateVideo";
import FormActionButtons from "../components/form/FormActionButtons/FormActionButtons";
import { HeadingLayout } from "../components/Layout/HeadingLayout";
import PostBreadcrumb from "../components/post/PostBreadcrumb";
import { XWrapper } from "../components/Wrapper/XWrapper";
import {
  useCreateMealkitMutation,
  useCreatePostMutation,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { CooktimeUnitEnum } from "../types/utils/CooktimeUnitEnum";
import { FileInput } from "../types/utils/FileInput";
import { FileMetadata } from "../types/utils/FileMetadata";
import { ResourceType } from "../types/utils/ResourceType";
import { dataURItoFile } from "../util/dataURItoFile";
import getRESTOptions from "../util/getRESTOptions";
import { useIsAuth } from "../util/useIsAuth";
import { withApollo } from "../util/withApollo";
import { IngredientFieldInput } from "./post/edit/[id]";

const postValues: PostDetailsFormValues = {
  title: "",
  text: "",
  portion: null,
  cooktimeLength: null,
  cooktimeUnit: CooktimeUnitEnum.MINUTES,
  advice: "",
};

const CreatePost = () => {
  useIsAuth();
  const router = useRouter();

  //useState Hooks
  const [step, setStep] = useState<number>(1);

  const [submittable, setSubmittable] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] =
    useState<boolean>(false);

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  //graphql hooks
  const [createPost] = useCreatePostMutation();
  const [createMealkit] = useCreateMealkitMutation();

  // Mealkit Handler and variables
  // need signedrequest and video/image file
  // 1) method = signMealkitS3, input = name and type, return = signedRequest and Url where = (in onSubmit)
  // 2) upload to S3 with (axios) using signedRequest and file

  // local state
  const [mealkitInput, setMealkitInput] = useState<MealkitFormValues>({
    mealkitName: "",
    price: "",
    mealkitPortion: "",
    deliveryFee: "",
    items: [],
  });

  // section1 starts: for uploading a video
  const [autoThumbnailS3UrlAndId, setAutoThumbnailS3UrlAndId] =
    useState<FileMetadata | null>(null);

  const [, setAutoThumbnailFile] = useState<any>(null);

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

    const response = await axios.post(urlResolver.signS3(), input);

    // save the auto thumbnail
    await axios.put(response.data.sign, fileData, options).then(() => {
      // -> this one kinda works!, video loaded first!
      nextStep();
      setAutoThumbnailS3UrlAndId({
        id: response.data.id,
        url: response.data.url,
      });

      setIsGeneratingThumbnail(false);
    });
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
  const [ingredientsField, setIngredientsField] = useState<
    IngredientFieldInput[]
  >([
    {
      ingredient: "",
      amount: "",
      unit: null,
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
      amount: "0",
      unit: null,
    });
    setIngredientsField(values);
  };

  const handleAddInstructionField = (index: number) => {
    const values = [...instructionField];
    values.splice(index + 1, 0, "");
    setInstructionField(values);
  };

  const handleRemoveField = (index: number) => {
    const values = [...ingredientsField];
    if (values.length > 1) {
      values.splice(index, 1);
      setIngredientsField(values);
    }
  };

  const handleRemoveInstructionField = (index: number) => {
    const values = [...instructionField];
    if (values.length > 1) {
      values.splice(index, 1);
      setInstructionField(values);
    }
  };

  // section3 ends: for post details (which includes recipe)

  // section4 starts: mealkit zone

  // section4 ends: mealkit zone

  const handleSubmit = async (values: PostDetailsFormValues) => {
    setSubmitting(true);

    try {
      const postInput = {
        title: values.title,
        text: values.text,
        instruction: instructionField,
        cooktime: {
          length: values.cooktimeLength as number,
          unit: values.cooktimeUnit as CooktimeUnitEnum,
        },
        portion: values.portion as number,
        advice: [values.advice],
        ingredients: ingredientsField.map((ingredient) => ({
          ingredient: ingredient.ingredient,
          amount: parseFloat(ingredient.amount), // make float for backend
          unit: ingredient.unit?.value as string,
        })),
      };

      const { data, errors } = await createPost({
        variables: {
          input: postInput,
          videoId: videoS3UrlAndID?.id as number,
          // TODO -> check this about thumbnail error
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
        const { errors: mealkitErrors } = await createMealkit({
          variables: {
            input: {
              name: mealkitInput.mealkitName,
              price: parseFloat(mealkitInput.price),
              portion: parseFloat(mealkitInput.mealkitPortion),
              items: mealkitInput.items,
              deliveryFee: parseFloat(mealkitInput.deliveryFee),
            },
            postId: postId,
            mealkitFiles: mealkitS3UrlAndIds.map((item) => ({
              postId: item.id,
              fileType: item.fileType as string,
            })),
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

  const formRef = useRef() as RefObject<FormikProps<PostDetailsFormValues>>;

  useEffect(() => {
    let mealkitSubmittable = false;
    let postSubmittable = false;

    if (
      // TODO rethink about what fields are required (also update backend entity)
      mealkitInput.mealkitName != "" &&
      mealkitInput.mealkitPortion != "" &&
      mealkitInput.price != "" &&
      mealkitInput.deliveryFee != "" &&
      // &&    mealkitInput.images.length > 0
      mealkitInput.items.length > 0 // check at least one item
    ) {
      mealkitSubmittable = true;
    }

    if (formRef.current?.values.title != "") {
      postSubmittable = true;
    }

    if (mealkitSubmittable && postSubmittable) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [mealkitInput]);

  return (
    <Box mb="2rem">
      <PostBreadcrumb
        step={step}
        setStep={setStep}
        videoS3UrlAndID={videoS3UrlAndID}
      />

      <Formik
        initialValues={postValues}
        innerRef={formRef}
        onSubmit={async (values) => {
          handleSubmit(values);

          // if there is error, the global error in craeteUrqlclient will handle it, so no need to handle here
        }}
      >
        {() => (
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
                        autoThumbnailS3UrlAndId={autoThumbnailS3UrlAndId}
                        isGeneratingThumbnail={isGeneratingThumbnail}
                      />
                    </XWrapper>
                  </HeadingLayout>
                </Box>
              }
              {
                <Box display={step === 2 ? "block" : "none"}>
                  <HeadingLayout back={false} heading="Cover Photo">
                    <XWrapper>
                      <CreateThumbnail
                        autoThumbnailS3UrlAndId={autoThumbnailS3UrlAndId}
                        thumbnailS3UrlAndID={thumbnailS3UrlAndID}
                        setThumbnailS3UrlAndID={setThumbnailS3UrlAndID}
                      ></CreateThumbnail>
                      <FormActionButtons
                        primaryText="Next"
                        primaryAriaLabel="Go to post detail tab"
                        onPrimaryClick={nextStep}
                        secondaryText="Back"
                        onSecondaryClick={prevStep}
                      />
                    </XWrapper>
                  </HeadingLayout>
                </Box>
              }
              {
                <Box display={step === 3 ? "block" : "none"}>
                  <HeadingLayout back={false} heading="Add Post Detail">
                    <XWrapper>
                      <CreatePostForm />
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

                      <FormActionButtons
                        primaryText="Next"
                        primaryAriaLabel="Go to mealkit details tab"
                        onPrimaryClick={nextStep}
                        secondaryText="Back"
                        onSecondaryClick={prevStep}
                      />
                    </XWrapper>
                  </HeadingLayout>
                </Box>
              }
              {
                <Box display={step === 4 ? "block" : "none"}>
                  <HeadingLayout heading="Add a Meal Kit" back={false}>
                    <XWrapper>
                      <CreateMealkit
                        ingredientsField={ingredientsField}
                        input={mealkitInput}
                        setInput={setMealkitInput}
                        mealkitS3UrlAndIds={mealkitS3UrlAndIds}
                        setMealkitS3UrlAndIds={setMealkitS3UrlAndIds}
                      />

                      {!submittable && (
                        <Box>
                          <Heading fontSize="md" color="alert">
                            * Some required fields are missing
                          </Heading>
                          <UnorderedList fontSize="sm" color="gray.600">
                            {formRef.current?.values.title === "" && (
                              <ListItem>
                                Post&apos;s name cannot be blank
                              </ListItem>
                            )}
                            {mealkitInput.mealkitName === "" && (
                              <ListItem>
                                Meal kit&apos;s name cannot be blank
                              </ListItem>
                            )}
                            {mealkitInput.price === "" && (
                              <ListItem>
                                Meal kit&apos;s price canot be blank
                              </ListItem>
                            )}
                            {mealkitInput.mealkitPortion === "" && (
                              <ListItem>
                                Meal kit&apos;s portion cannot be blank
                              </ListItem>
                            )}
                            {mealkitInput.deliveryFee === "" && (
                              <ListItem>
                                Meal kit&apos;s delivery fee cannot be blank
                              </ListItem>
                            )}

                            {mealkitInput.items.length === 0 && (
                              <ListItem>
                                Meal kit&apos;s items have to be at at least 1
                              </ListItem>
                            )}
                          </UnorderedList>
                        </Box>
                      )}

                      <FormActionButtons
                        primaryText="Create"
                        primaryIsDisabled={!submittable}
                        primaryIsLoading={submitting}
                        primaryButtonType="submit"
                        secondaryText="Back"
                        onSecondaryClick={prevStep}
                      />
                    </XWrapper>
                  </HeadingLayout>
                </Box>
              }
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default withApollo({ ssr: false })(CreatePost);
