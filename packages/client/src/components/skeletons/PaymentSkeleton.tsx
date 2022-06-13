import { Box, Center, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { XWrapper } from "../Wrapper/XWrapper";

export const PaymentSkeleton = () => {
  return (
    <XWrapper>
      <Box>
        <Stack>
          <Flex justifyContent="space-between" alignItems="center">
            <Skeleton height="20px">Total amount </Skeleton>
            <Skeleton height="20px">0000 </Skeleton>
          </Flex>
          <Stack>
            <Skeleton height="20px">Bank Name (Bank Code) </Skeleton>
            <Skeleton height="15px">Account Name: John Doe </Skeleton>
            <Skeleton height="15px">Account Number: 000 000 000 </Skeleton>
          </Stack>

          <Center>
            <Skeleton height="15px">Scan QR code </Skeleton>
          </Center>
          <Skeleton height="300px" />
        </Stack>
      </Box>
    </XWrapper>
  );
};
