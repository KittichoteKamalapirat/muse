import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import { DirectiveLocation } from "graphql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import {
  useAddressQuery,
  useManuallyConfirmPaymentLazyQuery,
  usePaymentLazyQuery,
  usePaymentQuery,
  useUploadSlipMutation,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";
import { PaymentSkeleton } from "../../components/skeletons/PaymentSkeleton";
import { isServer } from "../../util/isServer";
import { SingleFileUpload } from "../../components/SingleFileUpload";
import { UnAuthorized } from "../../components/UnAuthorized";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  // native hooks
  const [imgSrc, setImageSrc] = useState<string>("");

  // apollo hooks
  const [uploadSlip] = useUploadSlipMutation();
  const [manuallyConfirmPayment, { data: isPaid, loading: isPaidLoading }] =
    useManuallyConfirmPaymentLazyQuery();
  const {
    data: paymentData,
    loading,
    error,
  } = usePaymentQuery({ variables: { id: parseInt(id as string) } });
  console.log({ id });
  console.log({ paymentData });

  //functions
  const fetchMyAPI = async () => {
    const res = await axios(paymentData!.payment.qrUrl);
    setImageSrc(res.data);
  };

  const paymentSuccess = (status: boolean): string => {
    if (status) {
      return "payment successful";
    } else {
      return "the payment failed";
    }
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
  } else if (!paymentData) {
    return <UnAuthorized />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <HeadingLayout
      heading="Payment Detail"
      backUrl="/order?status=PaymentPending"
    >
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

          {/* <Button width="100%" bgColor={primaryColor} color="white">
            Upload slip
          </Button> */}
        </Flex>
      </Box>

      <SingleFileUpload
        params={id as string}
        currentUrl={paymentData?.payment.slipUrl as string}
        uploadSlip={uploadSlip}
        manuallyConfirmPayment={manuallyConfirmPayment}
        isPaid={isPaid?.manuallyConfirmPayment}
        paymentId={id}
        // isPaidLoading={isPaidLoading}
      />
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Payment);
