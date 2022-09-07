import { gql } from "@apollo/client";
import { RouteProp, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import { Container } from "../components/containers/Container";
import Error from "../components/layouts/Error";
import ScreenLayout from "../components/layouts/ScreenLayout";
import VoteListing from "../components/listing/votes/VoteListing";
import MyText from "../components/MyTexts/MyText";
import {
  SongRequest,
  useBoxQuery,
  useJoinBoxMutation,
  useSongRequestsQuery,
  useSongRequestsSubsSubscription,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";

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
      <Container>
        {/* Box Details */}
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View>
              <MyText size="text-2xl" weight="font-bold" extraStyle="my-2">
                {box?.address?.name}
              </MyText>

              <MyText>Location: {box?.address?.name}</MyText>

              <MyText>Event: {box?.name}</MyText>

              <MyText>Description: {box?.description}</MyText>

              <MyText fontColor="text-grey-50">
                {moment(box?.startTime).format("k:mm")} -
                {moment(box?.endTime).format("k:mm")}
              </MyText>
            </View>
            {/* song requests */}
            <MyText size="text-xl" weight="font-bold" extraStyle="my-2">
              Song requests
            </MyText>
            {!box?.isJoined ? null : (
              <VoteListing
                songRequests={
                  songRequestsSubsData?.songRequestsSubs === undefined ||
                  songRequestsSubsData?.songRequestsSubs.length === 0
                    ? (songRequestsData?.songRequests as SongRequest[])
                    : (songRequestsSubsData?.songRequestsSubs as SongRequest[])
                }
              />
            )}
          </ScrollView>

          {!box?.isJoined ? (
            <Button label="Join this event" onPress={handleJoinBox} />
          ) : (
            <View style={tw`my-2`}>
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
            </View>
          )}
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default BoxScreen;
