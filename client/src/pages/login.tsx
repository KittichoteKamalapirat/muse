import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../util/createUrqlClient";
import NextLink from "next/link";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login(values);
          // └ has to match what defined in graphqlmutation
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // work we get the user!
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              {" "}
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex>
              {" "}
              <NextLink href="/forgot-password">
                <Link ml={"auto"}>Forgot password</Link>
              </NextLink>
            </Flex>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              {" "}
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// we need to create the Urql client because we need to use Mutation
// somehow adding ssr true fix the localhost3000/grpahql problem, it's suppoed to be 4000
export default withUrqlClient(createUrqlClient)(Login);
