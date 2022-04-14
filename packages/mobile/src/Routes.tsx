import React, { useContext, useEffect, useState } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { Center } from "./components/Container/Center";
import { AuthNavProps, AuthParamList } from "./utils/AuthParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./components/AuthProvider";

import { AuthStack } from "./components/stacks/auth/AuthStack";
import { AppTab } from "./components/stacks/protected/AppTab";

interface RoutesProps {}

const Stack = createNativeStackNavigator<AuthParamList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //check whether the user is logged in or not (cache wise, like a user is saved?)
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          //decode
          //   setLoading(false);
          login(user?.username as string, "password"); // TODO automatically log in //fix later
        }
        //user is null
        setLoading(false); //no need to do anything

        console.log({ userString });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};
