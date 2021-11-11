import { Button } from "@chakra-ui/button";
import { Select } from "@chakra-ui/select";
import { Field, Form, Formik } from "formik";
import { BreakingChangeType } from "graphql";
import { useRouter } from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/HeadingLayout";
import { InputField } from "../../../components/InputField";
import { Wrapper } from "../../../components/Wrapper";
import {
  PaymentInfoDocument,
  PaymentInfoQuery,
  useCreatePaymentInfoMutation,
} from "../../../generated/graphql";
import { banksArray } from "../../../util/constants";
import { withApollo } from "../../../util/withApollo";

interface CreatePaymentInfoProps {}

const CreatePaymentInfo: React.FC<CreatePaymentInfoProps> = ({}) => {
  const [createPaymentInfo] = useCreatePaymentInfoMutation();
  const router = useRouter();

  return (
    <HeadingLayout heading="Add Payment Info">
      <Wrapper>
        <Formik
          initialValues={{
            bankCode: "",
            bankAccount: "",
          }}
          onSubmit={async (values) => {
            const { errors } = await createPaymentInfo({
              variables: { input: values },
              //   refetchQueries: [{ query: PaymentInfoDocument }],
              update: (cache, data) => {
                cache.writeQuery<PaymentInfoQuery>({
                  query: PaymentInfoDocument,
                  data: {
                    paymentInfo: {
                      __typename: "PaymentInfo",
                      id: data.data?.createPaymentInfo.id!,
                      userId: data.data?.createPaymentInfo.userId!,
                      bankCode: data.data?.createPaymentInfo.bankCode!,
                      bankAccount: data.data?.createPaymentInfo.bankAccount!,
                    },
                  },
                  variables: {
                    id: data.data?.createPaymentInfo.id,
                  },
                });
              },
            });
            router.push("/myshop/payment-info");
            if (errors) {
              throw new Error();
            } else {
              router.back();
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
