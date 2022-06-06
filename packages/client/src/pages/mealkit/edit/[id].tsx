import {
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  InputGroup,
  InputRightAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../components/atoms/Button";
import { MealkitFormNames } from "../../../components/CreateMealkit";
import DropzoneField, {
  UploadedFile,
} from "../../../components/form/DropzoneField";
import FormFieldLabel from "../../../components/form/FormFieldLabel";
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
import { Ingredient } from "../../../types/utils/Ingredient";
import { ResourceType } from "../../../types/utils/ResourceType";
import { withApollo } from "../../../util/withApollo";

const Mealkit = () => {
  const router = useRouter();
  const toast = useToast();
  const { postId, id } = router.query;

  const { data, loading, error } = useMealkitQuery({
    variables: { id: parseInt(id as string) },
  });

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = usePostQuery({
    variables: { id: parseInt(postId as string) },
  });

  const [updateMealkit] = useUpdateMealkitMutation();
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const [items, setItems] = useState<string[]>([]);

  const [ingredientsField, setIngredientsField] = useState<Ingredient[]>([
    {
      ingredient: "",
      amount: "",
      unit: "",
    },
  ]);

  useEffect(() => {
    if (postData?.post) {
      setIngredientsField(
        postData.post?.ingredients.map((ingredient) => ({
          ingredient: ingredient.ingredient,
          amount: String(ingredient.amount),
          unit: ingredient.unit,
        }))
      );
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
  }, [data, postData]);

  if (loading) {
    return (
      <Layout heading="loading">
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
              mealkitName: data?.mealkit?.name,
              price: data?.mealkit?.price,
              mealkitPortion: data?.mealkit?.portion,
              items: data?.mealkit?.items,
              deliveryFee: data?.mealkit?.deliveryFee,
            }}
            onSubmit={async (values) => {
              const input = {
                items,
                name: values.mealkitName as string,
                price: values.price as number,
                portion: values.mealkitPortion as number,
                deliveryFee: values.deliveryFee as number,
              };
              const mealkit = await updateMealkit({
                variables: {
                  input,
                  id: parseInt(id as string),
                  fileIds: fileUploads.map((file) => file.id),
                },
              });

              if (mealkit) {
                toast({
                  title: "Meal kit successfully updated",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                // router.push(`/mealkit/${mealkit.data?.updateMealkit?.id}`);
                router.push(`/post/${postId}`);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mt={4}>
                  <FormFieldLabel label="Meal Kit Name" required />
                  <InputField
                    name={MealkitFormNames.MEALKIT_NAME}
                    placeholder="name of the mealkit"
                  />
                </Box>

                <Box mt={4}>
                  <FormFieldLabel label="Price" required />
                  <InputGroup>
                    <InputField
                      name={MealkitFormNames.PRICE}
                      type="number"
                      placeholder="price"
                    />
                    <InputRightAddon mt={2}>THB</InputRightAddon>
                  </InputGroup>{" "}
                </Box>

                <Box mt={4}>
                  <FormFieldLabel label="Portion For" required />
                  {/* <InputLeftAddon children="ปริมาณสำหรับ" mt={2} /> */}
                  <InputGroup>
                    <InputField
                      name={MealkitFormNames.MEALKIT_PORTION}
                      type="number"
                      placeholder="portion"
                    />
                    <InputRightAddon mt={2}>people</InputRightAddon>
                  </InputGroup>
                </Box>

                <Box mt={4}>
                  <FormFieldLabel label="Delivery Fee" required />

                  <InputGroup>
                    <InputField
                      name={MealkitFormNames.DELIVERY_FEE}
                      type="number"
                      placeholder="delivery fee"
                    />
                    <InputRightAddon>THB</InputRightAddon>
                  </InputGroup>
                </Box>

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
