import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link, Text, Heading } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { withApollo } from "../util/withApollo";
import { Layout } from "../components/Layout/Layout";
import { WelcomeNav } from "../components/WelcomeNav";
import { ContentWrapper } from "../components/Wrapper/ContentWrapper";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <WelcomeNav>
      <Wrapper variant="small">
        <ContentWrapper>
          <Box textAlign="center" m={10}>
            <Heading fontSize="xl">Log in</Heading>
          </Box>

          <Formik
            initialValues={{
              usernameOrEmailOrPhonenumber: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user,
                    },
                  });
                  cache.evict({ fieldName: "posts:{}" });
                },
              });
              // └ has to match what defined in graphqlmutation
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                // work we get the user!
                // If login, push to the previoius page
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="usernameOrEmailOrPhonenumber"
                  placeholder="อีเมล/เบอร์โทร/ชื่อผู้ใช้/"
                  label="email, phone, username"
                />
                <Box mt={4}>
                  {" "}
                  <InputField
                    name="password"
                    placeholder="password"
                    label="password"
                    type="password"
                  />
                </Box>
                <Flex>
                  <NextLink href="/forgot-password">
                    <Link ml={"auto"} fontSize="sm" textDecoration="underline">
                      Forgot password
                    </Link>
                  </NextLink>
                </Flex>

                <Box textAlign="center" mt={5}>
                  Don't have an account?{" "}
                  <NextLink href="/register">
                    <Link fontWeight="700" color="red.400">
                      Register
                    </Link>
                  </NextLink>
                </Box>

                <Button
                  mt={4}
                  width="100%"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {" "}
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </ContentWrapper>
      </Wrapper>
    </WelcomeNav>
  );
};

// we need to create the Urql client because we need to use Mutation
// somehow adding ssr true fix the localhost3000/grpahql problem, it's suppoed to be 4000
export default withApollo({ ssr: false })(Login);
