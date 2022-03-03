import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import {
  CartItem,
  MappedCreatorOrders,
  Tracking,
} from "../../generated/graphql";
import { mappedCartItemsByOrderResult } from "../../util/toMyOrderByOrderIdMap";

interface TrackingDetailProps {
  tracking: Partial<Tracking>;
}

export const TrackingDetail: React.FC<TrackingDetailProps> = ({ tracking }) => {
  return (
    <Box bgColor="yellow.100" p="10px">
      <Text fontWeight="bold" color={tracking?.color ? tracking.color : "none"}>
        {tracking?.courier}
      </Text>
      <Text>Traking No: {tracking?.trackingNo}</Text>
      {/* <Text>{tracking.}</Text> */}
      <Text>{tracking?.currentStatus}</Text>
    </Box>
  );
};
