import { Image } from "@chakra-ui/image";
import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../components/HeadingLayout";
import { useCreateScbQrQuery } from "../generated/graphql";
import { withApollo } from "../util/withApollo";
// import qrcode from "qrcode";
import axios from "axios";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  const { data: qrData, loading: qrLoading } = useCreateScbQrQuery({
    variables: {
      amount: 10,
    },
  });

  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    console.log("hi");
    async function fetchMyAPI() {
      console.log("hi3");
      const res = await axios(
        "https://cookknow.s3.amazonaws.com/5619ffb2-6ce2-42cf-bd5c-042f2685a045/1635783112096"
      );
      console.log("hi2");
      console.log(res);
      const url = await res.data;
      setUrl(url);
    }
    fetchMyAPI();
  }, []);

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
      <Image
        // src={qrData?.createScbQr.data.qrRawData}
        src={url}
        alt="paymentqr"
      />{" "}
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Payment);
