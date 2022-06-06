import { Box, Heading, Flex, Badge } from "@chakra-ui/react";
import React from "react";
import { CartItem, CartItemStatus } from "../generated/graphql";

interface Props {
  cartItems: CartItem[];
}

const AdminSummaryBox = ({ cartItems = [] }: Props) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="h2" as="h3">
        Cart Items Summary
      </Heading>
      <Box>
        {Object.values(CartItemStatus).map((status) => (
          <Flex
            key={status}
            mt={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Badge
              colorScheme={
                status === CartItemStatus.Received ? "secondary" : ""
              }
            >
              {String(status)}{" "}
            </Badge>
            {cartItems.filter((item) => item.status === status).length}
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
export default AdminSummaryBox;
