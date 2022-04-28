import { StarIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Avatar, Box, Button, Center, Img, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { MainNav } from "../../components/MainNav";
import { Error } from "../../components/skeletons/Error";
import { Loading } from "../../components/skeletons/Loading";
import {
  useCreateReviewMutation,
  useMealkitQuery,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

interface WriteReviewProps {}

const WriteReview: React.FC<WriteReviewProps> = ({}) => {
  const router = useRouter();
  const { mealkitId, cartItemId } = router.query;

  const {
    data: mealkitData,
    loading: mealkitLoading,
    error: mealkitError,
  } = useMealkitQuery({ variables: { id: parseInt(mealkitId as string) } });

  const [hover, setHover] = useState<number | null>(null);
  const toast = useToast();

  const [createReview] = useCreateReviewMutation();

  if (mealkitLoading) {
    return <Loading />;
  }

  if (mealkitError) {
    return <Text>Error</Text>;
  }

  // const postId =
  // typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return (
    <Box width="90%" mx="auto" mt={5}>
      <HeadingLayout heading="Leave a review">
        {}

        {mealkitData && (
          <>
            <Flex alignItems="center">
              <Avatar
                src={mealkitData?.mealkit?.creator.avatar}
                size="sm"
                name={mealkitData?.mealkit?.creator.username}
              />
              <Text>{mealkitData?.mealkit?.creator.username}</Text>
            </Flex>
            <Flex my={4}>
              <Img
                src={mealkitData.mealkit?.thumbnail.url}
                flex={1}
                boxSize="20%"
              />
              <Box flex={3} mx={2}>
                <Heading fontSize="md">{mealkitData?.mealkit?.name}</Heading>
                <Text>
                  For {mealkitData?.mealkit?.portion}{" "}
                  {mealkitData?.mealkit?.portion &&
                  mealkitData?.mealkit?.portion > 1
                    ? "people"
                    : "person"}
                </Text>
                <Text>{mealkitData?.mealkit?.price}</Text>
              </Box>
            </Flex>
          </>
        )}

        <Formik
          initialValues={{
            score: 0,
            title: "",
            text: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await createReview({
                variables: {
                  input: {
                    score: parseInt(values.score as unknown as string),
                    title: values.title,
                    text: values.text,
                  },
                  mealkitId: parseInt(mealkitId as string),
                  cartItemId: parseInt(cartItemId as string),
                },
              });

              toast({
                title: "Review received!.",
                description: "Thank you for the feedback",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              router.push(`/post/${mealkitData?.mealkit?.postId}`);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Center my={5}>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={ratingValue}>
                      <Field
                        type="radio"
                        name="score"
                        value={ratingValue}
                        style={{ display: "none" }}
                      />
                      <StarIcon
                        fontSize="3rem"
                        color={
                          hover && ratingValue <= hover
                            ? "orange.200"
                            : ratingValue <= values.score
                            ? "orange"
                            : "gray.200"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        cursor="pointer"
                      />
                    </label>
                  );
                })}
              </Center>

              <Box>
                <Text fontWeight="bold">Title</Text>
                <InputField name="title" placeholder="title" />
              </Box>
              <Box>
                <Text fontWeight="bold">Text</Text>
                <InputField name="text" placeholder="text" textarea={true} />
              </Box>
              <Center>
                <Button mt={4} type="submit" isLoading={isSubmitting}>
                  Submit review
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </HeadingLayout>
      <MainNav />
    </Box>
  );
};

export default withApollo({ ssr: false })(WriteReview);
