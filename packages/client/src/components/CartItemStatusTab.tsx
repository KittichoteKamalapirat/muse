import { Flex } from "@chakra-ui/react";
import React from "react";
import { CartItemStatus } from "../generated/graphql";
import Tab from "./atoms/Tab/Tab";

interface CartItemStatusTabProps {
  userOrders: Function;
  cartItemStatus: CartItemStatus;
  setCartItemStatus: Function;
}

interface CartItemStatusTabDisplay {
  status: CartItemStatus;
  label: string;
}
const CART_ITEM_STATUS_TABS_DISPLAY: CartItemStatusTabDisplay[] = [
  { status: CartItemStatus.PaymentPending, label: "To pay" },
  { status: CartItemStatus.ToDeliver, label: "Packing" },
  { status: CartItemStatus.OnTheWay, label: "On the way" },
  { status: CartItemStatus.Delivered, label: "Delivered" },
  { status: CartItemStatus.Received, label: "Received" },
  { status: CartItemStatus.Complete, label: "Complete" },
];

export const CartItemStatusTab: React.FC<CartItemStatusTabProps> = ({
  userOrders,
  cartItemStatus,
  setCartItemStatus,
}) => {
  const handleClick = (cartItemStatus: CartItemStatus) => {
    userOrders({
      variables: { status: cartItemStatus },
    });
    setCartItemStatus(cartItemStatus);
  };
  return (
    <Flex width="100%" ml={"auto"} align="center" justifyContent="flex-end">
      {CART_ITEM_STATUS_TABS_DISPLAY.map((item) => (
        <Tab
          key={item.status}
          currentStatus={cartItemStatus}
          tabStatus={item.status}
          onClick={() => handleClick(item.status)}
        >
          {item.label}
        </Tab>
      ))}
    </Flex>
  );
};
