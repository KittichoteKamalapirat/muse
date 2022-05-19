// higher order component
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createWithApollo } from "./createWithApollo";
import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from "next";
import { urlResolver } from "../lib/UrlResolver";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    uri: urlResolver.graphql(),
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [], //we want a key that doesn't change rashii -> so the query replace
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  __typename: "PaginatedPosts",
                  hasMore: incoming.hasMore, //or ...incoming
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
