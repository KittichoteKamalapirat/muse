import { Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useRouter } from "next/router";
import React from "react";
import { HeadingLayout } from "../../../components/HeadingLayout";
import { primaryColor } from "../../../components/Variables";
import { Wrapper } from "../../../components/Wrapper";
import { useTrackingQuery } from "../../../generated/graphql";
import { withApollo } from "../../../util/withApollo";

interface TrackingProps {}

const Tracking: React.FC<TrackingProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: trackingData,
    loading: trackingLoading,
    error: trackingError,
  } = useTrackingQuery({ variables: { id: parseInt(id as string) } });

  if (trackingLoading) {
    return (
      <Box>
        <HeadingLayout heading="Track my order">
          <Wrapper>
            <Stack>
              <Skeleton height="15px" />
              <Skeleton height="15px" />
              <Skeleton height="15px" />
            </Stack>
          </Wrapper>
        </HeadingLayout>
      </Box>
    );
  }
  return (
    <HeadingLayout heading="Track my order">
      <Wrapper>
        <Flex></Flex>
        <Box flex={3}>
          <Text color={trackingData?.tracking.color} fontWeight="bold">
            {" "}
            {trackingData?.tracking.courier}
          </Text>
          <Text>Tracking Number: {trackingData?.tracking.trackingNo}</Text>
        </Box>

        {/* <Text>Status: {trackingData?.tracking.status === 'onDelivery'}</Text> */}

        <Box my={4}>
          <Text fontWeight="bold">Detail</Text>
          {trackingData?.tracking.timelines.map((byDate, index) => (
            <Box my={2}>
              <Box>
                {byDate.details.map((detail, subindex) => (
                  <Flex
                    color={index === 0 && subindex == 0 ? "teal.400" : "none"}
                    fontWeight={index === 0 && subindex == 0 ? "bold" : "none"}
                  >
                    <Text mr={2}>{detail.time}</Text>
                    <Text>{detail.description.substr(5)}</Text>
                  </Flex>
                ))}

                <Text fontSize="sm" color="gray.400">
                  {byDate.date}
                </Text>
              </Box>
              <Divider my={2} />
            </Box>
          ))}
        </Box>

        <Box>
          <Heading fontSize="md">Products</Heading>
          {trackingData?.tracking.cartItems.map((cartItem) => (
            <Flex alignItems="center" m={1}>
              <Img
                src={
                  cartItem.mealkit?.images ? cartItem.mealkit?.images[0] : ""
                }
                flex={1}
                width="10%"
                mr={2}
              />
              <Box flex={3}>
                <Text>{cartItem.mealkit?.name}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Tracking);
