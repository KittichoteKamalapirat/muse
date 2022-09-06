import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "../../../lib/tailwind";
import { primaryColor, grey50, grey0 } from "../../../theme/style";
import MyText from "../../MyTexts/MyText";
import {
  Maybe,
  SongRequest,
  useVoteMutation,
} from "../../../graphql/generated/graphql";
import { updateCacheAfterVote } from "../../../util/updateCacheAfterVote";

interface Props {
  item: SongRequest;
  voteStatus: Maybe<number> | undefined; //1,0,-1
}

const VoteItem = ({ item, voteStatus }: Props) => {
  console.log("vote status in item", item.song.name, voteStatus);
  const [vote] = useVoteMutation();

  const handleVote = async (songRequestId: string, value: number) => {
    await vote({
      variables: { songRequestId, value },
      update: (cache) => {
        updateCacheAfterVote(value, songRequestId, cache);
      },
    });
  };

  return (
    <View style={tw`flex-row justify-between`}>
      <View style={tw`flex-row justify-start`}>
        {/* image */}
        <Image
          style={tw`w-20 h-20`}
          source={{ uri: item.song.albumImageUrl }}
        />

        {/* content */}
        <View>
          <MyText extraStyle="font-bold">{item.song.name}</MyText>
          <MyText fontColor="text-grey-100" size="text-sm">
            {item.song.artistName}
          </MyText>
        </View>
      </View>

      {/* vote */}

      <View style={tw`flex items-center`}>
        <TouchableOpacity onPress={() => handleVote(item.id, 1)}>
          <AntDesign
            name="caretup"
            size={16}
            color={voteStatus === 1 ? primaryColor : grey50}
          />
        </TouchableOpacity>
        <MyText size="text-lg">{item.counts}</MyText>
        <TouchableOpacity onPress={() => handleVote(item.id, -1)}>
          <AntDesign
            name="caretdown"
            size={16}
            color={voteStatus === -1 ? primaryColor : grey50}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoteItem;
