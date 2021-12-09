import { Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { CartItemStatus, useUserOrdersLazyQuery } from "../generated/graphql";
import { primaryColor, inActiveGray } from "./Variables";

interface CartItemStatusTabProps {
  userOrders: Function;
  cartItemStatus: CartItemStatus;
  setCartItemStatus: Function;
}

export const CartItemStatusTab: React.FC<CartItemStatusTabProps> = ({
  userOrders,
  cartItemStatus,
  setCartItemStatus,
}) => {
  return (
    <Flex
      width="100%"
      p={2}
      ml={"auto"}
      align="center"
      justifyContent="flex-end"
    >
      <Box
        flex={1}
        textAlign="center"
        borderBottom={1}
        borderStyle="solid"
        borderColor={
          cartItemStatus === "PaymentPending" ? primaryColor : "white"
        }
        color={
          cartItemStatus === "PaymentPending" ? primaryColor : inActiveGray
        }
        mx={1}
        onClick={() => {
          userOrders({
            variables: { status: CartItemStatus.PaymentPending },
          });

          setCartItemStatus(CartItemStatus.PaymentPending);
        }}
      >
        To pay
      </Box>

      <Box
        flex={1}
        textAlign="center"
        borderBottom={1}
        borderStyle="solid"
        borderColor={cartItemStatus === "ToDeliver" ? primaryColor : "white"}
        color={cartItemStatus === "ToDeliver" ? primaryColor : inActiveGray}
        mx={1}
        onClick={() => {
          console.log("hi");
          userOrders({ variables: { status: CartItemStatus.ToDeliver } });
          setCartItemStatus(CartItemStatus.ToDeliver);
        }}
      >
        Packing
      </Box>

      <Box
        flex={1}
        textAlign="center"
        borderBottom={1}
        borderStyle="solid"
        borderColor={cartItemStatus === "OnDelivery" ? primaryColor : "white"}
        color={cartItemStatus === "OnDelivery" ? primaryColor : inActiveGray}
        mx={1}
        onClick={() => {
          userOrders({ variables: { status: CartItemStatus.OnDelivery } });

          setCartItemStatus(CartItemStatus.OnDelivery);
        }}
      >
        Shipping
      </Box>

      <Box
        flex={1}
        textAlign="center"
        borderBottom={1}
        borderStyle="solid"
        borderColor={cartItemStatus === "Delivered" ? primaryColor : "white"}
        color={cartItemStatus === "Delivered" ? primaryColor : inActiveGray}
        mx={1}
        onClick={() => {
          userOrders({ variables: { status: CartItemStatus.Delivered } });

          setCartItemStatus(CartItemStatus.Delivered);
        }}
      >
        Complete
      </Box>
    </Flex>
  );
};
