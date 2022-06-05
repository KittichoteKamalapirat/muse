import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../components/atoms/Button";
import { CreateRecipe } from "../../../components/CreateRecipe";
import DropzoneField, {
  UploadedFile,
} from "../../../components/form/DropzoneField";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Error } from "../../../components/skeletons/Error";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { CooktimeUnitEnum } from "../../../types/utils/CooktimeUnitEnum";
import { ResourceType } from "../../../types/utils/ResourceType";
import { SelectOption } from "../../../types/utils/SelectOption";
import getSelectOption from "../../../util/getSelectOption";
import { useGetPostId } from "../../../util/useGetPostId";
import { withApollo } from "../../../util/withApollo";
import { PostDetailsFormNames, PostDetailsFormValues } from "../../create-post";

export interface IngredientFieldInput {
  ingredient: string;
  amount: string;
  unit: SelectOption | null;
}

const EditPost = ({}) => {
  const router = useRouter();
  const postId = useGetPostId();
  const { data, loading } = usePostQuery({
    skip: postId === -1, //-1 won't by an id of any posts, just indication that we got bad url parameter
    variables: {
      id: postId,
    },
  });

  const initialValues: PostDetailsFormValues & { instruction: string[] } = {
    title: data?.post?.title as string,
    text: data?.post?.text as string,
    instruction: data?.post?.instruction as string[],
    advice: data?.post?.advice![0] as string, // TODO
    cooktimeLength: data?.post?.cooktime?.length as number,
    cooktimeUnit: data?.post?.cooktime?.unit as string,
    portion: data?.post?.portion as number,
  };

  const [updatePost] = useUpdatePostMutation();
  const toast = useToast();

  // recipe zone
  const [ingredientsField, setIngredientsField] = useState<
    IngredientFieldInput[]
  >([
    {
      ingredient: "",
      amount: "",
      unit: getSelectOption("g", "gram"),
    },
  ]);
  const [instructionField, setInstructionField] = useState([""]);
  const [imageUploads, setImageUploads] = useState<UploadedFile[]>([]);

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
      unit: getSelectOption("g", "gram"),
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

  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values: any = [...ingredientsField];

    values[index][event.target.name] = event.target.value;
    setIngredientsField(values);
  };
  // recipe zone ends

  useEffect(() => {
    console.log({ data });
    if (data?.post) {
      const ingredients = data.post.ingredients?.map((ingredient) => ({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
        unit: getSelectOption(ingredient.unit, ingredient.unit),
      }));
      const { instruction, image } = data.post;

      const images = [
        { name: image.name, url: image.url, id: image.id, type: "image" },
      ];

      setIngredientsField(ingredients as IngredientFieldInput[]);
      setInstructionField(instruction as string[]);
      setImageUploads(images);
    }
  }, [data?.post]);

  if (loading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (!data?.post) {
    //finish downloading, cannot finda post( like wrong id)
    return (
      <Layout heading="error">
        <Error text="could not find a post" />
      </Layout>
    );
  }

  return (
    <HeadingLayout heading="Edit post">
      <XWrapper>
        <Box mt={4} mb={10}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={6}>
              {/* <Image
              src={data.post.image.url}
              alt="image"
              fallbackSrc="oops.png"
              flex={1}
            /> */}

              <DropzoneField
                displayOptionalLabel
                labelClass="mt-4.5 mb-2"
                acceptedFileTypes="image/*"
                maxFiles={1}
                fileUploads={imageUploads}
                setFileUploads={setImageUploads}
                resourceType={ResourceType.POST}
                inputClass="w-1/2"
              >
                Update a thumbnail
              </DropzoneField>
            </GridItem>

            <GridItem colSpan={6}>
              <video controls playsInline>
                <source src={`${data.post.video.url}#t=0.1`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Center color="red.500">
                <Text>*Video cannot be updated</Text>
              </Center>
            </GridItem>
          </Grid>

          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const input = {
                title: values.title,
                text: values.text,
                instruction: instructionField,
                cooktime: {
                  length: values.cooktimeLength,
                  unit: values.cooktimeUnit,
                },

                portion: values.portion,
                advice: [values.advice],
                ingredients: ingredientsField,
              };
              const post = await updatePost({
                variables: {
                  input,
                  id: postId,
                  newImageUrl: imageUploads[0].url, // update url of existing image id
                },
              });

              if (post) {
                toast({
                  title: "Post successfully updated",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                router.push(`/post/${post.data?.updatePost?.id}`);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* post */}
                <Box mt={4}>
                  <InputField
                    name={PostDetailsFormNames.TITLE}
                    placeholder="title"
                    label="title"
                  />
                </Box>

                <Box mt={4}>
                  {" "}
                  <InputField
                    textarea={true}
                    name={PostDetailsFormNames.TEXT}
                    placeholder="text..."
                    label="Body"
                  />
                </Box>

                <Flex justifyContent="left" mt={4} gap={2}>
                  <InputField
                    name={PostDetailsFormNames.COOKTIME_LENGTH}
                    placeholder="30"
                    label="cooktime"
                  />

                  <Field
                    as="select"
                    name={PostDetailsFormNames.COOKTIME_UNIT}
                    component={Select}
                    // placeholder={CooktimeUnitEnum.MINUTES}
                    width="6rem"
                    variant="outline"
                  >
                    <option value={CooktimeUnitEnum.MINUTES}>mins</option>
                    <option value={CooktimeUnitEnum.HOURS}>hrs</option>
                  </Field>
                </Flex>

                <Box mt={4}>
                  {" "}
                  <InputField
                    name={PostDetailsFormNames.PORTION}
                    placeholder="3"
                    label="portion"
                  />
                </Box>

                <Box mt={4}>
                  <Heading fontSize="md">Tips</Heading>
                  <InputField
                    textarea={true}
                    name={PostDetailsFormNames.ADVICE}
                    placeholder="any advice?"
                    label=""
                  />
                </Box>

                <Box mt={2}>
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
                </Box>
                <Button type="submit" isLoading={isSubmitting} mt={8}>
                  Update Post
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(EditPost);
