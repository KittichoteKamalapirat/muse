import React from "react";
import { HeadingLayout } from "../../components/HeadingLayout";
import { SingleFileUpload } from "../../components/SingleFileUpload";
import { useMeQuery, useUpdateAvatarMutation } from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

interface AvatarProps {}

const Avatar: React.FC<AvatarProps> = ({}) => {
  const [updateAvatar] = useUpdateAvatarMutation();
  const { data: meData, loading } = useMeQuery();
  return (
    <HeadingLayout heading="Update my avatar">
      <SingleFileUpload
        currentUrl={meData?.me?.avatar as string}
        updateAvatar={updateAvatar}
      />
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Avatar);
