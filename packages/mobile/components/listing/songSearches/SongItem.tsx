import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { useAddSongRequestMutation } from "../../../graphql/generated/graphql";
import tw from "../../../lib/tailwind";
import Button, { ButtonTypes } from "../../Buttons/Button";
import MyText from "../../MyTexts/MyText";

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: "space-between";
  align-items: "center";
`;

const Card = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const CardImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const CardContent = styled.View`
  margin: 10px;
`;

const CartTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: white;
`;
const CartSubtitle = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: white;
`;

interface SongDisplay {
  id: string;
  name: string;
  albumImageUrl: string;
  albumName: string;
  artistName: string;
}
interface Props {
  item: SongDisplay;
  isRequested: boolean;
  isOwner: boolean;
}
const ListItem = ({ item, isRequested, isOwner }: Props) => {
  const route: RouteProp<{ params: { boxId: string } }> = useRoute();
  const boxId = route.params.boxId;

  const requestButton = (() => {
    // if an Owner => definitely isRequested therefore, 3 cases
    // isOwner && isRequested
    // not isOwner && isRequested
    // not isOwner && not isRequested
    if (isOwner) {
      return "Requested"; // ถ้าคลิกอีกที => ลบออกได้ ถ้ายังไม่มีคนมาโหวต
    } else if (isRequested && !isOwner) {
      return "upvote or downvote";
    } else {
      ("Request");
    }
  })();
  const [addSongRequest] = useAddSongRequestMutation();

  const handleAddSongRequest = async (song: SongDisplay) => {
    const { name, albumImageUrl, albumName, artistName } = song;
    const songRequest = await addSongRequest({
      variables: {
        songInput: {
          name,
          albumImageUrl,
          albumName,
          artistName,
        },
        spotifyTrackId: item.id,
        boxId,
      },
      update: (cache) => cache.evict({ fieldName: "songRequests" }), //songRequests:{}" doesn't work
    });
  };

  return (
    <View style={tw`flex-row justify-between`}>
      {/* album and song details */}
      <View style={tw`flex-row justify-start items-center my-1`}>
        {/* image */}
        <Image style={tw`w-12 h-12`} source={{ uri: item.albumImageUrl }} />

        {/* content */}
        <View style={tw`ml-2`}>
          <MyText extraStyle="font-bold mb-2">{item.name}</MyText>
          <MyText fontColor="text-grey-100" size="text-sm">
            {item.artistName}
          </MyText>
        </View>
      </View>

      <View>
        {isRequested ? (
          <Button
            type={ButtonTypes.OUTLINED}
            // onPress={() => handleAddSongRequest(item)}
            label="Requested"
            fontColor="grey-0"
            size="text-sm"
          />
        ) : (
          <Button
            type={isRequested ? ButtonTypes.OUTLINED : ButtonTypes.PRIMARY}
            onPress={() => handleAddSongRequest(item)}
            label={isRequested ? "Requested" : "Request"}
            size="text-sm"
          />
        )}
      </View>
    </View>
  );
};

export default ListItem;
