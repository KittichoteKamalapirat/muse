import React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import BoxListing from "../components/listing/boxes/BoxListing";
import { Box, useJoinedBoxesQuery } from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import useSetUserContext from "../util/useSetUserContext";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const JoinedBoxesScreen = () => {
  console.log("joined box screen");
  useSetUserContext();

  const {
    data: boxesData,
    loading: boxesLoading,
    error: boxesError,
  } = useJoinedBoxesQuery();

  return (
    <ScreenLayout>
      <Container>
        <View style={tw`h-full`}>
          <BoxListing
            boxes={(boxesData?.joinedBoxes as Box[]) || []}
            loading={boxesLoading}
            error={boxesError}
          />
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default JoinedBoxesScreen;
