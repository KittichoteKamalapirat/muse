import { Box, Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";

interface NewsFeedSkeletonProps {}

export const NewsFeedSkeleton: React.FC<NewsFeedSkeletonProps> = ({}) => {
  return (
    <Wrapper>
      <Box>
        <Stack>
          <Flex alignItems="center">
            <SkeletonCircle size="10" mr="10px" />
            <Skeleton height="20px">username </Skeleton>
          </Flex>

          <Skeleton height="300px" />
          <Flex alignItems="center">
            <SkeletonCircle size="5" mr="10px" />
            <Skeleton height="20px">00 </Skeleton>
          </Flex>
          <Skeleton height="20px" />
          <Skeleton height="20px" />

          <Flex alignItems="center">
            <Skeleton height="70px" flex={1} mr="10px" />
            <Stack flex={3}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </Wrapper>
  );
};
