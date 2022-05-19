import {
  Grid,
  GridItem,
  Box,
  Heading,
  Flex,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { CartItem } from "../../generated/graphql";

interface Props {
  cartItem: CartItem;
}

const CartItemDetail = ({ cartItem }: Props) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={2}>
      <GridItem colSpan={3}>
        <Image src={cartItem?.mealkit.thumbnail.url} alt="mealkit image" />
      </GridItem>
      <GridItem colSpan={9}>
        <Box flex={3} m={1} textAlign="left">
          <Heading size="md">{cartItem?.mealkit?.name}</Heading>

          <Text>{cartItem?.user?.username}</Text>

          <Flex justifyContent="space-between" fontSize="sm">
            <Text>Unit price</Text>
            <Text color="gray.700" fontWeight="normal">
              {cartItem?.mealkit?.price}
            </Text>
          </Flex>

          <Flex justifyContent="space-between" fontSize="sm">
            <Text>Quantity</Text>
            <Text color="gray.700" fontWeight="normal">
              x {cartItem?.quantity}
            </Text>
          </Flex>
          <Divider />
          <Flex justifyContent="end" fontSize="sm">
            <Text> {cartItem?.fieldTotal} </Text>
          </Flex>

          <Flex justifyContent="space-between" fontSize="sm"></Flex>
        </Box>
      </GridItem>
    </Grid>
  );
};
export default CartItemDetail;
