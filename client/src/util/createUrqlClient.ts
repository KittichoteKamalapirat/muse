import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          //replace is for redirection
          Router.replace("/login");
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info; //parentKey = Query, fieldName = posts
    console.log("entityKey, fieldName");
    console.log(entityKey, fieldName);
    const allFields = cache.inspectFields(entityKey); // field in the cache could be me from meQuery as well
    console.log("allFields");
    console.log(allFields);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName); //filter only the posts fieldname
    console.log("fieldInfos");
    console.log(fieldInfos);
    const size = fieldInfos.length; //if size - 0, no cache with field name = posts -> no posts yet? pa wa
    console.log("size");
    console.log(size);
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`; //posts({"cursor":"192394123412", "limit":10})
    const isItInTheCache = cache.resolve(entityKey, fieldKey);
    info.partial = !isItInTheCache;
    // let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const data = cache.resolve(entityKey, fi.fieldKey) as string[]; //meaning for the query, get posts\
      results.push(...data);
    });
    console.log("______");
    console.log("results");
    console.log(results);
    console.log("++++++");
    return results;

    // return {
    //   __typename: "PaginatedPosts",
    //   hasMore,
    //   posts: results,
    // };
  };
};
export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          posts: cursorPagination(), //the name "posts" match what we have in posts in posts.graphql
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            // when LogoutMutation => Update MeQuery
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          //login match the resolver function name
          login: (_result, args, cache, info) => {
            // cache.updateQuery({ query: MeDocument}, ( MeQuery) => {})
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,

              // MeDocument is just query asking for usergql`
              // query Me {
              //   me {
              //     ...RegularUser
              //   }
              // }
              { query: MeDocument },
              _result,
              (result, query) => {
                // updater function
                // query = MeQuery

                // if the result is error
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          register: (_result, args, cache, info) => {
            // cache.updateQuery({ query: MeDocument}, ( MeQuery) => {})
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
