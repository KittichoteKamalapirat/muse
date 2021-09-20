import { StarIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
} from "../generated/graphql";

interface UpvoteSectionProps {
  //   post: PostsQuery["posts"]["posts"][0]; //select type in a type (this is an array)
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "not-loading" //do this so we can set the isLoading,
  >();

  const [, vote] = useVoteMutation(); //cannot use fetching because it would be loading state for upvote or downvote button
  return (
    <Flex alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={async () => {
          // if (post.voteStatus === 1) {
          //   return;
          // }
          setLoadingState("upvote-loading");
          console.log("post.voteStatus");
          console.log(post.voteStatus);

          await vote({
            postId: post.id,
            value: post.voteStatus === 1 ? -1 : 1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="upvote post"
        isLoading={loadingState === "upvote-loading"}
        icon={<StarIcon color={post.voteStatus === 1 ? "green" : "grey"} />}
      ></IconButton>
      {post.points}
    </Flex>
  );
};
