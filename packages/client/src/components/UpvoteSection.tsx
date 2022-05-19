import { StarIcon } from "@chakra-ui/icons";
import { background, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { gql } from "urql";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import { ApolloCache } from "@apollo/client";
import { HeartIcon } from "./Icons/HeartIcon";

interface UpvoteSectionProps {
  //   post: PostsQuery["posts"]["posts"][0]; //select type in a type (this is an array)
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints = (data.points as number) + (!data.voteStatus ? 1 : value); //value = 1 or -1
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
    // cache.evict({ fieldName: "votedPosts:{}" });
  }
};

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "not-loading" //do this so we can set the isLoading,
  >();

  const [vote] = useVoteMutation(); //cannot use fetching because it would be loading state for upvote or downvote button
  return (
    <Flex alignItems="center" justifyContent="center">
      <IconButton
        onClick={async () => {
          setLoadingState("upvote-loading");

          await vote({
            variables: {
              postId: post.id,
              // if already voted, return 0, if not voted yet, return 1
              value: post.voteStatus === 1 ? 0 : 1,
            },
            update: (cache) => {
              updateAfterVote(post.voteStatus === 1 ? -1 : 1, post.id, cache);
            },
          });
          setLoadingState("not-loading");
        }}
        bgColor="white"
        aria-label="upvote post"
        isLoading={loadingState === "upvote-loading"}
        icon={
          <HeartIcon
            isactive={post.voteStatus === 1 ? "true" : undefined}
            // color={post.voteStatus === 1 ? "green" : "grey"}
            // borderColor={post.voteStatus === 1 ? "green" : "dark.100"}
          />
        }
      ></IconButton>
      {post.points}
    </Flex>
  );
};
