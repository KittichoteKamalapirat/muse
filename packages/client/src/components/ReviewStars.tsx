import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
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
        {[...Array(5)].map((star, index) => {
          const starIndex = index + 1;
          console.log(starIndex);
          return (
            <StarIcon
              key={index}
              // value={starIndex}
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
