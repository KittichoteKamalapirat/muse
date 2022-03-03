import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@cookknow/shared-package";
// import { Providers } from "./src/components/Providers";
import { AuthProvider } from "./src/components/AuthProvider";
import { Routes } from "./src/Routes";

// export default Providers;
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
}
