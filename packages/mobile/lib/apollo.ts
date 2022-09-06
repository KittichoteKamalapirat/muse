import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { urlResolver } from "./UrlResolver";

const httpLink = new HttpLink({
  uri: urlResolver.graphql(),
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: urlResolver.graphqlSocket(),
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  credentials: "include",
  cache: new InMemoryCache(),
});
