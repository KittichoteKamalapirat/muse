import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export const LikeSkeleton = () => {
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
