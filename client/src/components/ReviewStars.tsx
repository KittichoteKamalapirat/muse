import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Field, Formik } from "formik";
import { values } from "lodash";
import React from "react";

interface ReviewStarsProps {
  reviewScore: number;
  reviewsCounter?: number;
}

export const ReviewStars: React.FC<ReviewStarsProps> = ({
  reviewScore,
  reviewsCounter,
}) => {
  return (
    <Flex alignItems="center">
      {[...Array(5)].map((star, i) => {
        const starIndex = i + 1;
        console.log(starIndex);
        return (
          <StarIcon
            value={starIndex}
            fontSize="1rem"
            color={reviewScore >= starIndex ? "orange" : "gray.200"}
          />
        );
      })}
      <Text ml={2} d="inline">
        {reviewScore.toFixed(1)}
      </Text>

      {reviewsCounter && (
        <Text d="inline">
          {" "}
          ({reviewsCounter} {reviewsCounter > 1 ? "reviews" : "review"})
        </Text>
      )}
    </Flex>
  );
};
