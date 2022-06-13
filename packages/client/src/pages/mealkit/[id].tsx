import React from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { MainNav } from "../../components/MainNav";
import { withApollo } from "../../util/withApollo";

const Mealkit = () => {
  return (
    <>
      <HeadingLayout heading="mealkit"></HeadingLayout>
      {/*  TODO */}

      <MainNav />
    </>
  );
};

export default withApollo({ ssr: false })(Mealkit);
