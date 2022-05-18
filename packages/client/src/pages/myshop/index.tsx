import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/layout";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useMediaQuery,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import LinkButton from "../../components/atoms/LinkButton";
import { Layout } from "../../components/Layout/Layout";
import { ReviewStars } from "../../components/ReviewStars";
import { Error } from "../../components/skeletons/Error";
import { Loading } from "../../components/skeletons/Loading";
import SvgBoxIcon from "../../components/svgComponents/BoxIcon";
import SvgCardIcon from "../../components/svgComponents/CardIcon";
import SvgOpenedIcon from "../../components/svgComponents/OpenedIcon";
import SvgPizzaIcon from "../../components/svgComponents/PizzaIcon";
import SvgThreeDotsIcon from "../../components/svgComponents/ThreeDotsIcon";
import SvgTruckIcon from "../../components/svgComponents/TruckIcon";
import SvgVideoIcon from "../../components/svgComponents/VideoIcon";
import { ContentWrapper } from "../../components/Wrapper/ContentWrapper";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import {
  CartItemStatus,
  useMeQuery,
  useUserOrdersQuery,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

interface MyShopProps {}

const MyShop: React.FC<MyShopProps> = ({}) => {
  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
  const [isLargerThan30Em] = useMediaQuery("(min-width: 30em)");

  // ToDeliver
  const {
    data: toDeliverData,
    loading: toDeliverLoading,
    error: toDeliverError,
  } = useUserOrdersQuery({
    variables: { status: CartItemStatus.ToDeliver },
  });

  const toDeliverNum = toDeliverData?.userOrders.length;

  // OnTheWay
  const {
    data: onTheWayData,
    loading: onTheWayLoading,
    error: onTheWayError,
  } = useUserOrdersQuery({
    variables: { status: CartItemStatus.OnTheWay },
  });

  const onTheWayNum = onTheWayData?.userOrders.length;

  if (meLoading || toDeliverLoading || onTheWayLoading) {
    return <Loading />;
  }

  if (meError || toDeliverError || onTheWayError) {
    return <Error />;
  }

  return (
    <Layout>
      <Wrapper>
        <ContentWrapper>
          <Heading fontSize="2xl">My shop</Heading>

          <Flex alignItems="center">
            <Box flex={1}>
              <Avatar
                margin="auto"
                m={2}
                size="xl"
                src={meData?.me?.avatar}
                name="creator avatar"
              />
            </Box>

            <Box flex={3} ml={2}>
              <Heading fontSize="md">{meData?.me?.username}</Heading>
              <Text>{meData?.me?.about}</Text>
              <Text>Followers: {meData?.me?.followerNum}</Text>
              <Flex alignItems="center">
                <Flex>
                  <ReviewStars
                    reviewScore={meData?.me?.userReview.reviewScore!}
                    reviewsCounter={meData?.me?.userReview.reviewCounter}
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Box mt={4}>
            <Heading fontSize="md">My orders</Heading>

            <Flex mt={4} justifyContent="space-around">
              <LinkBox>
                <NextLink
                  href={{
                    pathname: "/myshop/order",
                    query: { status: CartItemStatus.ToDeliver },
                  }}
                  passHref
                >
                  <LinkOverlay textAlign="center" flex={1}>
                    <Badge
                      isDisplayed={toDeliverNum === 0}
                      badgeContent={toDeliverNum as number}
                    >
                      <Center>
                        <SvgBoxIcon />
                      </Center>
                    </Badge>

                    <Text>To Deliver</Text>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>

              <LinkBox>
                <NextLink
                  href={{
                    pathname: "/myshop/order",
                    query: { status: CartItemStatus.OnTheWay },
                  }}
                  passHref
                >
                  <LinkOverlay textAlign="center" flex={1}>
                    <Badge
                      isDisplayed={onTheWayNum === 0}
                      badgeContent={onTheWayNum as number}
                    >
                      <Center>
                        <SvgTruckIcon fontSize="1.2rem" />
                      </Center>
                    </Badge>

                    <Text>Shipping</Text>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>

              <LinkBox>
                <NextLink
                  href={{
                    pathname: "/myshop/order",
                    query: { status: CartItemStatus.Delivered },
                  }}
                  passHref
                >
                  <LinkOverlay textAlign="center" flex={1}>
                    <Center>
                      <SvgOpenedIcon fontSize="1.2rem" />
                    </Center>

                    <Text>Complete</Text>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>

              <LinkBox>
                <NextLink
                  href={{
                    pathname: "/myshop/order",
                    query: { status: CartItemStatus.PaymentPending },
                  }}
                  passHref
                >
                  <LinkOverlay textAlign="center" flex={1}>
                    <Center>
                      <SvgThreeDotsIcon />
                    </Center>

                    <Text>Others </Text>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </Flex>
            <Divider mt={2} />

            <Box mt={2}>
              <NextLink
                href={{
                  pathname: "/myshop/order",
                  query: { status: CartItemStatus.Delivered },
                }}
                passHref
              >
                <Link>
                  <Text>Order history </Text>
                </Link>
              </NextLink>
              <Divider mt={2} />
            </Box>
          </Box>

          {/* My post section starts */}

          <Box mt={4}>
            <Heading fontSize="md">My posts</Heading>

            <Flex mt={2}>
              <LinkBox flex={1}>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  boxShadow="xs"
                  p={4}
                  m={1}
                  rounded="md"
                >
                  <SvgVideoIcon fontSize="1.5rem" />

                  <NextLink href="/myshop/posts/" as="/myshop/posts/" passHref>
                    <LinkOverlay mt={2}>Posts</LinkOverlay>
                  </NextLink>
                </Flex>
              </LinkBox>

              {/* <LinkBox flex={1}>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  boxShadow="xs"
                  p={4}
                  m={1}
                  rounded="md"
                >
                  <SvgPizzaIcon fontSize="1.5rem" />
                  <Text mt={2} fontSize="md">
                    Meal kits
                  </Text>
                </Flex>
              </LinkBox> */}
            </Flex>
          </Box>

          <Box mt={4}>
            <Heading fontSize="md">Others</Heading>

            <Flex mt={2}>
              <LinkBox flex={1}>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  boxShadow="xs"
                  p={2}
                  m={1}
                  rounded="md"
                >
                  <SvgCardIcon fontSize="1.5rem" />

                  <NextLink href="/myshop/payment-info" passHref>
                    <LinkOverlay mt={2}>Payment Info</LinkOverlay>
                  </NextLink>
                </Flex>
              </LinkBox>

              <Box flex={1}></Box>
            </Flex>
          </Box>

          {/* show create button or just link with text */}
          {isLargerThan30Em ? (
            <Box textAlign="left" mt={4}>
              <LinkButton pathname="/create-post" leftIcon={<AddIcon />}>
                Create a new video with meal kit
              </LinkButton>
            </Box>
          ) : (
            <Button
              position="fixed"
              right="2rem"
              bottom="5rem"
              bgColor="brand"
              borderRadius="50%"
              width="2rem"
              padding-top="100%"
              boxShadow="lg"
            >
              <NextLink href="/create-post" passHref>
                <Text as={Link}>
                  <SmallAddIcon color="white" fontSize="2rem" />
                </Text>
              </NextLink>
            </Button>
          )}
        </ContentWrapper>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(MyShop);
