import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import BoxListing from "../components/listing/boxes/BoxListing";
import { Box, useBoxesQuery } from "../graphql/generated/graphql";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  console.log("home screen, BoxesScreen");

  const {
    data: boxesData,
    loading: boxesLoading,
    error: boxesError,
  } = useBoxesQuery();

  return (
    <ScreenLayout>
      <Container>
        <View style={tw`h-full`}>
          <BoxListing
            boxes={(boxesData?.boxes as Box[]) || []}
            loading={boxesLoading}
            error={boxesError}
          />
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default HomeScreen;
