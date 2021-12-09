import React from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { MainNav } from "../../components/MainNav";
import { withApollo } from "../../util/withApollo";

interface MealkitProps {}

const Mealkit: React.FC<MealkitProps> = ({}) => {
  return (
    <>
      <HeadingLayout heading="mealkit"></HeadingLayout>

      <MainNav />
    </>
  );
};

export default withApollo({ ssr: false })(Mealkit);
