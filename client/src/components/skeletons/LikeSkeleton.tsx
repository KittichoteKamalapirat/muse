import React from "react";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Flex,
  Img,
} from "@chakra-ui/react";
import { Wrapper } from "../Wrapper";

interface LikeSkeletonProps {}

export const LikeSkeleton: React.FC<LikeSkeletonProps> = ({}) => {
  return (
    <Box>
      <Stack>
        <Flex>
          <Skeleton height="100px" flex={1} mr="10px" />
          <Stack flex={2}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};
