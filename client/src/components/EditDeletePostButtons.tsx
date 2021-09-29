import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
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
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          aria-label="Edit post"
          icon={<EditIcon />}
          bgColor="white"
        ></IconButton>
      </NextLink>

      <IconButton
        aria-label="Delete post"
        icon={<DeleteIcon />}
        bgColor="white"
        onClick={() =>
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Post:" + id }); //Post: 60
            },
          })
        }
      ></IconButton>
    </Box>
  );
};
