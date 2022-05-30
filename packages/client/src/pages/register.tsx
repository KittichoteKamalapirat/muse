import { Box, Heading, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import Button from "../components/atoms/Button";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout/Layout";
import { Loading } from "../components/skeletons/Loading";
import { WelcomeNav } from "../components/WelcomeNav";
import { ContentWrapper } from "../components/Wrapper/ContentWrapper";
import { Wrapper } from "../components/Wrapper/Wrapper";
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { withApollo } from "../util/withApollo";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const { isCreator } = router.query;

  const { data, loading: loading } = useMeQuery();

  const [register] = useRegisterMutation();

  if (loading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (data?.me) {
    if (typeof router.query.next === "string") {
      router.push(`${router.query.next}?from=register`);
    } else {
      // work we get the user!
      router.push("/");
    }
  }

  return (
    <WelcomeNav>
      <Head>
        <title>Signup - Cookknow</title>
      </Head>
      <Wrapper variant="small">
        <ContentWrapper>
          <Box textAlign="center">
            <Heading fontSize="xl" m={10}>
              {isCreator ? "Register Creator Account" : " Create Account"}
            </Heading>
          </Box>

          <Formik
            initialValues={{
              email: "",
              username: "",
              phonenumber: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: {
                  data: { ...values, isCreator: isCreator ? true : false },
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.user,
                    },
                  });
                },
              }); //the values here exactly match the params in graphql, no need to explicitly write {username: values.user}
              // └the types of response used to be "any", but with  codegen it's now RegisterMutation type
              // and this is good because typescript knwos what properties there are

              if (response.data?.register.errors) {
                // instead of setErrors({username: "error message"}) we do
                setErrors(toErrorMap(response.data.register.errors));
              } // response.data.register will return an error will data is undefined
              // response.data?.register will return undefined if there is no data -> false
            }}
          >
            {({ isSubmitting }) => (
              // {({ values, handleChange }) => (
              <Form>
                {/* <FormControl> */}
                {/* <FormLabel htmlFor="username">Username</FormLabel> */}
                {/* <Input */}
                {/* value={values.username} */}
                {/* onChange={handleChange} */}
                {/* id="username" */}
                {/* placeholder="username" */}
                {/* /> */}
                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                {/* </FormControl> */}

                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />

                <Box mt={4}>
                  {/* {" "} */}
                  <InputField name="email" placeholder="email" label="Email" />
                </Box>

                <Box mt={4}>
                  {/* {" "} */}
                  <InputField
                    name="phonenumber"
                    placeholder="phonenumber"
                    label="Phonenumber"
                  />
                </Box>

                <Box mt={4}>
                  {/* {" "} */}
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>

                <Box textAlign="center" mt={5}>
                  Already have an account?{" "}
                  <NextLink
                    href={{
                      pathname: "/login",
                      query: {
                        next: router.query.next,
                      },
                    }}
                    passHref
                  >
                    <Link fontWeight="700" color="red.400">
                      Log in
                    </Link>
                  </NextLink>
                </Box>

                <Button type="submit" isLoading={isSubmitting}>
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </ContentWrapper>
      </Wrapper>
    </WelcomeNav>
  );
};

export default withApollo({ ssr: false })(Register);
