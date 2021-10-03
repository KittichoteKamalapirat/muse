import React from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { withApollo } from "../util/withApollo";
interface ActivityProps {}

const Activity: React.FC<ActivityProps> = ({}) => {
  return (
    <Layout>
      <Wrapper>
        <h1>My Activity</h1>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Activity);
