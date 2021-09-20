import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../util/createUrqlClient";

interface EditAccountInfoProps {}

const EditAccountInfo: React.FC<EditAccountInfoProps> = ({}) => {
  return <Layout>Edit acccount</Layout>;
};

export default withUrqlClient(createUrqlClient)(EditAccountInfo);
