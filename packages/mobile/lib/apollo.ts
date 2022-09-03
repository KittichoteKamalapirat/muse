import { ApolloClient, InMemoryCache } from "@apollo/client";
import { urlResolver } from "./UrlResolver";

export const apolloClient = new ApolloClient({
  uri: urlResolver.graphql(),
  credentials: "include",
  cache: new InMemoryCache(),
});
