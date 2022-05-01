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
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Button from "../../components/atoms/Button";
import LinkButton from "../../components/atoms/LinkButton";
import { Layout } from "../../components/Layout/Layout";
import { ReviewStars } from "../../components/ReviewStars";
import SvgBoxIcon from "../../components/svgComponents/BoxIcon";
import SvgCardIcon from "../../components/svgComponents/CardIcon";
import SvgOpenedIcon from "../../components/svgComponents/OpenedIcon";
import SvgPizzaIcon from "../../components/svgComponents/PizzaIcon";
import SvgThreeDotsIcon from "../../components/svgComponents/ThreeDotsIcon";
import SvgTruckIcon from "../../components/svgComponents/TruckIcon";
import SvgVideoIcon from "../../components/svgComponents/VideoIcon";
import { ContentWrapper } from "../../components/Wrapper/ContentWrapper";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { CartItemStatus, useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

interface MyShopProps {}

const MyShop: React.FC<MyShopProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const [isLargerThan30Em] = useMediaQuery("(min-width: 30em)");

  if (meLoading) {
    return <Text>loading</Text>;
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

            <Flex mt={4}>
              <NextLink
                href={{
                  pathname: "/myshop/order",
                  query: { status: CartItemStatus.ToDeliver },
                }}
                passHref
              >
                <Link textAlign="center" flex={1}>
                  <Center>
                    <SvgBoxIcon />
                  </Center>

                  <Text>To Deliver</Text>
                </Link>
              </NextLink>

              <NextLink
                href={{
                  pathname: "/myshop/order",
                  query: { status: CartItemStatus.OnTheWay },
                }}
                passHref
              >
                <Link textAlign="center" flex={1}>
                  <Center>
                    <SvgTruckIcon fontSize="1.2rem" />
                  </Center>

                  <Text>Shipping</Text>
                </Link>
              </NextLink>

              <NextLink
                href={{
                  pathname: "/myshop/order",
                  query: { status: CartItemStatus.Delivered },
                }}
                passHref
              >
                <Link textAlign="center" flex={1}>
                  <Center>
                    <SvgOpenedIcon fontSize="1.2rem" />
                  </Center>

                  <Text>Complete</Text>
                </Link>
              </NextLink>

              <NextLink
                href={{
                  pathname: "/myshop/order",
                  query: { status: CartItemStatus.PaymentPending },
                }}
                passHref
              >
                <Link textAlign="center" flex={1}>
                  <Center>
                    <SvgThreeDotsIcon />
                  </Center>

                  <Text>Others </Text>
                </Link>
              </NextLink>
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
              <Flex
                flex={1}
                flexDirection="column"
                alignItems="center"
                boxShadow="xs"
                p={4}
                m={1}
                rounded="md"
              >
                <SvgVideoIcon fontSize="1.5rem" />

                <NextLink href="/myshop/posts/" as="/myshop/posts/" passHref>
                  <Link mt={2}>Posts</Link>
                </NextLink>
              </Flex>

              <Flex
                flex={1}
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
              {/* <Box flex={1}></Box> */}
            </Flex>
          </Box>

          {/* My post section ends*/}

          {/* otherssection starts */}

          <Box mt={4}>
            <Heading fontSize="md">Others</Heading>

            <Flex mt={2}>
              <Flex
                flex={1}
                flexDirection="column"
                alignItems="center"
                boxShadow="xs"
                p={2}
                m={1}
                rounded="md"
              >
                <SvgCardIcon fontSize="1.5rem" />

                <NextLink href="/myshop/payment-info" passHref>
                  <Link mt={2}>Payment Info</Link>
                </NextLink>
              </Flex>

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
