import { Box, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Button from "../components/atoms/Button";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout/Layout";
import { XWrapper } from "../components/Wrapper/XWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../util/withApollo";

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout heading="forgot password">
      <XWrapper>
        <Box textAlign="center" m={10}>
          <Heading fontSize="xl">Forgot password</Heading>
        </Box>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (values) => {
            await forgotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                <Text>
                  If an account with that email exists, we&apos;ve sent you the
                  email.
                </Text>
                <Text>Iy may take a few moments</Text>
              </Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />

                <Button mt={4} type="submit" isLoading={isSubmitting}>
                  {" "}
                  Change password
                </Button>
              </Form>
            )
          }
        </Formik>
      </XWrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
