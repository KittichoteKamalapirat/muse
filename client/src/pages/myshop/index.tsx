import {
  Box,
  Divider,
  Heading,
  Link,
  Image,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { AccountIcon } from "../../components/Icons/AccountIcon";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper";
import { withApollo } from "../../util/withApollo";
import NextLink from "next/link";
import { OrderStatus, useMeQuery } from "../../generated/graphql";
import { SmallAddIcon, SpinnerIcon, StarIcon } from "@chakra-ui/icons";
import { inActiveGray, primaryColor } from "../../components/Variables";

interface MyShopProps {}

const MyShop: React.FC<MyShopProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();
  return (
    <Layout>
      <Wrapper>
        <Heading>My shop</Heading>

        <Flex>
          <Box flex={1}>
            {" "}
            <Image
              margin="auto"
              borderRadius="50%"
              border={5}
              borderStyle="solid"
              borderColor="red.400"
              src={meData?.me?.avatar}
              alt="Segun Adebayo"
            />
          </Box>

          <Box flex={3} ml={2}>
            <Heading fontSize="md">{meData?.me?.username}</Heading>
            <Text>Shop Short Description</Text>
            <Text>Follower: xxx</Text>
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
              // href="/myshop/order"
              href={{
                pathname: "/myshop/order",
                query: { status: OrderStatus.ToDeliver },
              }}
            >
              <Link textAlign="center">
                <SpinnerIcon />
                <Text>To deliver</Text>
              </Link>
            </NextLink>
            <Box flex={1}>
              <Box textAlign="center">
                <SpinnerIcon />
                <Text>Delivering</Text>
              </Box>
            </Box>

            <Box flex={1}>
              <Box textAlign="center">
                <SpinnerIcon />
                <Text>Complete</Text>
              </Box>
            </Box>

            <Box flex={1}>
              <Box textAlign="center">
                <Text>...</Text>
                <Text>Others</Text>
              </Box>
            </Box>
          </Flex>
          <Divider mt={2} />

          <Box mt={2}>
            <NextLink href="/" as="/">
              <Link>
                {/* <AccountIcon /> */}
                Order History
              </Link>
            </NextLink>
            <Divider mt={2} />
          </Box>
        </Box>

        <Box mt={4}>
          <Heading fontSize="md">My products</Heading>
          <Box textAlign="left" mt={4}>
            <Box mt={2}>
              <NextLink href="/myshop/posts/" as="/myshop/posts/">
                <Link>
                  {/* <AccountIcon /> */}
                  My posts and products
                </Link>
              </NextLink>
              <Divider mt={2} />
            </Box>

            <Box mt={2}>
              <NextLink href="/create-post">
                <Text as={Link}>
                  {/* <SmallAddIcon />  */}
                  Create new post with mealkits
                </Text>
              </NextLink>
              <Divider mt={2} />
            </Box>
          </Box>
        </Box>

        <Box mt={4}>
          <Heading fontSize="md">Others</Heading>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(MyShop);
