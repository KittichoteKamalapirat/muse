import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
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
        <MenuButton as={Button}> ...</MenuButton>
        <MenuList bgColor="white">
          <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
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

          {/* <Button
              aria-label="Delete post"
              // icon={<DeleteIcon />}
              bgColor="white"
              onClick={() =>
                deletePost({
                  variables: { id },
                  update: (cache) => {
                    cache.evict({ id: "Post:" + id }); //Post: 60
                  },
                })
              }
            >
              {" "}
              Delete post
            </Button> */}
        </MenuList>
      </Menu>
    </Box>
  );
};
