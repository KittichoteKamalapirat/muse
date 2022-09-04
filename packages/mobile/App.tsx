import { ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SpotifyTokenContext } from "./context/SpotifyTokenContext";
import { UserContext } from "./context/UserContext";
import { SpotifyToken, useMeQuery, User } from "./graphql/generated/graphql";
import { apolloClient } from "./lib/apollo";

import TabNavigator from "./navigations/TabNavigator";
import AuthScreen from "./screens/AuthScreen";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AppWithoutApollo />
    </ApolloProvider>
  );
}

const AppWithoutApollo = () => {
  console.log("App.tsx");
  AsyncStorage.getItem("user").then((user) =>
    console.log("data in async storage", user)
  );

  const [token, setToken] = useState<SpotifyToken>({
    accessToken: "",
    expiresIn: 0,
  });
  const [currentUser, setCurrentUser] = useState<User | null>();
  const { data, loading } = useMeQuery();

  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      let userObj = null;

      if (user) {
        userObj = JSON.parse(user);
      }
      setCurrentUser(userObj);

      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      console.log("error getting current user");
    }
  };

  const storeData = async (value: User | null | undefined) => {
    try {
      const jsonValue = JSON.stringify(value);
      // set data for persist storage
      await AsyncStorage.setItem("user", jsonValue);

      if (data?.me) {
        // set data for UserContext
        setCurrentUser(data?.me as User);
      }
    } catch (e) {
      console.log("error setting current user");
    }
  };

  // retrieve item
  useEffect(() => {
    getData();
  }, []);

  // set Item
  useEffect(() => {
    storeData(currentUser);
  }, [currentUser, data?.me?.id]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SpotifyTokenContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        <NavigationContainer>
          {/* <AppStack.Navigator> */}
          {/* <AppStack.Screen name="Auth" component={AuthScreen} /> */}
          {/* <AppStack.Screen name="Home" component={TabNavigator} /> */}

          {/* <AppStack.Screen name="Settings" component={Settings} /> */}
          {/* </AppStack.Navigator> */}

          <TabNavigator />
          {/* <DrawerNavigator /> */}
          <StatusBar style="auto" />
        </NavigationContainer>
      </SpotifyTokenContext.Provider>
    </UserContext.Provider>
  );
};
