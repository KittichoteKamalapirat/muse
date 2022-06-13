import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/atoms/Button";
import LinkButton from "../../../components/atoms/LinkButton";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import XYWrapper from "../../../components/Wrapper/XYWrapper";
import {
  useAddressQuery,
  useDeleteAddressMutation,
  useMeQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../util/useIsAuth";
import { withApollo } from "../../../util/withApollo";

const Address = () => {
  useIsAuth();
  const { data, loading } = useAddressQuery();
  const { data: meData } = useMeQuery();
  const [deleteAddress] = useDeleteAddressMutation();

  const router = useRouter();

  if (loading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }
  const noAddress = (
    <XYWrapper>
      <Heading size="h2" m={5}>
        You have not added your address yet
      </Heading>

      <LinkButton pathname="/account/address/create" leftIcon={<AddIcon />}>
        Add address
      </LinkButton>
    </XYWrapper>
  );
  return (
    <HeadingLayout
      // heading="ที่อยู่จัดส่ง"
      heading="Delivery Address"
    >
      <XWrapper>
        {!data?.address ? (
          noAddress
        ) : (
          <Box>
            <Box>
              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    Name
                  </Heading>
                  <Box flex={3}>{data?.address.name}</Box>
                </Flex>
                <Divider variant="dashed" />
              </Box>

              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    Phone no.
                  </Heading>
                  <Box flex={3}>{data?.address.phonenumber}</Box>
                </Flex>
                <Divider variant="dashed" />
              </Box>

              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    {/* ที่อยู่ 1 */}
                    Line 1
                  </Heading>
                  <Box flex={3}>{data?.address.line1}</Box>
                </Flex>
                <Divider variant="dashed" />
              </Box>

              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    {/* ที่อยู่ 2 */}
                    Line 2
                  </Heading>
                  <Box flex={3}>{data?.address.line2}</Box>
                </Flex>
                <Divider variant="dashed" />
              </Box>

              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    {/* แขวง */}
                    Subdistrict
                  </Heading>
                  <Box flex={1}>{data?.address.subdistrict}</Box>

                  <Heading size="sm" as="h6" flex={1}>
                    {/* เขต */}
                    District
                  </Heading>
                  <Box flex={1}>{data?.address.district}</Box>
                </Flex>
                <Divider variant="dashed" />
              </Box>

              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    {/* จังหวัด */}
                    Province
                  </Heading>
                  <Box flex={1}>{data?.address.province}</Box>
                  <Heading size="sm" as="h6" flex={1}>
                    {/* ประเทศ */}
                    Country
                  </Heading>
                  <Box flex={1}>{data?.address.country}</Box>
                </Flex>
                <Divider variant="dashed" />
              </Box>

              <Box mt={4}>
                <Flex justifyContent="space-between">
                  <Heading size="sm" as="h6" flex={1}>
                    {/* รหัสไปรษณีย์ */}
                    Postcode
                  </Heading>
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
                  <Button leftIcon={<EditIcon />}>Edit address</Button>
                </NextLink>

                <NextLink
                  href="/account/address/edit/"
                  as="/account/address/edit/"
                  passHref
                >
                  <Button
                    variant="outline"
                    color="gray.400"
                    leftIcon={<DeleteIcon />}
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
                    {/* ลบที่อยู่นี้ */}
                    Delete this address
                  </Button>
                </NextLink>
              </Flex>
            )}
          </Box>
        )}
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: true })(Address);
