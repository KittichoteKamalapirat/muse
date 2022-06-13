import { Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { useRouter } from "next/router";
import React from "react";
import LinkButton from "../../../components/atoms/LinkButton";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { ContentWrapper } from "../../../components/Wrapper/ContentWrapper";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { useTrackingQuery } from "../../../generated/graphql";
import { withApollo } from "../../../util/withApollo";

const Tracking = () => {
  const router = useRouter();
  const { id } = router.query; // trackingId

  const {
    data: trackingData,
    loading: trackingLoading,
    error: trackingError,
  } = useTrackingQuery({ variables: { id: parseInt(id as string) } });

  console.log({ trackingData });
  console.log({ trackingError });

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
    <HeadingLayout
      heading="Track my order"
      // if previous was create tracking -> back to /myshop/order (don't want create again!)
      // if previous was /order -> default
      backUrl={router.query.next as string}
    >
      <Wrapper>
        <ContentWrapper>
          <Box flex={3}>
            <Text
              color={trackingData?.tracking.color as string}
              fontWeight="bold"
            >
              {trackingData?.tracking.courier}
            </Text>
            <Text>Tracking Number: {trackingData?.tracking.trackingNo}</Text>
          </Box>

          {/* <Text>Status: {trackingData?.tracking.status === 'OnTheWay'}</Text> */}

          {trackingData?.tracking.isFound ? (
            <>
              {" "}
              <Box my={4}>
                <Text fontWeight="bold">Detail</Text>
                {trackingData.tracking.timelines?.map((byDate, index) => (
                  <Box my={2} key={index}>
                    <Box>
                      {byDate.details.map((detail, subindex) => (
                        <Flex
                          color={
                            index === 0 && subindex == 0 ? "brand" : "none"
                          }
                          fontWeight={
                            index === 0 && subindex == 0 ? "bold" : "none"
                          }
                          key={subindex}
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
                {trackingData?.tracking.cartItems.map((cartItem, index) => (
                  <Flex alignItems="center" m={1} key={index}>
                    <Img
                      src={cartItem.mealkit.thumbnail.url}
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
            </>
          ) : (
            <Box mt={6}>
              <Heading as="h1" size="md">
                There is no information on this tracking number
              </Heading>

              <Box>
                <Text as="h1" size="md" my={3} fontWeight="bold">
                  This could happen by the following reasons.
                </Text>
                <UnorderedList>
                  <ListItem>
                    The courier did not pick up the parcel yet. Please contact
                    your local post office or wait.
                  </ListItem>
                  <ListItem>
                    The tracking number is wrong. Please recheck.
                  </ListItem>
                </UnorderedList>
              </Box>

              <LinkButton pathname="/">Back to home</LinkButton>
            </Box>
          )}
        </ContentWrapper>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Tracking);
