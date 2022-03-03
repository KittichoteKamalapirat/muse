// higher order component
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createWithApollo } from "./createWithApollo";
import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from "next";
const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
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
            // address(existing, { canRead, toReference }) {
            //   console.log(existing);
            //   console.log(canRead);
            //   console.log(toReference);
            //   // return {
            //   //   __typename: "address",
            //   //   address: existing,
            //   // };
            //   return existing;
            // },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
