import React from "react";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Flex,
  Img,
  Center,
} from "@chakra-ui/react";
import { Wrapper } from "../Wrapper";

interface PaymentSkeletonProps {}

export const PaymentSkeleton: React.FC<PaymentSkeletonProps> = ({}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
