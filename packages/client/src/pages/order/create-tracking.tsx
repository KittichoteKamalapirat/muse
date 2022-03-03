import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { useRadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { Formik, Form, Field } from "formik";
import { ValuesOfCorrectTypeRule } from "graphql";
import { useRouter } from "next/router";
import React from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useCreateTrackingMutation } from "../../generated/graphql";
import { courierList } from "../../util/constants/courierList";
import { withApollo } from "../../util/withApollo";

interface CreateTrackingProps {}

const CreateTracking: React.FC<CreateTrackingProps> = ({}) => {
  const router = useRouter();
  const { cartItemIds } = router.query;
  console.log({ cartItemIds });

  const [createTracking] = useCreateTrackingMutation();
  return (
    <HeadingLayout heading="Add tracking number">
      <Wrapper>
        <Formik
          initialValues={{
            trackingNo: "",
            courier: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log({ cartItemIds });
            const response = await createTracking({
              variables: {
                input: {
                  trackingNo: values.trackingNo,
                  courier: values.courier,
                  // if only 1 cartItem => not array but string, so i have to turn it to array
                  cartItemIds:
                    typeof cartItemIds === "string"
                      ? [parseInt(cartItemIds)]
                      : (cartItemIds as string[]).map((id) =>
                          parseInt(id as string)
                        ),
                },
              },
            });

            router.push(`/order/tracking/${response.data?.createTracking.id}`);
            // add error handler later
            // if (response.data?.createTracking) {
            //     // instead of setErrors({username: "error message"}) we do
            //     setErrors(toErrorMap(response.data.register.errors));
            //   } else if (response.data?.register.user) {
            //     // work we get the user!
            //     router.push("/");
            //   }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {" "}
              <Box my={2}>
                <Text fontWeight="bold">Courier</Text>

                <Field placeholder="Select courier" as="select" name="courier">
                  {courierList.map((courier, index) => (
                    <option key={index} value={courier.key}>
                      {courier.key}
                    </option>
                  ))}
                </Field>
              </Box>
              <Box>
                <Text fontWeight="bold">Tracking Number</Text>
                <InputField name="trackingNo" placeholder="Tracking Number" />
              </Box>
              <Center>
                {" "}
                <Button mt={4} type="submit" isLoading={isSubmitting}>
                  {" "}
                  Update tracking
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(CreateTracking);
