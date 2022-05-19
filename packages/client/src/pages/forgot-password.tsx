import { Box, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../util/withApollo";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout heading="forgot password">
      <Wrapper variant="small">
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
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
