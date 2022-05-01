import { Heading } from "@chakra-ui/react";
import { Layout } from "../../../../components/Layout/Layout";
import { withApollo } from "../../../../util/withApollo";

interface Props {}

const OrderCartItemDetail = ({}: Props) => {
  return <Heading> asdfasdfHello </Heading>;
};

export default withApollo({ ssr: false })(OrderCartItemDetail);
