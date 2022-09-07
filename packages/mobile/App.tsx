import { ApolloProvider } from "@apollo/client";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { SpotifyTokenContext } from "./context/SpotifyTokenContext";
import { UserContext } from "./context/UserContext";
import { SpotifyToken, User } from "./graphql/generated/graphql";
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

  useSetUserContext();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [token, setToken] = useState<SpotifyToken>({
    accessToken: "",
    expiresIn: 0,
  });

  const userProviderValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );
  const tokenProviderValue = useMemo(
    () => ({ token, setToken }),
    [token, setToken]
  );

  // for hiding tab in onboarding screen
  const [routeName, setRouteName] = useState("");
  const ref = createNavigationContainerRef();

  // load fonts

  return (
    <UserContext.Provider value={userProviderValue}>
      <SpotifyTokenContext.Provider value={tokenProviderValue}>
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
      </SpotifyTokenContext.Provider>
    </UserContext.Provider>
  );
};
