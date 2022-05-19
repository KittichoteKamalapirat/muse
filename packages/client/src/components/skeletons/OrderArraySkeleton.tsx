import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

interface OrderArraySkeletonProps {}

export const OrderArraySkeleton: React.FC<OrderArraySkeletonProps> = ({}) => {
  return (
    <Box>
      <Stack>
        <Flex>
          <Skeleton height="100px" flex={1} mr="10px" />
          <Stack flex={3}>
            <Skeleton height="20px" />
            <Flex justifyContent="space-between" alignItems="center">
              <Skeleton height="20px">Unit price </Skeleton>
              <Skeleton height="20px">000 </Skeleton>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Skeleton height="20px">Quantity</Skeleton>
              <Skeleton height="20px">0 </Skeleton>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Skeleton height="20px">Total </Skeleton>
              <Skeleton height="20px">000 </Skeleton>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};
