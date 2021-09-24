import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  AccountInfoInput,
  useCreateAccountInfoMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../util/createUrqlClient";
import { useIsAuth } from "../../../util/useIsAuth";

interface CreateAccountInfoProps {}

const CreateAccountInfo: React.FC<CreateAccountInfoProps> = ({}) => {
  const [, createAccountInfo] = useCreateAccountInfoMutation();
  const router = useRouter();
  useIsAuth();

  const handleOnSubmit = async (values: any) => {
    const address = values.line1.concat(
      values.road,
      values.subdistrict,
      values.district,
      values.province,
      values.postcode
    );
    const input: AccountInfoInput = {
      address: address,
      mobileNumber: values.mobileNumber,
      avatarUrl: "",
    };
    const { error } = await createAccountInfo({ input });

    if (error) {
      throw new Error();
    } else {
      router.back();
    }
    return;
  };
  return (
    <Layout>
      <h1>Create account information</h1>
      <Formik
        initialValues={{
          line1: "",
          road: "",
          subdistrict: "",
          district: "",
          province: "",
          country: "",
          postcode: "",
          mobileNumber: "",
        }}
        onSubmit={(values) => handleOnSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="line1"
              placeholder="Address line 1"
              label="line1"
            />
            <Flex>
              <InputField name="road" placeholder="road" label="road" />{" "}
              <InputField
                name="subdistrict"
                placeholder="subdistrict"
                label="subdistrict"
              />
            </Flex>
            <Flex>
              {" "}
              <InputField
                name="district"
                placeholder="district"
                label="district"
              />{" "}
              <InputField
                name="province"
                placeholder="province"
                label="province"
              />{" "}
            </Flex>
            <Flex>
              {" "}
              <InputField
                name="country"
                placeholder="country"
                label="country"
              />{" "}
              <InputField
                name="postcode"
                placeholder="postcode"
                label="postcode"
              />{" "}
            </Flex>
            <InputField
              name="mobileNumber"
              placeholder="mobileNumber"
              label="mobileNumber"
            />{" "}
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateAccountInfo);
