import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import { DirectiveLocation } from "graphql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import {
  useAddressQuery,
  usePaymentLazyQuery,
  usePaymentQuery,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";
import { PaymentSkeleton } from "../../components/skeletons/PaymentSkeleton";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: paymentData,
    loading,
    error,
  } = usePaymentQuery({ variables: { id: parseInt(id as string) } });

  const [imgSrc, setImageSrc] = useState<string>("");

  const fetchMyAPI = async () => {
    const res = await axios(paymentData!.payment.qrUrl);
    setImageSrc(res.data);
  };

  useEffect(() => {
    if (!loading && paymentData) {
      fetchMyAPI();
    }
  }, [paymentData?.payment.qrUrl]);

  //has to be here condition would change the order of useEffect!!!!!!!!!
  if (loading) {
    return (
      <Wrapper>
        <PaymentSkeleton />
      </Wrapper>
    );
  }

  return (
    <HeadingLayout heading="Payment Detail">
      <Box mb={20}>
        <Wrapper>
          <Flex justifyContent="space-between">
            <Text>Total amount</Text>
            <Text>{paymentData?.payment.amount}</Text>
          </Flex>
          <Divider mt={2} />
          <Box mt={5}>
            <Text>Siam Commercial bangk (SCB)</Text>
            <Text>Account name: Kittichote Kamalapirat</Text>
            <Box>
              <Text fontSize="sm" d="inline">
                Account number
              </Text>{" "}
              <Text
                fontSize="xl"
                fontWeight="500"
                d="inline"
                color={primaryColor}
              >
                096 148 9047
              </Text>
            </Box>
          </Box>
          <Divider mt={2} />

          <Box width="80%" mx="auto" textAlign="center" my={5}>
            <Text>Scan the QR code</Text>
            <Image src={imgSrc} alt="paymentqr" />
          </Box>
        </Wrapper>

        <Flex
          zIndex={1}
          position="fixed"
          bottom={0}
          bg={"white"}
          p={2}
          ml={"auto"}
          align="center"
          width="100%"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Box ml="auto">
            <Text d="inline">Amount: </Text>
            <Heading
              fontSize="lg"
              fontWeight={400}
              color={primaryColor}
              d="inline"
            >
              {paymentData?.payment.amount}
            </Heading>
          </Box>

          <Button width="100%" bgColor={primaryColor} color="white">
            Upload slip
          </Button>
        </Flex>
      </Box>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Payment);
