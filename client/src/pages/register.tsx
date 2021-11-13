import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withApollo } from "../util/withApollo";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: "",
          username: "",
          phonenumber: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { data: values },
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
          } else if (response.data?.register.user) {
            // work we get the user!
            router.push("/");
          }
          // response.data.register will return an error will data is undefined
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
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              {" "}
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
