import { Box, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import Button from "../../components/atoms/Button";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../util/toErrorMap";
import { withApollo } from "../../util/withApollo";

export const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  // token is attached here, in the url as the file name indicated http://localhost:3000/change-password/8897c920-3e19-48d2-b24e-cf1e068445d4
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          newPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          //   console.log(values);
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.changePassword.user,
                },
              });
            },
          });
          // └ has to match what defined in graphqlmutation
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            } else {
              setErrors(errorMap);
            }
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              {" "}
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Flex>
                <Box color="red" mr={2}>
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password" passHref>
                  <Link>Get another one</Link>
                </NextLink>
              </Flex>
            ) : null}

            <Button type="submit" isLoading={isSubmitting}>
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// page without the getInitialProps will be optimized by next, so if no need, better not use it
// we need when we want to ssr based on query parameter which is the purpose of getinitial props
// ChangePassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   };
// };

export default withApollo({ ssr: false })(ChangePassword);
