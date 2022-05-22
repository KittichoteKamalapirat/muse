import React from "react";
import { HeadingLayout } from "../../components/Layout/HeadingLayout";
import { SingleFileUpload } from "../../components/SingleFileUpload";
import { XWrapper } from "../../components/Wrapper/XWrapper";
import { useMeQuery, useUpdateAvatarMutation } from "../../generated/graphql";
import { withApollo } from "../../util/withApollo";

interface AvatarProps {}

const Avatar: React.FC<AvatarProps> = ({}) => {
  const [updateAvatar] = useUpdateAvatarMutation();
  const { data: meData, loading } = useMeQuery();
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
