import {
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { gql } from "urql";
import {
  CartItemStatus,
  CompleteCartItemMutation,
  Exact,
  useCompleteCartItemMutation,
} from "../../generated/graphql";
import { SelectColumnFilter } from "../SelectColumnFilter";

export const adminColumn = (completeCartItem: any) => {
  return [
    {
      Header: "id",
      accessor: "cartItemId",
      Filter: Box,
      isNumeric: true,
    },
    {
      Header: "status",
      accessor: "status",
      Filter: SelectColumnFilter,
      filter: "includes",
      Cell: ({ value, row }: { value: string; row: any }) => {
        if (value === CartItemStatus.Received) {
          return (
            <>
              <Flex alignItems={"center"} justifyContent="space-between">
                <Text>{value}</Text>
                <Button
                  onClick={() => {
                    // console.log({ row });
                    completeCartItem({
                      variables: { id: row.original.cartItemId },
                      update: (
                        cache: ApolloCache<CompleteCartItemMutation>
                      ) => {
                        cache.writeFragment({
                          id: "CartItem:" + row.original.cartItemId,
                          fragment: gql`
                            fragment __ on CartItem {
                              status
                            }
                          `,
                          data: { status: CartItemStatus.Complete },
                        });
                      },
                    });
                  }}
                >
                  Update
                </Button>
              </Flex>
            </>
          );
        }
        return value;
      },
    },
    {
      Header: "creator bank",
      accessor: "bankCode",
      Filter: Box,
      isNumeric: true,
    },
    {
      Header: "account number",
      accessor: "bankAccount",
      Filter: Box,
      isNumeric: true,
    },
    {
      Header: "amount",
      accessor: "amount",
      Filter: Box,
      isNumeric: true,
    },
  ];
};
