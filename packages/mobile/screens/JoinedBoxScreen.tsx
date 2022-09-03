import { gql } from "@apollo/client";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { io } from "socket.io-client";
import Button from "../components/Buttons/Button";
import Error from "../components/layouts/Error";
import ScreenLayout from "../components/layouts/ScreenLayout";
import VoteListing from "../components/listing/votes/VoteListing";
import MyText from "../components/MyTexts/MyText";
import {
  SongRequest,
  useBoxQuery,
  useJoinBoxMutation,
} from "../graphql/generated/graphql";
// import { places } from "../mockData";
import { Place, Song } from "../types";

const socket = io("http://localhost:4000");

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const JoinedBoxScreen = ({ navigation }: Props) => {
  const route: RouteProp<{ params: { boxId: string } }> = useRoute();
  const boxId = route.params.boxId;
  const [joinBox] = useJoinBoxMutation();

  // const { data: songRequestsData, songRequestsLoading, ssongRequestsError } = useSongRequestsQuery({
  //   variables: { boxId },
  // });

  const {
    data: boxData,
    loading: boxLoading,
    error: boxError,
  } = useBoxQuery({ variables: { id: boxId } });

  const { box } = boxData || {};

  const [songs, setSongs] = useState<Song[] | null>(null);
  const [place, setPlace] = useState<Place | null>(null);

  // 10
  // if upvote => 11, if upvote again => 10
  // if downvote => 9m if downvote again => 10
  const incrementUpvote = (songId: string, upvotesNum: number) => {
    socket.emit("incrementUpvote", boxId, songId, upvotesNum);
  };

  useEffect(() => {
    if (songs) {
      socket.on("broadcastIncrementUpvote", (boxId, songId, upvotesNum) => {
        const songsCopy = [...songs].map((song) => {
          if (song.id === songId) {
            song.upvotesNum = upvotesNum;
          }
          return song;
        });

        setSongs(songsCopy);
      });
      return () => {
        socket.off("broadcastIncrementUpvote"); // has to return void, so can't do one line syntax
      };
    }
  }, [socket, songs]);

  const handleJoinBox = async () => {
    const response = await joinBox({
      variables: { boxId },
      update: (cache) => {
        cache.writeFragment({
          id: "Box:" + box?.id,
          fragment: gql`
            fragment __ on Box {
              isJoined
            }
          `,
          data: { isJoined: true },
        });
      },
    });
    if (!response.errors) console.log("response", response);
  };
  if (boxLoading) return <ActivityIndicator />;
  if (boxError) return <Error errorMessage={error.message} />;

  return (
    <ScreenLayout justifyContent="justify-start">
      <MyText size="text-lg">{place?.name}</MyText>

      {!box?.isJoined ? (
        <Button label="Join this event" onPress={handleJoinBox} />
      ) : (
        <View>
          <Button
            label="Request a song"
            onPress={() =>
              navigation.navigate(
                "Search" as never,
                {
                  boxId,
                } as never
              )
            }
          />
          <VoteListing songRequests={box.songRequests as SongRequest[]} />
        </View>
      )}
    </ScreenLayout>
  );
};

export default JoinedBoxScreen;
