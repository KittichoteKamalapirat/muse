import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { InputField } from "../../../components/InputField";
import { Wrapper } from "../../../components/Wrapper";
import {
  useMeQuery,
  UserInput,
  useUpdateUserMutation,
} from "../../../generated/graphql";
import { withApollo } from "../../../util/withApollo";

interface userProps {}

const UpdateUser: React.FC<userProps> = ({}) => {
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
    return <Text>loading ...</Text>;
  }
  return (
    <HeadingLayout heading="Edit Profile">
      <Wrapper>
        <Formik
          initialValues={{
            username: meData?.me?.username!,
            email: meData?.me?.email!,
            phonenumber: meData?.me?.phonenumber!,
            about: meData?.me?.about!,
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
              <InputField name="email" placeholder="email" label="email" />{" "}
              <InputField
                name="phonenumber"
                type="tel"
                placeholder="phonenumber"
                label="phonenumber"
              />
              <InputField
                name="about"
                textarea={true}
                placeholder="about"
                label="about"
              />
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

export default withApollo({ ssr: false })(UpdateUser);
