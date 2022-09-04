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

  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("user", "null"); // remove persisted data
      setCurrentUser(null); //remove use context and trigger useEffect

      await logout(); //redis removed -> meQuery wouldn't work now
      navigation.navigate("Auth");
      await apolloClient.resetStore();
      setCurrentUser(null);
    } catch (error) {
      console.log("error logging out");
    }
  };

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
