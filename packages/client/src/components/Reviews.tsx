import { Avatar } from "@chakra-ui/avatar";
import { Flex, Box, Text, Heading } from "@chakra-ui/layout";
import moment from "moment";
import React from "react";
import { useMealkitsQuery, useReviewsQuery } from "../generated/graphql";
import { Layout } from "./Layout/Layout";
import { ReviewStars } from "./ReviewStars";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";
import { ContentWrapper } from "./Wrapper/ContentWrapper";

interface ReviewsProps {
  mealkitId: number;
}

export const Reviews: React.FC<ReviewsProps> = ({ mealkitId }) => {
  const { data, loading, error } = useReviewsQuery({
    variables: { mealkitId },
  });

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Error text={error.message} />
      </Layout>
    );
  }

  //   const hi = moment(review.createdAt)
  console.log(moment());

  return (
    <ContentWrapper>
      <Heading fontSize="xl">Reviews</Heading>
      {data?.reviews.map((review, index) => (
        <Box key={index}>
          <Flex my={5}>
            <Avatar
              name={review.user.username}
              src={review.user.avatar}
              size="md"
            />
            {console.log("test")}
            {console.log(
              moment(new Date(parseInt(review.createdAt))).format("YYYY-MM-DD")
            )}
            {console.log(moment(review.createdAt).toString())}
            <Box ml={2}>
              <Text>{review.user.username}</Text>
              <ReviewStars reviewScore={review.score} />
            </Box>
          </Flex>
          <Box>
            <Heading fontSize="lg">{review.title}</Heading>
            <Text>{review.text}</Text>
          </Box>
        </Box>
      ))}
    </ContentWrapper>
  );
};
