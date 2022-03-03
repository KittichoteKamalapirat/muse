import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql", //process.env.NEXT_PUBLIC_SERVER_URL
  credentials: "include",
  cache: new InMemoryCache(),
});

export * from "./generated/graphql";
export * from "./styling/variables";

// // @generated by expo-yarn-workspaces

// import "expo/build/Expo.fx";
// import { activateKeepAwake } from "expo-keep-awake";
// import registerRootComponent from "expo/build/launch/registerRootComponent";

// import App from "../App";

// if (__DEV__) {
//   activateKeepAwake();
// }

// registerRootComponent(App);