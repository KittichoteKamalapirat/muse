import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LinkButton from "../../../components/atoms/LinkButton";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";
import { primaryColor } from "../../../components/Variables";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import {
  useAddressQuery,
  useDeleteAddressMutation,
  useMeQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";

interface addressProps {}

const Address: React.FC<addressProps> = ({}) => {
  useIsAuth();
  const { data, loading } = useAddressQuery();
  const { data: meData } = useMeQuery();
  const [deleteAddress] = useDeleteAddressMutation();

  const router = useRouter();

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  const noAddress = (
    <Flex justifyContent="center" alignItems="center" minH="600px">
      <Flex direction="column" alignItems="center">
        <Heading size="h2" m={5}>
          You have not added your address yet
        </Heading>

        <LinkButton pathname="/account/address/create" leftIcon={<AddIcon />}>
          Add address
        </LinkButton>
      </Flex>
    </Flex>
  );
  return (
    <HeadingLayout heading="ที่อยู่จัดส่ง">
      {!data ? (
        <Wrapper>{noAddress}</Wrapper>
      ) : (
        <Wrapper>
          <Box>
            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>Name</Box>
                <Box flex={3}>{data?.address.name}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>Phone no.</Box>
                <Box flex={3}>{data?.address.phonenumber}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>ที่อยู่ 1</Box>
                <Box flex={3}>{data?.address.line1}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>ที่อยู่ 2</Box>
                <Box flex={3}>{data?.address.line2}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>แขวง</Box>
                <Box flex={1}>{data?.address.subdistrict}</Box>

                <Box flex={1}>เขต</Box>
                <Box flex={1}>{data?.address.district}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>จังหวัด</Box>
                <Box flex={1}>{data?.address.province}</Box>
                <Box flex={1}>ประเทศ</Box>
                <Box flex={1}>{data?.address.country}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>

            <Box>
              <Flex justifyContent="space-between">
                <Box flex={1}>รหัสไปรษณีย์</Box>
                <Box flex={3}>{data?.address.postcode}</Box>
              </Flex>
              <Divider variant="dashed" />
            </Box>
          </Box>

          {!meData?.me ? null : (
            <Flex flexDirection="column" m={2} justifyContent="right">
              <NextLink
                href="/account/address/edit/"
                as="/account/address/edit/"
                passHref
              >
                <Button
                  m={1}
                  // size="xs"
                  leftIcon={<EditIcon />}
                >
                  Edit address
                </Button>
              </NextLink>

              <NextLink
                href="/account/address/edit/"
                as="/account/address/edit/"
                passHref
              >
                <Box
                  textAlign="center"
                  fontSize="xs"
                  m={1}
                  color={primaryColor}
                  // leftIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteAddress({
                      variables: { id: data.address.id },
                      update: (cache) => {
                        cache.evict({
                          id: "Address:" + data.address.id,
                        });

                        cache.gc();
                      },
                    });
                    router.push("/account/address");
                  }}
                >
                  ลบที่อยู่นี้
                </Box>
              </NextLink>
            </Flex>
          )}
        </Wrapper>
      )}
    </HeadingLayout>
  );
};

export default withApollo({ ssr: true })(Address);
