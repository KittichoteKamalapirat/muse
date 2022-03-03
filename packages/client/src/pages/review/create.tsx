import { StarIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Box, Center, Button, Avatar, Img } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { InputField } from "../../components/InputField";
import { MainNav } from "../../components/MainNav";
import {
  useCreateReviewMutation,
  useMealkitLazyQuery,
} from "../../generated/graphql";
import { courierList } from "../../util/constants/courierList";
import { withApollo } from "../../util/withApollo";
import { useToast } from "@chakra-ui/react";

interface WriteReviewProps {}

const WriteReview: React.FC<WriteReviewProps> = ({}) => {
  const router = useRouter();
  const { mealkitId, cartItemId } = router.query;

  const [
    mealkit,
    { data: mealkitData, loading: mealkitLoading, error: mealkitError },
  ] = useMealkitLazyQuery();

  const [hover, setHover] = useState<number | null>(null);
  const toast = useToast();

  const [createReview] = useCreateReviewMutation();
  console.log({ mealkitId });
  console.log({ mealkitData });

  useEffect(() => {
    if (mealkitId) {
      mealkit({
        variables: {
          id: parseInt(mealkitId as string),
        },
      });
    }
  }, [mealkitId]);

  if (mealkitLoading) {
    return <Text>loading</Text>;
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
                src={(mealkitData?.mealkit?.images as Array<string>)[0]}
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
              console.log(typeof values.score);
              console.log(values.score);
              console.log(typeof values.title);
              console.log(values.title);
              console.log(typeof values.text);
              console.log(values.text);
              console.log(typeof mealkitId);
              console.log(mealkitId);
              console.log(typeof cartItemId);
              console.log(cartItemId);
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
              console.log("pass");

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
                    <label>
                      <Field
                        type="radio"
                        name="score"
                        value={ratingValue}
                        style={{ display: "none" }}
                      />
                      <StarIcon
                        fontSize="3rem"
                        // color={
                        //   ratingValue <= (hover || values.score)
                        //     ? "orange"
                        //     : "gray.200"
                        // }
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

              {/* <Box>
                <Text fontWeight="bold">Score</Text>
                <InputField
                  name="score"
                  placeholder="score"
                  type="number"
                  min={0}
                  max={5}
                />
              </Box> */}
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
