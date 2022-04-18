import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
  const [deletePost] = useDeletePostMutation();
  return (
    <Box m={2}>
      <Menu>
        <MenuButton as={Button} variant="transparent">
          {" "}
          ...
        </MenuButton>
        <MenuList bgColor="white">
          <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`} passHref>
            <MenuItem icon={<EditIcon />} as={Link}>
              {/* <Button as={Link} aria-label="Edit post" bgColor="white"> */}
              Edit Post
              {/* </Button> */}
            </MenuItem>
          </NextLink>

          <MenuItem
            icon={<DeleteIcon />}
            onClick={() =>
              deletePost({
                variables: { id },
                update: (cache) => {
                  cache.evict({ id: "Post:" + id }); //Post: 60
                },
              })
            }
          >
            Delete post
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
