import { compact } from "@apollo/client/utilities";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Image,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../components/atoms/Button";
import DropzoneField, {
  UploadedFile,
} from "../../../components/form/DropzoneField";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  useMealkitQuery,
  usePostQuery,
  useUpdateMealkitMutation,
} from "../../../generated/graphql";
import { urlResolver } from "../../../lib/UrlResolver";
import { FileInput } from "../../../types/utils/FileInput";
import { FileMetadata } from "../../../types/utils/FileMetadata";
import { Ingredient } from "../../../types/utils/Ingredient";
import { ResourceType } from "../../../types/utils/ResourceType";
import getRESTOptions from "../../../util/getRESTOptions";
import { withApollo } from "../../../util/withApollo";

const Mealkit = () => {
  const router = useRouter();
  const toast = useToast();
  const { postId, id } = router.query;

  console.log(postId);
  console.log(id);

  const { data, loading, error } = useMealkitQuery({
    variables: { id: parseInt(id as string) },
  });

  console.log({ data });
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = usePostQuery({
    variables: { id: parseInt(postId as string) },
  });

  const [updateMealkit] = useUpdateMealkitMutation();
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  console.log({ fileUploads });

  const [items, setItems] = useState<string[]>([]);

  const [ingredientsField, setIngredientsField] = useState<Ingredient[]>([
    {
      ingredient: "",
      amount: "",
      unit: "",
    },
  ]);

  console.log({ items });

  useEffect(() => {
    if (postData?.post) {
      setIngredientsField(postData.post?.ingredients);
    }
  }, [postData]);

  useEffect(() => {
    if (data?.mealkit) {
      const files = data.mealkit.mealkitFiles.map((file) => ({
        id: file.id,
        name: file.name,
        url: file.url,
        type: file.fileType,
      }));

      setItems(data.mealkit.items as string[]);
      setFileUploads(files);
    }
  }, [postData]);

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <HeadingLayout heading="Edit Meal Kit">
      <XWrapper>
        <Box mt={4} mb={10}>
          <DropzoneField
            displayOptionalLabel
            labelClass="mt-4.5 mb-2"
            acceptedFileTypes={["image/*", "video/*"]}
            maxFiles={3}
            fileUploads={fileUploads}
            setFileUploads={setFileUploads}
            resourceType={ResourceType.MEALKIT}
            inputClass="w-1/2"
          >
            Update a thumbnail
          </DropzoneField>

          <Formik
            initialValues={{
              name: data?.mealkit?.name,
              price: data?.mealkit?.price,
              portion: data?.mealkit?.portion,
              items: data?.mealkit?.items,
            }}
            onSubmit={async (values) => {
              const input = {
                items,
                name: values.name as string,
                price: values.price as number,
                portion: values.portion as number,
              };
              const mealkit = await updateMealkit({
                variables: {
                  input,
                  id: parseInt(id as string),
                  fileIds: fileUploads.map((file) =>
                    parseInt(file.id as string)
                  ),
                },
              });

              if (mealkit) {
                toast({
                  title: "Meal kit successfully updated",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                router.push(`/mealkit/${mealkit.data?.updateMealkit?.id}`);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* <Heading>Create a mealkit</Heading> */}

                <InputField name="name" placeholder="name of the mealkit" />
                <InputGroup>
                  <InputLeftAddon mt={2}>Price</InputLeftAddon>
                  <InputField
                    name="price"
                    type="number"
                    placeholder="price"
                    variant="flushed"
                  />
                  <InputRightAddon mt={2}>THB</InputRightAddon>
                </InputGroup>

                {/* <Heading fontSize="md" whiteSpace="nowrap">
          Portion for
        </Heading> */}
                <Flex alignItems="center">
                  <InputGroup>
                    <InputLeftAddon mt={2}>Portion for</InputLeftAddon>
                    {/* <InputLeftAddon children="ปริมาณสำหรับ" mt={2} /> */}
                    <InputField
                      name="portion"
                      type="number"
                      placeholder="portion"
                      variant="flushed"
                    ></InputField>

                    <InputRightAddon mt={2}>people</InputRightAddon>
                  </InputGroup>
                </Flex>

                <Text>items included</Text>

                {/* checkbox */}
                <Box my={4}>
                  {" "}
                  <Heading fontSize="lg">Items include</Heading>
                  {ingredientsField.length === 0 ||
                    (ingredientsField.length === 1 &&
                    ingredientsField[0].ingredient === "" ? (
                      <div>You have not added any ingredients</div>
                    ) : (
                      <CheckboxGroup colorScheme="green" defaultValue={items}>
                        {ingredientsField &&
                          ingredientsField.map((ingredientWitUnit, index) => (
                            <Stack key={index}>
                              {" "}
                              <Checkbox
                                colorScheme="green"
                                value={ingredientWitUnit.ingredient}
                                onChange={(e) => {
                                  const index = items.indexOf(e.target.value);

                                  // index===-1 means current value not in "items"
                                  // it is currently unchecked -> so check it!
                                  if (index === -1) {
                                    if (items.length === 0) {
                                      //nothing in the array yet
                                      setItems([e.target.value]);
                                    } else {
                                      // add the current item
                                      setItems(items.concat(e.target.value));
                                    }
                                  } else {
                                    // current value already checked -> so uncheck
                                    setItems(
                                      items.filter((_, i) => index !== i)
                                    );
                                  }
                                }}
                              >
                                {ingredientWitUnit.ingredient}
                              </Checkbox>
                            </Stack>
                          ))}
                      </CheckboxGroup>
                    ))}
                </Box>

                <Button type="submit" isLoading={isSubmitting} mt={8}>
                  Update Meal kit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Mealkit);
