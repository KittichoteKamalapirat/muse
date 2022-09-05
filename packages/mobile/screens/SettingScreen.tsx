import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { UserContext } from "../context/UserContext";
import { useLogoutMutation } from "../graphql/generated/graphql";
import { apolloClient } from "../lib/apollo";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Tab = createBottomTabNavigator();

const SettingScreen = ({ navigation }: Props) => {
  console.log("setting screen");
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
    <ScreenLayout justifyContent="justify-start">
      <View>
        {currentUser ? (
          <View>
            <View style={tw`flex-row items-center`}>
              <Image
                style={tw`w-20 h-20 rounded-full`}
                source={{ uri: currentUser?.avatar }}
              />
              <MyText>{currentUser.username}</MyText>
            </View>

            <Button
              label="Logout"
              onPress={handleLogout}
              type={ButtonTypes.TEXT}
            />
          </View>
        ) : (
          <Button
            label="Login"
            onPress={() =>
              navigation.navigate("Login", {
                next: "Home",
              })
            }
          />
        )}
      </View>
    </ScreenLayout>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
