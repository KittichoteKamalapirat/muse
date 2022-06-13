import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import FormFieldLabel from "../../../components/form/FormFieldLabel";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Error } from "../../../components/skeletons/Error";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  PaymentInfoDocument,
  PaymentInfoQuery,
  useCreatePaymentInfoMutation,
  usePaymentInfoQuery,
} from "../../../generated/graphql";
import { banksArray } from "../../../util/constants";
import { toErrorMap } from "../../../util/toErrorMap";
import { withApollo } from "../../../util/withApollo";

const CreatePaymentInfo = () => {
  const {
    data: paymentInfo,
    loading: paymentInfoLoading,
    error: paymentInfoError,
  } = usePaymentInfoQuery();
  const [createPaymentInfo] = useCreatePaymentInfoMutation();
  const router = useRouter();

  console.log(paymentInfo);
  if (paymentInfo?.paymentInfo) {
    router.push("/myshop/payment-info");
  }

  if (paymentInfoLoading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (paymentInfoError) {
    return (
      <Layout heading="loading">
        <Error text={paymentInfoError?.message} />
      </Layout>
    );
  }

  return (
    <HeadingLayout heading="Add Payment Info">
      <XWrapper>
        <Formik
          initialValues={{
            bankCode: "",
            bankAccount: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createPaymentInfo({
              variables: { input: values },
              //   refetchQueries: [{ query: PaymentInfoDocument }],
              update: (cache, data) => {
                cache.writeQuery<PaymentInfoQuery>({
                  query: PaymentInfoDocument,
                  data: {
                    paymentInfo: {
                      __typename: "PaymentInfo",
                      id: data.data?.createPaymentInfo.paymentInfo
                        ?.id as number,
                      // id: data.data?.createPaymentInfo.id,
                      userId: data.data?.createPaymentInfo.paymentInfo
                        ?.userId as string,
                      bankCode: data.data?.createPaymentInfo.paymentInfo
                        ?.bankCode as string,
                      bankAccount: data.data?.createPaymentInfo.paymentInfo
                        ?.bankAccount as string,
                    },
                  },
                  variables: {
                    id: data.data?.createPaymentInfo.paymentInfo?.id,
                  },
                });
              },
            });

            if (response.data?.createPaymentInfo.errors) {
              // instead of setErrors({username: "error message"}) we do
              setErrors(toErrorMap(response.data.createPaymentInfo.errors));
            } else if (response.data?.createPaymentInfo.paymentInfo) {
              // work we get the user!
              router.push("/myshop/payment-info");
            }

            return;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <FormFieldLabel label="Bank Name" required />

                <Field as="select" name="bankCode">
                  <option value="select">select</option>
                  {banksArray.map((bank) => (
                    <option value={bank.bankCode} key={bank.bank}>
                      {bank.bank}
                    </option>
                  ))}
                </Field>
              </Box>

              <Box mt={4}>
                <FormFieldLabel label="Bank Account" required />

                <InputField
                  name="bankAccount"
                  placeholder="bankAccount"
                  label=""
                />
              </Box>

              <Button type="submit" isLoading={isSubmitting}>
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(CreatePaymentInfo);
