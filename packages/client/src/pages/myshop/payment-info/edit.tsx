import { Field, Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  usePaymentInfoQuery,
  useUpdatePaymentInfoMutation,
} from "../../../generated/graphql";
import { banksArray } from "../../../util/constants";
import { toErrorMap } from "../../../util/toErrorMap";
import { withApollo } from "../../../util/withApollo";
import FormFieldLabel from "../../../components/form/FormFieldLabel";
import { Box } from "@chakra-ui/react";

interface EditPaymentInfoProps {}

export const EditPaymentInfo: React.FC<EditPaymentInfoProps> = ({}) => {
  const [updatePaymentInfo] = useUpdatePaymentInfoMutation();

  const { data: paymentInfo, loading: paymentInfoLoading } =
    usePaymentInfoQuery();

  if (paymentInfoLoading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }
  return (
    <HeadingLayout heading="Change Payment Info">
      <XWrapper mt={20}>
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
              <Box>
                <FormFieldLabel label="Bank Name" />

                <Field as="select" name="bankCode">
                  {banksArray.map((bank) => (
                    <option value={bank.bankCode} key={bank.bankCode}>
                      {bank.bank}
                    </option>
                  ))}
                </Field>
              </Box>

              <Box mt={4}>
                <FormFieldLabel label="Bank Account" />

                <InputField
                  name="bankAccount"
                  placeholder="bankAccount"
                  label=""
                />
              </Box>

              <Button type="submit" isLoading={isSubmitting}>
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(EditPaymentInfo);
