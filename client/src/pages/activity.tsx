import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../util/withApollo";
interface ActivityProps {}

const Activity: React.FC<ActivityProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();

  if (!meData?.me) {
    router.push("/");
  }

  return (
    <Layout>
      <Wrapper>
        <h1>My Activity</h1>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Activity);
