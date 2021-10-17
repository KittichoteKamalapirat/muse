import { Image } from "@chakra-ui/image";
import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { HeadingLayout } from "../components/HeadingLayout";
import { useCreateScbQrQuery } from "../generated/graphql";
import { withApollo } from "../util/withApollo";
// import qrcode from "qrcode";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  const { data: qrData, loading: qrLoading } = useCreateScbQrQuery({
    variables: {
      amount: 10,
    },
  });

  return (
    <HeadingLayout heading="payment">
      {qrLoading ? null : (
        <Box>
          <Heading>hi</Heading>
          <Image
            // src={qrData?.createScbQr.data.qrRawData}
            src={`data:image/png;base64, ${qrData?.createScbQr.data.qrImage}`}
            alt="paymentqr"
            fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
          />
        </Box>
      )}
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Payment);
