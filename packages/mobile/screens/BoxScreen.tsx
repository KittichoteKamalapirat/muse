import { gql } from "@apollo/client";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import Error from "../components/layouts/Error";
import ScreenLayout from "../components/layouts/ScreenLayout";
import VoteListing from "../components/listing/votes/VoteListing";
import {
  SongRequest,
  useBoxQuery,
  useJoinBoxMutation,
  useSongRequestsQuery,
  useSongRequestsSubsSubscription,
} from "../graphql/generated/graphql";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const BoxScreen = ({ navigation }: Props) => {
  const route: RouteProp<{ params: { boxId: string } }> = useRoute();
  const boxId = route.params.boxId;
  const [joinBox] = useJoinBoxMutation();

  const {
    data: songRequestsData,
    loading: songRequestsLoading,
    error: songRequestsError,
  } = useSongRequestsQuery({
    variables: { boxId },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: songRequestsSubsData,
    loading: songRequestsSubsLoading,
    error: songRequestsSubsError,
  } = useSongRequestsSubsSubscription({
    variables: { boxId },
  });

  const {
    data: boxData,
    loading: boxLoading,
    error: boxError,
  } = useBoxQuery({ variables: { id: boxId } });

  const { box } = boxData || {};

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
  if (boxError) return <Error errorMessage={boxError.message} />;

  return (
    <ScreenLayout justifyContent="justify-start">
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
          <VoteListing
            songRequests={
              songRequestsSubsData?.songRequestsSubs === undefined ||
              songRequestsSubsData?.songRequestsSubs.length === 0
                ? (songRequestsData?.songRequests as SongRequest[])
                : (songRequestsSubsData?.songRequestsSubs as SongRequest[])
            }
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default BoxScreen;
