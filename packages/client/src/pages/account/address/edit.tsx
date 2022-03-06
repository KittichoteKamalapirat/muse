import { Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout/Layout";
import { Wrapper } from "../../../components/Wrapper";
import {
  AddressInput,
  useUpdateAddressMutation,
  useAddressQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";
import { Loading } from "../../../components/skeletons/Loading";

interface EditAddressProps {}

const EditAddress: React.FC<EditAddressProps> = ({}) => {
  const { data, loading } = useAddressQuery();
  const [updateAddress] = useUpdateAddressMutation();

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
    const { errors } = await updateAddress({
      variables: { input, id: data!.address.id },
      // update: cache =>
    });
    router.push("/account/address");

    if (errors) {
      throw new Error();
    } else {
      router.back();
    }
    return;
  };

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (!loading && !data) {
    return (
      <Layout>
        <div>ไม่พบที่อยู่ของคุณ</div>
      </Layout>
    );
  }
  return (
    <HeadingLayout heading="Edit address">
      <Wrapper>
        <Formik
          initialValues={{
            name: data?.address.name,
            phonenumber: data?.address.phonenumber,
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

              <Button mt={4} type="submit" isLoading={isSubmitting}>
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

export default withApollo({ ssr: false })(EditAddress);
