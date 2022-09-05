import { ApolloProvider } from "@apollo/client";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
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

  // for hiding tab in onboarding screen
  const [routeName, setRouteName] = useState("");
  const ref = createNavigationContainerRef();

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer
        ref={ref}
        onReady={() => {
          setRouteName(ref.getCurrentRoute().name);
        }}
        onStateChange={async () => {
          const previousRouteName = routeName;
          const currentRouteName = ref.getCurrentRoute().name;
          setRouteName(currentRouteName);
        }}
      >
        <TabNavigator routeName={routeName} />
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserContext.Provider>
  );
};
