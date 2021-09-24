import React from "react";
import { Layout } from "../../../components/Layout";
import {
  useAddressQuery,
  useDeleteAddressMutation,
  useMeQuery,
} from "../../../generated/graphql";
import NextLink from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link, Text } from "@chakra-ui/react";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";

interface addressProps {}

const Address: React.FC<addressProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useAddressQuery();
  const { data: meData } = useMeQuery();
  const [deleteAddress] = useDeleteAddressMutation();

  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }
  const noAddress = (
    <Layout>
      <Text>You have not added yoru address yet</Text>
      <NextLink href="/account/address/create" as="/account/address/create">
        <Link>Add address</Link>
      </NextLink>
    </Layout>
  );
  return !data ? (
    noAddress
  ) : (
    <Layout>
      <h1>ที่อยู่จัดส่ง</h1>
      <Box>
        <Text>
          {data?.address.line1} {data?.address.line2}{" "}
          {data?.address.subdistrict} {data?.address.district}{" "}
          <Text>
            {" "}
            {data?.address.province} {data?.address.country}{" "}
            {data?.address.postcode}
          </Text>
        </Text>
      </Box>

      {!meData?.me ? null : (
        <Box>
          <Text>แก้ไขที่อยู่</Text>
          <NextLink href="/account/address/edit/" as="/account/address/edit/">
            <IconButton
              as={Link}
              aria-label="Edit post"
              icon={<EditIcon />}
            ></IconButton>
          </NextLink>

          <IconButton
            aria-label="Delete post"
            icon={<DeleteIcon />}
            onClick={() =>
              deleteAddress({ variables: { id: data.address.id } })
            }
          ></IconButton>
        </Box>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Address);
