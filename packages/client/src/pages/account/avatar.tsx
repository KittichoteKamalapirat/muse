import React from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { Layout } from "../../components/Layout/Layout";
import { SingleFileUpload } from "../../components/SingleFileUpload";
import { Error } from "../../components/skeletons/Error";
import { Loading } from "../../components/skeletons/Loading";
import { XWrapper } from "../../components/Wrapper/XWrapper";
import { useMeQuery, useUpdateAvatarMutation } from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

const Avatar = () => {
  const [updateAvatar] = useUpdateAvatarMutation();
  const { data: meData, loading, error } = useMeQuery();

  if (loading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout heading="error">
        <Error text={error.message} />
      </Layout>
    );
  }

  return (
    <HeadingLayout heading="Update my avatar">
      <XWrapper>
        <SingleFileUpload
          currentUrl={meData?.me?.avatar as string}
          updateAvatar={updateAvatar}
        />
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Avatar);
