import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { SingleFileUpload } from "../../components/SingleFileUpload";
import { PaymentSkeleton } from "../../components/skeletons/PaymentSkeleton";
import { UnAuthorized } from "../../components/UnAuthorized";
import { primaryColor } from "../../components/Variables";
import { Wrapper } from "../../components/Wrapper";
import {
  useManuallyConfirmPaymentLazyQuery,
  usePaymentQuery,
  useUploadSlipMutation,
} from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";
import useFetch from "../../utils/useFetch";

interface PaymentProps {}

const STARTING_MINUTES = 3;

const Payment: React.FC<PaymentProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const cartItemStatusUrl = `http://localhost:4000/api/payment/status/${id}`; //TODO

  // native hooks
  const [seconds, setSeconds] = useState<number>(STARTING_MINUTES * 60);

  //for display purpose
  const timerMinutes = useMemo(() => {
    return Math.floor(seconds / 60);
  }, [seconds]);

  //for display purpose
  const timerSeconds = useMemo(() => {
    const secondPosition = seconds % 60;
    return secondPosition < 10 ? "0" + secondPosition : secondPosition;
  }, [seconds]);
  [];

  // apollo hooks
  const [uploadSlip] = useUploadSlipMutation();
  const [manuallyConfirmPayment, { data: isPaid, loading: isPaidLoading }] =
    useManuallyConfirmPaymentLazyQuery();
  const {
    data: paymentData,
    loading,
    error,
  } = usePaymentQuery({ variables: { id: parseInt(id as string) } });

  //functions
  const { data: qrSrc, loading: qrSrcLoading } = useFetch(
    paymentData?.payment.qrUrl as string //s3 url
  );

  // const { data: status, loading: statusLoading } = useFetch(cartItemStatusUrl);
  const { data: paymentIsComplete, loading: paymentIsCompleteLoading } =
    useFetch(cartItemStatusUrl);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (seconds > 0) {
        setSeconds(seconds - 1);
        if (paymentIsComplete) {
          // TODO change this ?
          router.push("/order?status=PaymentPending"); //TODO push to success page
          setSeconds(0); //To fix error Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }; //This is important
  }, [seconds]);

  //has to be here condition would change the order of useEffect!!!!!!!!!
  if (loading || paymentIsCompleteLoading || qrSrcLoading) {
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
            <Image src={qrSrc} alt="paymentqr" />
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

      <Heading>
        {timerMinutes}: {timerSeconds}
      </Heading>

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
