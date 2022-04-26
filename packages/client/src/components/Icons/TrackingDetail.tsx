import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { Tracking } from "../../generated/graphql";

interface TrackingDetailProps {
  tracking: Partial<Tracking>;
}

export const TrackingDetail: React.FC<TrackingDetailProps> = ({ tracking }) => {
  return (
    <Box bgColor="yellow.100" p="10px">
      <Text fontWeight="bold" color={tracking?.color ? tracking.color : "none"}>
        {tracking?.courier}
      </Text>
      <Text>Tracking No: {tracking?.trackingNo}</Text>
      {/* <Text>{tracking.}</Text> */}
      <Text>{tracking?.currentStatus}</Text>
    </Box>
  );
};
