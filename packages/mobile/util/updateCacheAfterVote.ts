import { ApolloCache, gql } from "@apollo/client";
import { VoteMutation } from "../graphql/generated/graphql";

export const updateCacheAfterVote = (
  value: number, // -1 or 1
  songRequestId: string,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    counts: number;
    voteStatus: number | null;
  }>({
    id: "SongRequest:" + songRequestId,
    fragment: gql`
      fragment _ on SongRequest {
        id
        counts
        voteStatus
      }
    `,
  });

  // vote status could be null if have never voted yet

  if (data) {
    const prevVoteStatus = data.voteStatus; // -1, 0, 1

    let delta = 0; // how mamny counts to add
    let currVoteStatus = 0; // to be voteStatus

    switch (value) {
      case 1:
        switch (prevVoteStatus) {
          case 1:
            delta = -1;
            currVoteStatus = 0;
            break;
          case 0:
            delta = 1;
            currVoteStatus = 1;
            break;
          case -1:
            delta = 2;
            currVoteStatus = 1;
            break;
          case null:
            delta = 1;
            currVoteStatus = 1;
            break;
        }
        break;
      case -1:
        switch (prevVoteStatus) {
          case 1:
            delta = -2;
            currVoteStatus = -1;
            break;
          case 0:
            delta = -1;
            currVoteStatus = -1;
            break;
          case -1:
            delta = 1;
            currVoteStatus = 0;
            break;
          case null: // never voted
            delta = -1;
            currVoteStatus = -1;
            break;
        }
        break;
      default:
        break;
    }

    console.log("current vote status", currVoteStatus);
    const newCounts = (data.counts as number) + delta;
    cache.writeFragment({
      id: "SongRequest:" + songRequestId,
      fragment: gql`
        fragment __ on SongRequest {
          counts
          voteStatus
        }
      `,
      data: { counts: newCounts, voteStatus: currVoteStatus },
    });
  }
};
