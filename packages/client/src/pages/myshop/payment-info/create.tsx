import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Field, Form, Formik } from "formik";
import { BreakingChangeType } from "graphql";
import { useRouter } from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { InputField } from "../../../components/InputField";
import { Wrapper } from "../../../components/Wrapper";
import {
  PaymentInfoDocument,
  PaymentInfoQuery,
  useCreatePaymentInfoMutation,
  usePaymentInfoQuery,
} from "../../../generated/graphql";
import { banksArray } from "../../../util/constants";
import { toErrorMap } from "../../../util/toErrorMap";
import { withApollo } from "../../../util/withApollo";
import SvgScb from "../../../components/svgComponents/Scb";

interface CreatePaymentInfoProps {}

const CreatePaymentInfo: React.FC<CreatePaymentInfoProps> = ({}) => {
  const { data: paymentInfo, loading: paymentInfoLoading } =
    usePaymentInfoQuery();
  const [createPaymentInfo] = useCreatePaymentInfoMutation();
  const router = useRouter();

  console.log(paymentInfo);
  if (paymentInfo?.paymentInfo) {
    router.push("/myshop/payment-info");
  }
  return (
    <HeadingLayout heading="Add Payment Info">
      <Wrapper>
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
                      id: data.data?.createPaymentInfo.paymentInfo?.id!,
                      // id: data.data?.createPaymentInfo.id!,
                      userId: data.data?.createPaymentInfo.paymentInfo?.userId!,
                      bankCode:
                        data.data?.createPaymentInfo.paymentInfo?.bankCode!,
                      bankAccount:
                        data.data?.createPaymentInfo.paymentInfo?.bankAccount!,
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

            // if (errors) {
            //   throw new Error();
            // } else {
            //   router.back();
            // }
            return;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* <InputField name="bank" placeholder="bank" label="Bank" /> */}
              <Box>
                <label>Bank</label>
              </Box>

              {/* <Select placeholder="Select option"> */}
              <Field as="select" name="bankCode">
                <option value="select">select</option>
                {banksArray.map((bank) => (
                  <option value={bank.bankCode} key={bank.bank}>
                    {bank.bank}
                  </option>

                  // </Box>
                ))}
              </Field>
              {/* </Select> */}

              <InputField
                name="bankAccount"
                placeholder="bankAccount"
                label="Bank Account"
              />
              <Button mt={4} type="submit" isLoading={isSubmitting}>
                {" "}
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(CreatePaymentInfo);
