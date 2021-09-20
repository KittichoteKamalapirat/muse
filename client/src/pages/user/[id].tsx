import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { useAccountInfoQuery, useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../util/createUrqlClient";
import NextLink from "next/link";

interface AccountInfoProps {}

const AccountInfo: React.FC<AccountInfoProps> = ({}) => {
  const [{ data, fetching }] = useAccountInfoQuery();

  const [{ data: meData }] = useMeQuery();

  if (fetching) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }

  if (!data?.accountInfo) {
    //finish downloading, cannot finda post( like wrong id)
    return (
      <Layout>
        <div>could not get your information</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box mx={4}>
        <Box boxSize="sm">
          <Image src={data.accountInfo.avatarUrl} alt="image" />
        </Box>
        <Flex justifyContent="space-between">
          <Text>Address</Text>
          <Text>{data.accountInfo.address}</Text>
        </Flex>
        <Divider />

        <Flex justifyContent="space-between">
          <Text>Mobile Number</Text>
          <Text>{data.accountInfo.mobileNumber}</Text>
        </Flex>

        {meData?.me?.id !== data.accountInfo.userId ? null : (
          <NextLink href="/user/edit/[id]" as={`/user/edit/${meData?.me?.id}`}>
            <IconButton
              as={Link}
              aria-label="Edit post"
              icon={<EditIcon />}
            ></IconButton>
          </NextLink>
        )}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(AccountInfo); //want good SEO
