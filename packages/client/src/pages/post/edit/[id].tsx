import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
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
import { ResourceType } from "../../../types/utils/ResourceType";
import { useGetPostId } from "../../../util/useGetPostId";
import { withApollo } from "../../../util/withApollo";

interface Ingredient {
  ingredient: string;
  amount: string;
  unit: string;
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
  const [updatePost] = useUpdatePostMutation();
  const toast = useToast();

  // recipe zone
  const [ingredientsField, setIngredientsField] = useState<Ingredient[]>([
    {
      ingredient: "",
      amount: "",
      unit: "",
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
    if (data?.post) {
      const ingredients = data.post.ingredients?.map((ingredient) => ({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }));
      const { instruction, image } = data.post;

      const images = [{ name: image.name, url: image.url }];

      setIngredientsField(ingredients as Ingredient[]);
      setInstructionField(instruction as string[]);
      setImageUploads(images);
    }
  }, [data?.post]);

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
              <video controls>
                <source src={data.post.video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Center color="red.500">
                <Text>*Video cannot be updated</Text>
              </Center>
            </GridItem>
          </Grid>

          <Formik
            initialValues={{
              title: data?.post?.title,
              text: data?.post?.text,
              instruction: data?.post?.instruction,
              advice: data?.post?.advice,
              cooktime: data?.post?.cooktime,
              portion: data?.post?.portion,
            }}
            onSubmit={async (values) => {
              const input = {
                title: values.title,
                text: values.text,
                instruction: instructionField,
                cooktime: values.cooktime,
                portion: values.portion,
                advice: values.advice as string[],
                ingredients: ingredientsField,
              };
              const post = await updatePost({
                variables: {
                  input: input,
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
                <InputField name="title" placeholder="title" label="title" />

                <InputField
                  textarea={true}
                  name="text"
                  placeholder="text..."
                  label="Body"
                />

                <InputField name="cooktime" placeholder="30" label="cooktime" />
                <InputField name="portion" placeholder="3" label="portion" />

                <Box mt={2}>
                  <Heading fontSize="md">Tips</Heading>
                  <InputField
                    textarea={true}
                    name="advice"
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
