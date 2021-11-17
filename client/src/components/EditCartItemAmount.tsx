import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Table, Thead, Tr, Th, Box, IconButton, Text } from "@chakra-ui/react";
import { FocusableElement } from "@chakra-ui/utils";
import React, { LegacyRef, RefObject, useState } from "react";
import { CartItem } from "../generated/graphql";
import { AlertDialogComponent } from "./AlertDialogComponent";

interface EditCartItemAmountButtonProps {
  cartItem: CartItem;
  deleteCartItem: Function;
  updateCartItem: Function;
}

export const EditCartItemAmountButton: React.FC<EditCartItemAmountButtonProps> =
  ({ cartItem, deleteCartItem, updateCartItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef() as
      | LegacyRef<HTMLButtonElement>
      | undefined;
    const leastDestructiveRef = cancelRef as
      | RefObject<FocusableElement>
      | undefined;

    return (
      <Table variant="simple" size="sm" width="2rem">
        <Thead>
          <Tr>
            <Th
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.300"
              p={1}
            >
              {" "}
              <Box>
                <IconButton
                  aria-label="add more item"
                  color="gray.700"
                  bgColor="white"
                  icon={<AddIcon />}
                  size="xs"
                  onClick={() => {
                    //the cache is automatically updated because there is id? Ben mentioend this I think
                    updateCartItem({
                      variables: {
                        quantity: cartItem.quantity + 1,
                        id: cartItem.id,
                        mealkitId: cartItem.mealkitId,
                      },
                    });
                  }}
                />
              </Box>
            </Th>
            <Th
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.300"
              px={4}
            >
              {" "}
              <Box>
                <Text color="gray.700" fontSize="md" fontWeight="normal">
                  {cartItem.quantity}
                </Text>
              </Box>
            </Th>
            <Th
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.300"
              p={1}
            >
              {" "}
              <Box>
                <IconButton
                  aria-label="add more item"
                  icon={<MinusIcon />}
                  bgColor="white"
                  size="xs"
                  color="gray.700"
                  // disabled={item.quantity <= 1}
                  onClick={() => {
                    //the cache is automatically updated because there is id? Ben mentioend this I think
                    if (cartItem.quantity === 1) {
                      setIsOpen(true);
                      // return deleteCartItem({
                      //   variables: { id: item.id },
                      // });
                    } else {
                      updateCartItem({
                        variables: {
                          quantity: cartItem.quantity - 1,
                          id: cartItem.id,
                          mealkitId: cartItem.mealkitId,
                        },
                      }); //quantity is returned -> Apollo auto updated in the  cache
                      //if total is not rutnr 0> Apollo don't update -> so the total is still the same
                    }
                  }}
                />
                <AlertDialogComponent
                  // MyAlertDialogProps={ParentAlertDialogProps}
                  isOpen={isOpen}
                  leastDestructiveRef={leastDestructiveRef}
                  onClose={onClose}
                  cancelRef={cancelRef}
                  cartItemId={cartItem.id}
                  deleteCartItem={deleteCartItem}
                />
              </Box>
            </Th>
          </Tr>
        </Thead>
      </Table>
    );
  };
