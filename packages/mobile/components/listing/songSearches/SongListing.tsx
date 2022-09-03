import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { UserContext } from "../../../context/UserContext";
import { useSongRequestsQuery } from "../../../graphql/generated/graphql";
import ListItem from "./SongItem";

interface Props {
  items: any;
  onEndReached: () => void;
}
const NoSongs = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
const SongListing = ({ items, onEndReached }: Props) => {
  const route: RouteProp<{ params: { boxId: string } }> = useRoute();
  const boxId = route.params.boxId;
  const { currentUser } = useContext(UserContext);
  const {
    data: songRequestsData,
    loading,
    error,
  } = useSongRequestsQuery({ variables: { boxId } });

  const formattedItems = items
    .slice()
    .sort((a, b) => (a.popularity - b.popularity > 0 ? -1 : 1))
    .map((item) => {
      const id = item.id;
      const name = item.name;
      const albumImageUrl = item.album.images[0].url;
      const albumName = item.album.name;
      const artistName = item.artists[0].name;

      return { id, name, albumImageUrl, albumName, artistName };
    });
  return (
    <FlatList
      data={formattedItems}
      renderItem={({ item }) => {
        const songRequests = songRequestsData?.songRequests;

        // songRequest belongs to => song (which has spotifyTrackingId)
        // check whether item.id match that spotifyTrackingId
        const isRequested = !!songRequests
          ?.map((req) => req.song.spotifyTrackId)
          .includes(item.id);

        // if not owner => can vote
        // songRequest has song which has spotifyTrackingId
        const requestedSongs = songRequests?.filter(
          (sr) =>
            sr.song.spotifyTrackId === item.id &&
            sr.requesterId === currentUser?.id
        );
        const isOwner =
          requestedSongs && requestedSongs?.length > 0 ? true : false;

        return (
          <ListItem item={item} isRequested={isRequested} isOwner={isOwner} />
        );
      }}
      keyExtractor={({ id }, index) => id + index.toString()}
      onEndReached={onEndReached}
      ListEmptyComponent={() => <NoSongs>No songs found</NoSongs>}
    />
  );
};

export default SongListing;
