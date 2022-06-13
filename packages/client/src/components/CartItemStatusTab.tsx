/* eslint-disable @typescript-eslint/ban-types */
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { CartItemStatus } from "../generated/graphql";
import Tab from "./atoms/Tab/Tab";

interface CartItemStatusTabProps {
  userOrders: Function;
  cartItemStatus: CartItemStatus;
  setCartItemStatus: Function;
  isForCreator: boolean;
}

interface CartItemStatusTabDisplay {
  status: CartItemStatus;
  labelForUser: string;
  labelForCreator: string;
}
const CART_ITEM_STATUS_TABS_DISPLAY: CartItemStatusTabDisplay[] = [
  {
    status: CartItemStatus.PaymentPending,
    labelForUser: "To pay",
    labelForCreator: "Not paid",
  },
  {
    status: CartItemStatus.ToDeliver,
    labelForUser: "Packing",
    labelForCreator: "To deliver",
  },
  {
    status: CartItemStatus.OnTheWay,
    labelForUser: "On the way",
    labelForCreator: "Shipping",
  },
  {
    status: CartItemStatus.Delivered,
    labelForUser: "Delivered",
    labelForCreator: "Delivered",
  },
  {
    status: CartItemStatus.Received,
    labelForUser: "Received",
    labelForCreator: "Received",
  },
  {
    status: CartItemStatus.Complete,
    labelForUser: "Complete",
    labelForCreator: "Complete",
  },
];

export const CartItemStatusTab: React.FC<CartItemStatusTabProps> = ({
  userOrders,
  cartItemStatus,
  setCartItemStatus,
  isForCreator,
}) => {
  const handleClick = (cartItemStatus: CartItemStatus) => {
    userOrders({
      variables: { status: cartItemStatus },
    });
    setCartItemStatus(cartItemStatus);
  };
  return (
    <Box
      // hiding scroll bar
      height={12}
      width="100%"
      overflow="hidden"
    >
      <Flex
        width="100%"
        ml={"auto"}
        align="center"
        overflowY="hidden"
        overflowX="scroll"
        // hiding scroll bar
        height="100%"
        pb={10} // push to bottom
        boxSizing="content-box"
      >
        {CART_ITEM_STATUS_TABS_DISPLAY.map((item) => (
          <Tab
            key={item.status}
            currentStatus={cartItemStatus}
            tabStatus={item.status}
            onClick={() => handleClick(item.status)}
          >
            {isForCreator ? item.labelForCreator : item.labelForUser}
          </Tab>
        ))}
      </Flex>
    </Box>
  );
};
