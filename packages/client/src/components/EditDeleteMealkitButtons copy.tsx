import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { gql } from "@apollo/client";
import NextLink from "next/link";
import React from "react";
import {
  useDeletePostMutation,
  useToggleIsPublishedMutation,
} from "../generated/graphql";

interface EditDeleteMealkitButtonsProps {
  id: number;
  postId: number;
}

export const EditDeleteMealkitButtons: React.FC<
  EditDeleteMealkitButtonsProps
> = ({ id, postId }) => {
  // const [deleteMealkit] = useDeletePostMutation();
  const [toggleIsPublished] = useToggleIsPublishedMutation();
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
          {/* 
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
          </MenuItem> */}

          {/* <MenuItem
            icon={isPublished ? <ViewOffIcon /> : <ViewIcon />}
            onClick={() =>
              toggleIsPublished({
                variables: { isPublished: !isPublished, id },
                update: (cache, { data: success }) => {
                  cache.writeFragment({
                    id: "Post:" + id,
                    fragment: gql`
                      fragment __ on Post {
                        isPublished
                      }
                    `,
                    data: { isPublished: success ? !isPublished : isPublished },
                  });
                  cache.evict({ fieldName: "posts:{}" }); //if fieldName postsByCreator -> don't remove this post
                },
              })
            }
          >
            {isPublished ? "Unpublish" : "Publish"}
          </MenuItem> */}
        </MenuList>
      </Menu>
    </Box>
  );
};
