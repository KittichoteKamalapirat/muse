import { Box, Divider, Flex, Link, Text } from "@chakra-ui/layout";
import React from "react";
import { HeadingLayout } from "../../../components/HeadingLayout";
import {
  useDeletePaymentInfoMutation,
  useMeQuery,
  usePaymentInfoQuery,
} from "../../../generated/graphql";

import NextLink from "next/link";
import { Wrapper } from "../../../components/Wrapper";
import { Button } from "@chakra-ui/button";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { withApollo } from "../../../util/withApollo";
import { banksArray } from "../../../util/constants";

interface PaymentInfoProps {}

const PaymentInfo: React.FC<PaymentInfoProps> = ({}) => {
  const { data: paymentInfo, loading: paymentInfoLoading } =
    usePaymentInfoQuery();

  const [deletePaymentInfo] = useDeletePaymentInfoMutation();
  const noInfo = (
    <Box mt={2}>
      <Text>Tou don't have payment info yet</Text>
      <NextLink href="/myshop/payment-info/create">
        <Link>Add</Link>
      </NextLink>
      <Divider mt={2} />
    </Box>
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
    return <Text>Loading</Text>;
  }
  return (
    <HeadingLayout heading="Payment Info">
      <Wrapper>
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
                  <NextLink href="/myshop/payment-info/edit">
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
              <Box>logo</Box>
              <Box>
                <Text d="inline">{bankname}</Text>
                <Text d="inline"> ({paymentInfo.paymentInfo.bankCode})</Text>
              </Box>
              <Box textAlign="right"> </Box>

              <Text>{paymentInfo.paymentInfo.bankAccount}</Text>
            </Flex>
            <Divider />
          </Box>
        )}
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(PaymentInfo);
