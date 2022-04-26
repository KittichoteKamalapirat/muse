import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "./components/AuthProvider";
import { Center } from "./components/Container/Center";
import { AuthStack } from "./components/stacks/auth/AuthStack";
import { AppTab } from "./components/stacks/protected/AppTab";
import { AuthParamList } from "./utils/AuthParamList";

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
