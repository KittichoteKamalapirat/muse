import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import { UserContext } from "../context/UserContext";
import { useLogoutMutation } from "../graphql/generated/graphql";
import { apolloClient } from "../lib/apollo";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Tab = createBottomTabNavigator();

const SettingScreen = ({ navigation }: Props) => {
  const { setCurrentUser } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("user", "null"); // remove persisted data
      setCurrentUser(null); //remove use context and trigger useEffect

      await logout(); //redis removed -> meQuery wouldn't work now
      navigation.navigate("Home");
      await apolloClient.resetStore();
      setCurrentUser(null);
    } catch (error) {
      console.log("error logging out");
    }
  };

  return (
    <ScreenLayout>
      <Text>Login</Text>
      <Text>Log out</Text>
    </ScreenLayout>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
