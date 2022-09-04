import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import BoxListing from "../components/listing/boxes/BoxListing";
import { UserContext } from "../context/UserContext";
import {
  Box,
  useBoxesQuery,
  useLogoutMutation,
} from "../graphql/generated/graphql";
import { apolloClient } from "../lib/apollo";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }: Props) => {
  console.log("home screen, BoxesScreen");

  const {
    data: boxesData,
    loading: boxesLoading,
    error: boxesError,
  } = useBoxesQuery();

  console.log("boxes", boxesData?.boxes.length);

  const { setCurrentUser } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);
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
          boxes={(boxesData?.boxes as Box[]) || []}
          loading={boxesLoading}
          error={boxesError}
        />
        {currentUser ? (
          <Button label="Logout" onPress={handleLogout} />
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

export default HomeScreen;

const styles = StyleSheet.create({});
