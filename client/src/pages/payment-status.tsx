import { useRouter } from "next/router";
import React from "react";
import { withApollo } from "../util/withApollo";
import { HeadingLayout } from "../components/HeadingLayout";
import NextLink from "next/link";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { CartItemStatus } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import SvgSuccess from "../components/svgComponents/Success";
import SvgFail from "../components/svgComponents/Fail";

interface PaymentStatusProps {}

const PaymentStatus: React.FC<PaymentStatusProps> = ({}) => {
  const router = useRouter();
  const { status } = router.query;
  console.log(status);

  let body = null;
  if (status === "success") {
    body = (
      <Box>
        <Heading>Payment Successful</Heading>
        <Text>Sellers will prepare your package shortly</Text>
        <Center m={4}>
          <SvgSuccess fontSize="5rem" />
        </Center>

        <Box>
          <Text d="inline">See your order </Text>
          <NextLink
            href={{
              pathname: "/order",
              query: { status: CartItemStatus.ToDeliver },
            }}
          >
            <Link d="inline" color="brand" fontWeight="bold">
              HERE
            </Link>
          </NextLink>
        </Box>
      </Box>
    );
  } else {
    body = (
      <Box>
        <Heading>Payment Failed</Heading>
        <Text>Please check your payment again</Text>
        <Center m={4}>
          <SvgFail fontSize="5rem" />
        </Center>
        <Box>
          <Text
            onClick={() => router.back()}
            d="inline"
            as="button"
            color="brand"
            fontWeight="bold"
          >
            Back
          </Text>{" "}
          <Text d="inline">to payment page </Text>
        </Box>
        <Text d="inline">
          If you are certain that you have completed the payment, please contact
        </Text>{" "}
        <NextLink href="/customer-support">
          <Link d="inline" color="brand" fontWeight="bold">
            HERE
          </Link>
        </NextLink>
      </Box>
    );
  }

  return (
    <HeadingLayout
      heading={status === "success" ? "Payment Sucess" : "Payment Fail"}
      back={false}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        height="80vh"
      >
        {body}
      </Flex>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(PaymentStatus);
