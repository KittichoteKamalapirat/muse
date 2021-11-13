import { Text, Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import router from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/HeadingLayout";
import { InputField } from "../../../components/InputField";
import { Wrapper } from "../../../components/Wrapper";
import {
  PaymentInfoQuery,
  PaymentInfoDocument,
  usePaymentInfoQuery,
  useUpdatePaymentInfoMutation,
} from "../../../generated/graphql";
import { banksArray } from "../../../util/constants";
import { toErrorMap } from "../../../util/toErrorMap";
import { withApollo } from "../../../util/withApollo";

interface EditPaymentInfoProps {}

export const EditPaymentInfo: React.FC<EditPaymentInfoProps> = ({}) => {
  const [updatePaymentInfo] = useUpdatePaymentInfoMutation();

  const { data: paymentInfo, loading: paymentInfoLoading } =
    usePaymentInfoQuery();

  if (paymentInfoLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <HeadingLayout heading="Add Payment Info">
      <Wrapper>
        <Formik
          initialValues={{
            bankCode: paymentInfo?.paymentInfo?.bankCode,
            bankAccount: paymentInfo?.paymentInfo?.bankAccount,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await updatePaymentInfo({
              variables: {
                input: {
                  bankCode: values.bankCode!,
                  bankAccount: values.bankAccount!,
                },
                id: paymentInfo?.paymentInfo?.id!,
              },
            });

            if (response.data?.updatePaymentInfo?.errors) {
              console.log("error");
              console.log(response.data?.updatePaymentInfo?.errors);
              // instead of setErrors({username: "error message"}) we do
              setErrors(toErrorMap(response.data.updatePaymentInfo.errors));
            } else if (response.data?.updatePaymentInfo?.paymentInfo) {
              // work we get the user!
              router.push("/myshop/payment-info");
            }
            return;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* <InputField name="bank" placeholder="bank" label="Bank" /> */}
              <label>Bank</label>

              {/* <Select placeholder="Select option"> */}
              <Field as="select" name="bankCode">
                {banksArray.map((bank) => (
                  <option value={bank.bankCode}>
                    {bank.bank} ({bank.bankCode}){" "}
                  </option>
                ))}
              </Field>
              {/* </Select> */}

              <InputField
                name="bankAccount"
                placeholder="bankAccount"
                label="Bank Account"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                {" "}
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(EditPaymentInfo);
