import {
  Box,
  Divider,
  Heading,
  Link,
  Image,
  Flex,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { AccountIcon } from "../../components/Icons/AccountIcon";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper";
import { withApollo } from "../../util/withApollo";
import NextLink from "next/link";
import {
  OrderStatus,
  useFollowersQuery,
  useMeQuery,
} from "../../generated/graphql";
import { Center } from "@chakra-ui/layout";
import {
  PlusSquareIcon,
  SmallAddIcon,
  SpinnerIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { inActiveGray, primaryColor } from "../../components/Variables";

interface MyShopProps {}

const MyShop: React.FC<MyShopProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();

  return (
    <Layout>
      <Wrapper>
        <Heading my={8}>My shop</Heading>

        <Flex alignItems="center">
          <Box flex={1}>
            <Avatar
              margin="auto"
              m={2}
              size="xl"
              src={meData?.me?.avatar}
              alt="creator avatar"
            />
          </Box>

          <Box flex={3} ml={2}>
            <Heading fontSize="md">{meData?.me?.username}</Heading>
            <Text>{meData?.me?.about}</Text>
            <Text>Followers: {meData?.me?.followerNum}</Text>
            <Flex alignItems="center">
              <Flex>
                <StarIcon color={primaryColor} />
                <StarIcon color={primaryColor} />
                <StarIcon color={primaryColor} />
                <StarIcon color="white" stroke={inActiveGray} strokeWidth={2} />
                <StarIcon color="white" stroke={inActiveGray} strokeWidth={2} />
              </Flex>
              <Text ml={1}>3.0</Text>
              <Text fontSize="sm" ml={1} color={inActiveGray}>
                (999 reviews)
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Box mt={4}>
          <Heading fontSize="md">My orders</Heading>

          <Flex mt={4}>
            <NextLink
              href={{
                pathname: "/myshop/order",
                query: { status: OrderStatus.ToDeliver },
              }}
            >
              <Link textAlign="center" flex={1}>
                <SpinnerIcon />
                <Text>To deliver</Text>
              </Link>
            </NextLink>

            <NextLink
              href={{
                pathname: "/myshop/order",
                query: { status: OrderStatus.OnDelivery },
              }}
            >
              <Link textAlign="center" flex={1}>
                <SpinnerIcon />
                <Text>Shipping</Text>
              </Link>
            </NextLink>

            <NextLink
              href={{
                pathname: "/myshop/order",
                query: { status: OrderStatus.PaymentPending },
              }}
            >
              <Link textAlign="center" flex={1}>
                <Text>... </Text>
                <Text>Others </Text>
              </Link>
            </NextLink>
          </Flex>
          <Divider mt={2} />

          <Box mt={2}>
            <NextLink
              href={{
                pathname: "/myshop/order",
                query: { status: OrderStatus.Delivered },
              }}
            >
              <Link>
                <Text>Order history </Text>
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>
        </Box>

        <Box mt={4}>
          <Heading fontSize="md">My products</Heading>
          <Box textAlign="left" mt={4}>
            <Box mt={2}>
              <NextLink href="/create-post">
                <Text as={Link}>
                  <PlusSquareIcon mr={2} fontSize="lg" color={primaryColor} />
                  Create new video with mealkits
                </Text>
              </NextLink>
              <Divider mt={2} />
            </Box>
          </Box>

          <Box mt={2}>
            <NextLink href="/myshop/posts/" as="/myshop/posts/">
              <Link>
                {/* <AccountIcon /> */}
                My posts and products
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>
        </Box>

        <Box mt={4}>
          <Heading fontSize="md">Others</Heading>

          <Box mt={2}>
            <NextLink href="/myshop/payment-info">
              <Link>
                {/* <HeartIcon isactive={false} mr={2} /> */}
                Payment Info
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(MyShop);
