import React from "react";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import { Box, IconButton, Image, Link } from "@chakra-ui/react";
import { withApollo } from "../../util/withApollo";
import { useMeQuery } from "../../generated/graphql";

interface indexProps {}

const Account: React.FC<indexProps> = ({}) => {
  const { data: meData, loading } = useMeQuery();

  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }
  return (
    <Layout>
      Account
      <Box>
        <Box boxSize="sm">
          {" "}
          <Image
            borderRadius="50%"
            src={meData?.me?.avatar}
            alt="Segun Adebayo"
          />{" "}
        </Box>
        <NextLink href="/account/address/" as="/account/address">
          <Link>ที่อยู่จัดส่ง</Link>
        </NextLink>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Account);
