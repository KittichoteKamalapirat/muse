import { Cache, QueryInput } from "@urql/exchange-graphcache";

// helper function to cast a type that urql is not good at
export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  // Query input =  { query, variables } which is the query we'd like to write to the cache. A
  queryInput: QueryInput,
  result: any,
  // update function
  fn: (result: Result, q: Query) => Query
) {
  // Here is the key function
  // update Query!
  return cache.updateQuery(
    // queryInput is the query we'd like to cache, 2nd argument
    queryInput,
    // Next is the updater function, 4th argument
    (data) => fn(result, data as any) as any
  );
}
