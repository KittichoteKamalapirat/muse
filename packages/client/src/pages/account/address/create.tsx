import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { XWrapper } from "../../../components/Wrapper/XWrapper";

import {
  AddressInput,
  useCreateAddressMutation,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";

const CreateAddress = () => {
  const [createAddress] = useCreateAddressMutation();
  const router = useRouter();
  useIsAuth();

  const handleOnSubmit = async (values: any) => {
    const input: AddressInput = {
      name: values.name,
      phonenumber: values.phonenumber,
      line1: values.line1,
      line2: values.line2,
      subdistrict: values.subdistrict,
      district: values.district,
      province: values.province,
      country: values.country,
      postcode: values.postcode,
    };
    const { errors } = await createAddress({ variables: { input } }); //somehow no need to manuall update cache
    router.push("/account/address");

    if (errors) {
      throw new Error();
    } else {
      router.back();
    }
    return;
  };
  return (
    <HeadingLayout heading="Create address">
      <XWrapper mt={20}>
        <Formik
          initialValues={{
            name: "",
            phonenumber: "",
            line1: "",
            line2: "",
            subdistrict: "",
            district: "",
            province: "",
            country: "",
            postcode: "",
          }}
          onSubmit={(values) => handleOnSubmit(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="name" placeholder="Name" label="Name" mt={4} />
              <InputField
                name="phonenumber"
                type="tel"
                placeholder="phonenumber"
                label="phonenumber"
                mt={4}
              />
              <InputField
                name="line1"
                placeholder="Address line 1"
                label="line1"
                mt={4}
              />
              <InputField
                name="line2"
                placeholder="Address line 2"
                label="line2"
                mt={4}
              />
              <Flex mt={4}>
                <InputField
                  name="subdistrict"
                  placeholder="subdistrict"
                  label="subdistrict"
                />
                <InputField
                  name="district"
                  placeholder="district"
                  label="district"
                />
              </Flex>
              <Flex mt={4} gap={4}>
                <InputField
                  name="province"
                  placeholder="province"
                  label="province"
                />
                <InputField
                  name="country"
                  placeholder="country"
                  label="country"
                />
              </Flex>
              <Flex mt={4}>
                <InputField
                  name="postcode"
                  placeholder="postcode"
                  label="postcode"
                />
              </Flex>

              <Button mt={10} type="submit" isLoading={isSubmitting}>
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(CreateAddress);
