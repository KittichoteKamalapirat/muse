import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { CartItem } from "../../generated/graphql";
import { mappedCartItemsByOrderResult } from "../../util/toMyOrderByOrderIdMap";

interface TrackingDetailProps {
  orderItem: mappedCartItemsByOrderResult;
}

export const TrackingDetail: React.FC<TrackingDetailProps> = ({
  orderItem,
}) => {
  return (
    <Box bgColor="yellow.100" p="10px">
      <Text
        fontWeight="bold"
        color={orderItem.tracking?.color ? orderItem.tracking.color : "none"}
      >
        {orderItem.tracking?.courier}
      </Text>
      <Text>Traking No: {orderItem.tracking?.trackingNo}</Text>
      {/* <Text>{orderItem.tracking.}</Text> */}
      <Text>{orderItem.tracking?.currentStatus}</Text>
    </Box>
  );
};
