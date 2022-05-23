import { Button } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Link, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import NextLink from "next/link";
import React from "react";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  useDeletePaymentInfoMutation,
  usePaymentInfoQuery,
} from "../../../generated/graphql";
import { banksArray } from "../../../util/constants";
import { withApollo } from "../../../util/withApollo";
import { Heading } from "@chakra-ui/react";
import LinkButton from "../../../components/atoms/LinkButton";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/skeletons/Loading";

interface PaymentInfoProps {}

const PaymentInfo: React.FC<PaymentInfoProps> = ({}) => {
  const { data: paymentInfo, loading: paymentInfoLoading } =
    usePaymentInfoQuery();

  const [deletePaymentInfo] = useDeletePaymentInfoMutation();
  const noInfo = (
    <Flex justifyContent="center" alignItems="center" minH="600px">
      <Flex direction="column" alignItems="center">
        <Heading size="md">You don&apos;t have payment info yet</Heading>
        <LinkButton href="/myshop/payment-info/create" width="fit-content">
          Add
        </LinkButton>
      </Flex>
    </Flex>
  );

  let bankname;
  if (paymentInfo?.paymentInfo?.bankCode) {
    const result = banksArray.filter(
      (bank) => bank.bankCode === paymentInfo.paymentInfo!.bankCode
    );
    console.log(result);
    bankname = result[0].bank;
  }

  if (paymentInfoLoading) {
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }
  return (
    <HeadingLayout heading="Payment Info">
      <XWrapper>
        {!paymentInfo?.paymentInfo ? (
          noInfo
        ) : (
          <Box>
            <Flex justifyContent="flex-end">
              <Menu>
                <MenuButton as={Button} bgColor="transparent">
                  {" "}
                  ...
                </MenuButton>
                <MenuList bgColor="white">
                  <NextLink href="/myshop/payment-info/edit" passHref>
                    <MenuItem icon={<EditIcon />} as={Link}>
                      Update the account
                    </MenuItem>
                  </NextLink>
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => {
                      deletePaymentInfo({
                        variables: { id: paymentInfo.paymentInfo!.id },
                        update: (cache) => {
                          cache.evict({
                            id: "PaymentInfo:" + paymentInfo.paymentInfo?.id,
                          });

                          cache.gc();
                        },
                      });
                    }}
                  >
                    Delete this account
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Flex alignItems="flex-start" justifyContent="space-between">
              {/* //todo Add logo <Box>logo</Box>  */}

              <Box>
                <Text d="inline">{bankname}</Text>
                {/* <Text d="inline"> ({paymentInfo.paymentInfo.bankCode})</Text> */}
              </Box>

              <Text>{paymentInfo.paymentInfo.bankAccount}</Text>
            </Flex>
            <Divider />
          </Box>
        )}
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(PaymentInfo);
