import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
import { User } from "./graphql/generated/graphql";
import { apolloClient } from "./lib/apollo";
import TabNavigator from "./navigations/TabNavigator";
import useSetUserContext from "./util/useSetUserContext";

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
  console.log("app.tsx");
  const { currentUser, setCurrentUser } = useSetUserContext();

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
    </UserContext.Provider>
  );
};
