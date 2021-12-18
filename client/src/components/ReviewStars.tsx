import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Field, Formik } from "formik";
import { values } from "lodash";
import React from "react";

interface ReviewStarsProps {
  reviewScore: number;
  reviewsCounter?: number;
  flexDirection?: string;
}

export const ReviewStars: React.FC<ReviewStarsProps> = ({
  reviewScore,
  reviewsCounter,
  flexDirection,
}) => {
  return (
    <Flex
      direction={flexDirection == "column" ? "column" : "row"}
      alignItems="center"
    >
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
      </Flex>
      <Box>
        <Text ml={2} d="inline">
          {reviewScore.toFixed(1)}
        </Text>

        {reviewsCounter && (
          <Text d="inline">
            {" "}
            ({reviewsCounter} {reviewsCounter > 1 ? "reviews" : "review"})
          </Text>
        )}
      </Box>
    </Flex>
  );
};
