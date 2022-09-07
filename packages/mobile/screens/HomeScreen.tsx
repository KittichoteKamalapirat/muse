import React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import BoxListing from "../components/listing/boxes/BoxListing";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  console.log("home screen, BoxesScreen");

  return (
    <ScreenLayout>
      <Container>
        <View style={tw`h-full`}>
          <BoxListing />
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default HomeScreen;
