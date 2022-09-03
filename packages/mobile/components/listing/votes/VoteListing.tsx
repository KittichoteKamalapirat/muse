import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "../../../lib/tailwind";
import { primaryColor, grey50, grey0 } from "../../../theme/style";
import MyText from "../../MyTexts/MyText";
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
