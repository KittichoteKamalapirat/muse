import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Alert, Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { UserContext } from "../context/UserContext";
import {
  useDeleteUserMutation,
  useLogoutMutation,
} from "../graphql/generated/graphql";
import { apolloClient } from "../lib/apollo";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Tab = createBottomTabNavigator();

const SettingScreen = ({ navigation }: Props) => {
  console.log("setting screen");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("current user in setting", currentUser);
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const [deleteUser] = useDeleteUserMutation();

  const createTwoButtonAlert = () =>
    Alert.alert("Are you sure?", "This action cannot be undone", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => handleDeleteUser(),
      },
    ]);

  const handleDeleteUser = async () => {
    try {
      setCurrentUser(null); //remove currentUser in Context which trigger useEffect
      await AsyncStorage.setItem("user", "null"); // remove persisted data
      const result = await deleteUser({
        update: (cache) => {
          cache.evict({ fieldName: "me" }); // TODO do I need this?
        },
      }); //redis removed -> meQuery wouldn't work now
      const cacheResult = await apolloClient.resetStore();
      console.log("-------result-------", result.data);
      if (result.data?.deleteUser) navigation.navigate("Auth");
    } catch (error) {
      console.log("error deleting user", error);
    }
  };

  const handleLogout = async () => {
    try {
      setCurrentUser(null); //remove currentUser in Context which trigger useEffect
      await AsyncStorage.setItem("user", "null"); // remove persisted data
      console.log("current user in handle logout 1", currentUser);
      const result = await logout({
        update: (cache) => {
          cache.evict({ fieldName: "me" }); // TODO do I need this?
        },
      }); //redis removed -> meQuery wouldn't work now
      const cacheResult = await apolloClient.resetStore();
      console.log("cache result", cacheResult);
      if (result.data?.logout) navigation.navigate("Auth");

      console.log("current user in handle logout 2", currentUser);
    } catch (error) {
      console.log("error logging out");
    }
  };

  const loggedInBody = (
    <View>
      <View style={tw`bg-grey-850`}>
        <View style={tw`flex-row items-center m-2`}>
          <Image
            style={tw`w-20 h-20 rounded-full bg-grey-500 mr-2`}
            source={{ uri: currentUser?.avatar }}
          />
          <View>
            <MyText fontColor="text-grey-300">
              username:{" "}
              <MyText>
                {currentUser?.isGuest
                  ? `Guest-${currentUser.username.slice(0, 6)}`
                  : currentUser?.username}
              </MyText>
            </MyText>

            <MyText fontColor="text-grey-300" extraStyle="mt-2">
              email:{" "}
              <MyText>
                {currentUser?.isGuest ? "No email" : currentUser?.email}
              </MyText>
            </MyText>
          </View>
        </View>
      </View>
      <View style={tw`mt-4`}>
        <Button label="Logout" onPress={handleLogout} type={ButtonTypes.TEXT} />
      </View>

      <View style={tw`mt-4`}>
        <Button
          label="Delete Account"
          onPress={createTwoButtonAlert}
          type={ButtonTypes.TEXT}
          fontColor="text-red"
        />
      </View>
    </View>
  );

  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View>
          {currentUser ? (
            loggedInBody
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
      </Container>
    </ScreenLayout>
  );
};

export default SettingScreen;
