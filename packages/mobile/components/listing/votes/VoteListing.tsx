import React from "react";
import { FlatList } from "react-native";
import { SongRequest } from "../../../graphql/generated/graphql";
import VoteItem from "./VoteItem";

interface Props {
  songRequests: SongRequest[];
}

const VoteListing = ({ songRequests }: Props) => {
  return (
    <FlatList
      // slice to copy, other wise got the error "Attemped to assign to readonly propery"
      data={songRequests
        ?.slice()
        .sort((a, b) => (a.counts < b.counts ? 1 : -1))}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const voteStatus = item.voteStatus;
        return <VoteItem item={item} voteStatus={voteStatus} />;
      }}
    />
  );
};

export default VoteListing;
