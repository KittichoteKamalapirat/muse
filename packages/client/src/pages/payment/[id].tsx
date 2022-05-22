import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import LinkButton from "../../components/atoms/LinkButton";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { Layout } from "../../components/Layout/Layout";
import { SingleFileUpload } from "../../components/SingleFileUpload";
import { Error } from "../../components/skeletons/Error";
import { PaymentSkeleton } from "../../components/skeletons/PaymentSkeleton";
import { UnAuthorized } from "../../components/UnAuthorized";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import {
  CartItemStatus,
  useManuallyConfirmPaymentLazyQuery,
  usePaymentQuery,
  useUploadSlipMutation,
} from "../../generated/graphql";
import { urlResolver } from "../../lib/UrlResolver";
import useFetch from "../../util/useFetch";
import { withApollo } from "../../util/withApollo";

const STARTING_MINUTES = 3;

const Payment = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const cartItemStatusUrl = urlResolver.paymentStatusAPI(id as string);

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

  const { data: paymentIsComplete, loading: paymentIsCompleteLoading } =
    useFetch(cartItemStatusUrl);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (seconds > 0) {
        setSeconds(seconds - 1);
        if (paymentIsComplete) {
          // TODO change this ?
          router.push(urlResolver.orderTab(CartItemStatus.ToDeliver)); //TODO push to success page
          setSeconds(0); //To fix error Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        }
      } else {
        router.push(urlResolver.orderTab(CartItemStatus.PaymentPending));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }; //This is important
  }, [seconds, paymentIsComplete, router]);

  //has to be here condition would change the order of useEffect!!!!!!!!!
  if (
    loading ||
    //  paymentIsCompleteLoading ||
    qrSrcLoading
  ) {
    return (
      <Wrapper>
        <PaymentSkeleton />
      </Wrapper>
    );
  } else if (!paymentData) {
    return <UnAuthorized />;
  }

  if (error) {
    <Layout heading="error">
      {" "}
      <Error />
    </Layout>;
  }

  return (
    <HeadingLayout
      heading="Payment Detail"
      backUrl="/order?status=PaymentPending"
    >
      <Box mt={12} mb={20}>
        <Wrapper>
          <Box>
            <Text>Siam Commercial bank (SCB)</Text>
            <Text>Account name: Kittichote Kamalapirat</Text>
            <Box>
              <Text d="inline">Account number:</Text>{" "}
              <Text fontSize="xl" fontWeight="700" d="inline" color="#0F3E68">
                096 148 9047
              </Text>
            </Box>
          </Box>
          <Divider mt={2} />

          <Flex justifyContent="space-between" textAlign="center" color="alert">
            <Heading as="h3" size="sm">
              QR Code expired in:
            </Heading>
            <Heading as="h3" size="md">
              {timerMinutes}: {timerSeconds}
            </Heading>
          </Flex>

          <Box>
            <Image
              src="/promptpayBanner.png"
              width="100%"
              style={{ margin: "auto" }}
              alt="promptpayBanner"
            />
            <Image src={qrSrc} alt="paymentqr" width="80%" mx="auto" />
          </Box>

          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Heading as="h3" size="sm">
              Total amount
            </Heading>
            <Flex alignItems="center">
              <Heading size="lg">฿</Heading>
              <Heading as="h2" size="xl">
                {paymentData?.payment.amount.toLocaleString()}
              </Heading>
            </Flex>
          </Flex>

          <SingleFileUpload
            params={id as string}
            currentUrl={paymentData?.payment.slipUrl as string}
            uploadSlip={uploadSlip}
            manuallyConfirmPayment={manuallyConfirmPayment}
            isPaid={isPaid?.manuallyConfirmPayment}
            paymentId={id}
          />

          <LinkButton
            href={urlResolver.orderTab(CartItemStatus.PaymentPending)}
          >
            Back to my orders
          </LinkButton>
        </Wrapper>
      </Box>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Payment);
