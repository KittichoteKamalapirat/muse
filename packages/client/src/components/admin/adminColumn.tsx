import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { gql } from "urql";
import {
  AdminUpdateCartItemStatusMutation,
  CartItemStatus,
} from "../../generated/graphql";
import { SelectColumnFilter } from "../SelectColumnFilter";

export const adminColumn = (adminUpdateCartItemStatus: any) => {
  const handleOnClick = (id: number, status: CartItemStatus) => {
    adminUpdateCartItemStatus({
      variables: { id, status },
    });
  };

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
        return (
          <Menu>
            <MenuButton
              px={4}
              py={2}
              borderRadius="md"
              borderWidth="1px"
              borderColor="brand"
              _hover={{ bg: "gray.100" }}
              _expanded={{ bg: "primary.100" }}
            >
              {value} <ChevronDownIcon />
            </MenuButton>
            <MenuList bgColor="white">
              {Object.values(CartItemStatus).map((status, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleOnClick(row.original.cartItemId, status);
                  }}
                >
                  {status}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        );
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
