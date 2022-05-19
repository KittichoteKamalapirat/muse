import { Box, Center, Text } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { useCreateTrackingMutation } from "../../../generated/graphql";
import { courierList } from "../../../util/constants/courierList";
import { withApollo } from "../../../util/withApollo";

interface CreateTrackingProps {}

const CreateTracking: React.FC<CreateTrackingProps> = ({}) => {
  const router = useRouter();
  const { id, cartItemIds } = router.query;

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
                // if there is trackingId -> update in the backend, else -> create
                ...(id && { id: parseInt(id as string) }),
              },
            });

            // push to tracking page even when found or not found (but the content in the page will be different)
            // if found -> show the info
            // if not found -> let user knows, maybe it's not added to the system OR wrong number
            router.push(
              `/order/tracking/${response.data?.createTracking.id}?next=/myshop/order?status=OnTheWay`
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form>
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
                <Button type="submit" isLoading={isSubmitting}>
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
