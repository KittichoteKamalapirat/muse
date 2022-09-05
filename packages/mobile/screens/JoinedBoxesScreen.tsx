import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import BoxListing from "../components/listing/boxes/BoxListing";
import ScreenLayout from "../components/layouts/ScreenLayout";
import { UserContext } from "../context/UserContext";
import {
  Box,
  useJoinedBoxesQuery,
  useLogoutMutation,
} from "../graphql/generated/graphql";
import { apolloClient } from "../lib/apollo";
import tw from "../lib/tailwind";
import useSetUserContext from "../util/useSetUserContext";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Tab = createBottomTabNavigator();

const JoinedBoxesScreen = ({ navigation }: Props) => {
  useSetUserContext();
  console.log("joined box screen");
  const { setCurrentUser } = useContext(UserContext);
  const {
    data: boxesData,
    loading: boxesLoading,
    error: boxesError,
  } = useJoinedBoxesQuery();

  return (
    <ScreenLayout>
      <View style={tw`h-full`}>
        <BoxListing
          boxes={(boxesData?.joinedBoxes as Box[]) || []}
          loading={boxesLoading}
          error={boxesError}
        />
      </View>
    </ScreenLayout>
  );
};

export default JoinedBoxesScreen;

const styles = StyleSheet.create({});
