import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../util/createUrqlClient";
import NextLink from "next/link";
import { Box, IconButton, Link } from "@chakra-ui/react";

interface indexProps {}

const Account: React.FC<indexProps> = ({}) => {
  return (
    <Layout>
      Account
      <Box>
        <NextLink href="/account/address/" as="/account/address">
          <Link>ที่อยู่จัดส่ง</Link>
        </NextLink>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Account);
