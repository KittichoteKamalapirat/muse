import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  AddressInput,
  useAddressQuery,
  useUpdateAddressMutation,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";

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
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (!loading && !data) {
    return (
      <Layout heading="no address found">
        <div>No address found</div>
      </Layout>
    );
  }
  return (
    <HeadingLayout heading="Edit address">
      <XWrapper mt={20}>
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
              <Flex>
                <InputField
                  name="subdistrict"
                  placeholder="subdistrict"
                  label="subdistrict"
                  mt={4}
                />
                <InputField
                  name="district"
                  placeholder="district"
                  label="district"
                  mt={4}
                />
              </Flex>
              <Flex mt={4}>
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

              <Button type="submit" isLoading={isSubmitting} mt={10}>
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(EditAddress);
