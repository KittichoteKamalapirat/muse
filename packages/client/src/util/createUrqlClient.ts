import {
  dedupExchange,
  Exchange,
  fetchExchange,
  gql,
  stringifyVariables,
} from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  VoteMutationVariables,
  DeletePostMutationVariables,
} from "../generated/graphql";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { isServer } from "./isServer";

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
    // console.log(`entityKey = ${entityKey}`); //parentKey = Query
    // console.log(`fieldName = ${fieldName}`); //fieldName = posts
    const allFields = cache.inspectFields(entityKey); // field in the cache could be me from meQuery as well

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName); //filter only the posts fieldname
    const size = fieldInfos.length; //if size = 0, no cache with field name = posts -> no posts yet? pa wa
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`; //posts({"cursor":"192394123412", "limit":10})
    // console.log(`fieldKey = ${fieldKey}`); //fieldKey = posts({"limit":20})
    const isItInTheCache = cache.resolve(entityKey, fieldKey); //resolve("Query", posts) => Query{posts}
    info.partial = !isItInTheCache; // to indicate that some data is uncached and missing
    // if it's in the cache === true -> info.partial = false -> some data is cached -> no need to cache again?

    let hasMore = true; //hasMore outside the
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      // console.log("key");
      // console.log(key);
      const data = cache.resolve(key, "posts") as string[]; //meaning for the query, get posts({"cursor":"192394123412", "limit":10})
      // console.log("data");
      // console.log(data);
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    const returnObj = {
      __typename: "PaginatedPosts",
      hasMore: hasMore,
      posts: results,
    };

    // console.log("returnObj");
    // console.log(returnObj);
    return returnObj;
  };
};

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query"); // field in the cache could be me from meQuery as well
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts"); //filter only the posts fieldname
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments);
  });
};
export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie; //need if condition because this code runs on both browser and next.js server (browser -> next.js -> graphql)
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie: cookie } : undefined,
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
            deleteAddress: (_result, args, cache) => {
              console.log("delete Address");
              cache.invalidate({
                __typename: "Address",
              });
            },
            deletePost: (_result, args, cache) => {
              console.log("delete post cache");
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },
            vote: (_result, args, cache) => {
              const { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              );
              if (data) {
                if (data.voteStatus === args.value) {
                  return; //do nothing if voteStatus = 1 and we're trying to vote 1 again via args
                }
                const newPoints =
                  data.points + (!data.voteStatus ? 1 : 2) * value; //if we're changing the vote, it will be 2 points different
                cache.writeFragment(
                  gql`
                    fragment _ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value }
                );
              }
            },
            createPost: (_result, args, cache) => {
              // cache.invalidate("Query", "posts", { //refetch the data from the server to the cache
              //   limit: 20,
              // });

              invalidateAllPosts(cache);
            },
            logout: (_result, args, cache) => {
              // when LogoutMutation => Update MeQuery
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            //login match the resolver function name
            login: (_result, args, cache) => {
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
              invalidateAllPosts(cache);
            },

            register: (_result, args, cache) => {
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
  };
};
