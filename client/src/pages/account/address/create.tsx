import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { Wrapper } from "../../../components/Wrapper";
import {
  AddressInput,
  useCreateAddressMutation,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";

interface CreateAddressProps {}

const CreateAddress: React.FC<CreateAddressProps> = ({}) => {
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
    <Layout>
      <Wrapper>
        <h1>สร้างที่อยู่การจัดส่ง</h1>
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
              <InputField name="name" placeholder="Name" label="Name" />
              <InputField
                name="phonenumber"
                type="tel"
                placeholder="phonenumber"
                label="phonenumber"
              />
              <InputField
                name="line1"
                placeholder="Address line 1"
                label="line1"
              />
              <InputField
                name="line2"
                placeholder="Address line 2"
                label="line2"
              />
              <Flex>
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
              <Flex>
                {" "}
                <InputField
                  name="province"
                  placeholder="province"
                  label="province"
                />{" "}
                <InputField
                  name="country"
                  placeholder="country"
                  label="country"
                />
              </Flex>
              <Flex>
                {" "}
                <InputField
                  name="postcode"
                  placeholder="postcode"
                  label="postcode"
                />{" "}
              </Flex>

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
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateAddress);
