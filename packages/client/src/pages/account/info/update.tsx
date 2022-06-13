import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import { InputField } from "../../../components/InputField";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  useMeQuery,
  UserInput,
  useUpdateUserMutation,
} from "../../../generated/graphql";
import { withApollo } from "../../../util/withApollo";

const UpdateUser = () => {
  const { data: meData, loading } = useMeQuery();
  const [updateUser] = useUpdateUserMutation();

  const handleOnSubmit = async (values: UserInput) => {
    const { errors } = await updateUser({ variables: { input: values } });
    router.push("/account/info");
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
  return (
    <HeadingLayout heading="Edit Profile">
      <XWrapper mt={20}>
        <Formik
          initialValues={{
            username: meData?.me?.username as string,
            email: meData?.me?.email as string,
            phonenumber: meData?.me?.phonenumber as string,
            about: meData?.me?.about as string,
          }}
          onSubmit={(values: UserInput) => handleOnSubmit(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="username"
              />{" "}
              <InputField
                name="email"
                placeholder="email"
                label="email"
                mt={2}
              />
              <InputField
                name="phonenumber"
                type="tel"
                placeholder="phonenumber"
                label="phonenumber"
                mt={2}
              />
              <InputField
                name="about"
                textarea={true}
                placeholder="about"
                label="about"
                mt={2}
              />
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

export default withApollo({ ssr: false })(UpdateUser);
