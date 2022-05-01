import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { Address } from "../../generated/graphql";

interface AddressProps {
  address: Partial<Address>;
}

export const AddressComponent: React.FC<AddressProps> = ({ address }) => {
  return (
    <Box>
      <Text>{address.name}</Text>
      <Box fontSize="sm" color="blackAlpha.600">
        <Text>{address.phonenumber}</Text>
        <Text d="inline">{address.line1}</Text>
        <Text d="inline">{address.line2}</Text>
        <Text d="inline">{address.subdistrict}</Text>
        <Text>{address.district}</Text>
        <Text d="inline">{address.province}</Text>{" "}
        <Text d="inline">{address.postcode}</Text>
      </Box>
    </Box>
  );
};
