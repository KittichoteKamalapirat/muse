import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface EditDeleteMealkitButtonsProps {
  id: number;
  postId: number;
}

export const EditDeleteMealkitButtons: React.FC<
  EditDeleteMealkitButtonsProps
> = ({ id, postId }) => {
  // const [deleteMealkit] = useDeletePostMutation();

  return (
    <Box m={2}>
      <Menu>
        <MenuButton as={Button} variant="transparent">
          ...
        </MenuButton>
        <MenuList bgColor="white">
          <NextLink
            href={{
              pathname: `/mealkit/edit/${id}`,
              // as: {`/mealkit/edit/${id}`}
              query: {
                postId,
              },
            }}
            passHref
          >
            <MenuItem icon={<EditIcon />} as={Link}>
              Edit meal kit
            </MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    </Box>
  );
};
