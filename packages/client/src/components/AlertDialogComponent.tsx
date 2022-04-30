import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

import { FocusableElement } from "@chakra-ui/utils";
import React, {
  LegacyRef,
  MouseEventHandler,
  RefObject,
  useState,
} from "react";

interface AlertDialogComponentProps {
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // MyAlertDialogProps: {
  //   isOpen: boolean;
  //   // leastDestructiveRef: LegacyRef<HTMLButtonElement> | undefined;
  //   leastDestructiveRef: LegacyRef<HTMLButtonElement> | undefined;
  //   onClose: () => void;
  // };
  isOpen: boolean;
  // leastDestructiveRef: LegacyRef<HTMLButtonElement> | undefined;
  leastDestructiveRef: RefObject<FocusableElement> | undefined;
  deleteCartItem: Function;
  // onClose: () => void;
  cartItemId: number;
  cancelRef: LegacyRef<HTMLButtonElement> | undefined;
  // onClose: MouseEventHandler<HTMLButtonElement>;
  onClose: () => void;
}

export const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
  //   setIsOpen,
  // MyAlertDialogProps,
  isOpen,
  leastDestructiveRef,
  cartItemId,
  deleteCartItem,
  cancelRef,
  onClose,
}) => {
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={
          cancelRef as RefObject<FocusableElement> | undefined
        }
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete an item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to remove this item from your cart?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  console.log("hi");
                  console.log(cartItemId);
                  deleteCartItem({
                    variables: { id: cartItemId },
                    update: (cache: any) => {
                      return cache.evict({ id: "CartItem:" + cartItemId });
                    },
                  });

                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
