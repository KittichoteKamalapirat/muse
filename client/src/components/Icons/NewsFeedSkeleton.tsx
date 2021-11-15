import React from "react";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

interface NewsFeedSkeletonProps {}

export const NewsFeedSkeleton: React.FC<NewsFeedSkeletonProps> = ({}) => {
  return (
    <Box>
      <Stack>
        <SkeletonCircle size="10" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Box>
  );
};
