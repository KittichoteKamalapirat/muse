import { Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useCreateAddressMutation,
  AddressInput,
  useUpdateAddressMutation,
  useAddressQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../util/createUrqlClient";
import { useIsAuth } from "../../../util/useIsAuth";

interface EditAddressProps {}

const EditAddress: React.FC<EditAddressProps> = ({}) => {
  const [{ data, fetching }] = useAddressQuery();
  const [, updateAddress] = useUpdateAddressMutation();

  const router = useRouter();
  useIsAuth();

  const handleOnSubmit = async (values: any) => {
    const input: AddressInput = {
      line1: values.line1,
      line2: values.line2,
      subdistrict: values.subdistrict,
      district: values.district,
      province: values.province,
      country: values.country,
      postcode: values.postcode,
    };
    const { error } = await updateAddress({ input, id: data!.address.id });
    router.push("/account/address");

    if (error) {
      throw new Error();
    } else {
      router.back();
    }
    return;
  };

  if (fetching) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }

  if (!fetching && !data) {
    return (
      <Layout>
        <div>ไม่พบที่อยู่ของคุณ</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>แก้ไขที่อยู่การจัดส่ง</h1>
      <Formik
        initialValues={{
          line1: data?.address.line1,
          line2: data?.address.line2,
          subdistrict: data?.address.subdistrict,
          district: data?.address.district,
          province: data?.address.province,
          country: data?.address.country,
          postcode: data?.address.postcode,
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditAddress);
