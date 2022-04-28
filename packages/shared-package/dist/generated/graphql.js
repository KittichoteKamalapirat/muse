var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
var defaultOptions = {};
export var CartItemStatus;
(function (CartItemStatus) {
  CartItemStatus["Cancelled"] = "Cancelled";
  CartItemStatus["Delivered"] = "Delivered";
  CartItemStatus["OnTheWay"] = "OnTheWay";
  CartItemStatus["PaymentPending"] = "PaymentPending";
  CartItemStatus["Received"] = "Received";
  CartItemStatus["Refunded"] = "Refunded";
  CartItemStatus["ToDeliver"] = "ToDeliver";
  CartItemStatus["UnOrdered"] = "UnOrdered";
})(CartItemStatus || (CartItemStatus = {}));
export var RegularErrorFragmentDoc = gql(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        "\n    fragment RegularError on FieldError {\n  field\n  message\n}\n    ",
      ],
      [
        "\n    fragment RegularError on FieldError {\n  field\n  message\n}\n    ",
      ]
    ))
);
export var RegularUserFragmentDoc = gql(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        "\n    fragment RegularUser on User {\n  id\n  username\n  email\n  phonenumber\n  avatar\n  userReview {\n    reviewScore\n    reviewCounter\n  }\n  isCreator\n  about\n  followerNum\n}\n    ",
      ],
      [
        "\n    fragment RegularUser on User {\n  id\n  username\n  email\n  phonenumber\n  avatar\n  userReview {\n    reviewScore\n    reviewCounter\n  }\n  isCreator\n  about\n  followerNum\n}\n    ",
      ]
    ))
);
export var RegularUserResponseFragmentDoc = gql(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      [
        "\n    fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}\n    ",
        "\n",
        "",
      ],
      [
        "\n    fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}\n    ",
        "\n",
        "",
      ]
    )),
  RegularErrorFragmentDoc,
  RegularUserFragmentDoc
);
export var PostSnippetFragmentDoc = gql(
  templateObject_4 ||
    (templateObject_4 = __makeTemplateObject(
      [
        "\n    fragment PostSnippet on Post {\n  id\n  title\n  textSnippet\n  videoUrl\n  thumbnailUrl\n  createdAt\n  updatedAt\n  points\n  voteStatus\n  mealkits {\n    id\n    name\n    images\n    price\n    portion\n    reviewAvg\n    reviewsCounter\n  }\n  creator {\n    id\n    username\n    avatar\n  }\n}\n    ",
      ],
      [
        "\n    fragment PostSnippet on Post {\n  id\n  title\n  textSnippet\n  videoUrl\n  thumbnailUrl\n  createdAt\n  updatedAt\n  points\n  voteStatus\n  mealkits {\n    id\n    name\n    images\n    price\n    portion\n    reviewAvg\n    reviewsCounter\n  }\n  creator {\n    id\n    username\n    avatar\n  }\n}\n    ",
      ]
    ))
);
export var ReadOrderNotisDocument = gql(
  templateObject_5 ||
    (templateObject_5 = __makeTemplateObject(
      ["\n    mutation readOrderNotis {\n  readOrderNotis\n}\n    "],
      ["\n    mutation readOrderNotis {\n  readOrderNotis\n}\n    "]
    ))
);
/**
 * __useReadOrderNotisMutation__
 *
 * To run a mutation, you first call `useReadOrderNotisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadOrderNotisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readOrderNotisMutation, { data, loading, error }] = useReadOrderNotisMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadOrderNotisMutation(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useMutation(ReadOrderNotisDocument, options);
}
export var LoginDocument = gql(
  templateObject_6 ||
    (templateObject_6 = __makeTemplateObject(
      [
        "\n    mutation Login($usernameOrEmailOrPhonenumber: String!, $password: String!) {\n  login(\n    usernameOrEmailOrPhonenumber: $usernameOrEmailOrPhonenumber\n    password: $password\n  ) {\n    ...RegularUserResponse\n  }\n}\n    ",
        "",
      ],
      [
        "\n    mutation Login($usernameOrEmailOrPhonenumber: String!, $password: String!) {\n  login(\n    usernameOrEmailOrPhonenumber: $usernameOrEmailOrPhonenumber\n    password: $password\n  ) {\n    ...RegularUserResponse\n  }\n}\n    ",
        "",
      ]
    )),
  RegularUserResponseFragmentDoc
);
/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmailOrPhonenumber: // value for 'usernameOrEmailOrPhonenumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useMutation(LoginDocument, options);
}
export var RegisterDocument = gql(
  templateObject_7 ||
    (templateObject_7 = __makeTemplateObject(
      [
        "\n    mutation Register($data: UsernamePasswordInput!) {\n  register(data: $data) {\n    ...RegularUserResponse\n  }\n}\n    ",
        "",
      ],
      [
        "\n    mutation Register($data: UsernamePasswordInput!) {\n  register(data: $data) {\n    ...RegularUserResponse\n  }\n}\n    ",
        "",
      ]
    )),
  RegularUserResponseFragmentDoc
);
/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useMutation(RegisterDocument, options);
}
export var OrderNotisDocument = gql(
  templateObject_8 ||
    (templateObject_8 = __makeTemplateObject(
      [
        "\n    query orderNotis {\n  orderNotis {\n    id\n    message\n    read\n    cartItemId\n    createdAt\n    cartItem {\n      id\n      quantity\n      status\n      user {\n        username\n      }\n      mealkit {\n        name\n        images\n      }\n    }\n  }\n}\n    ",
      ],
      [
        "\n    query orderNotis {\n  orderNotis {\n    id\n    message\n    read\n    cartItemId\n    createdAt\n    cartItem {\n      id\n      quantity\n      status\n      user {\n        username\n      }\n      mealkit {\n        name\n        images\n      }\n    }\n  }\n}\n    ",
      ]
    ))
);
/**
 * __useOrderNotisQuery__
 *
 * To run a query within a React component, call `useOrderNotisQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderNotisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderNotisQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderNotisQuery(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useQuery(OrderNotisDocument, options);
}
export function useOrderNotisLazyQuery(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useLazyQuery(OrderNotisDocument, options);
}
export var PostsDocument = gql(
  templateObject_9 ||
    (templateObject_9 = __makeTemplateObject(
      [
        "\n    query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      ...PostSnippet\n    }\n  }\n}\n    ",
        "",
      ],
      [
        "\n    query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      ...PostSnippet\n    }\n  }\n}\n    ",
        "",
      ]
    )),
  PostSnippetFragmentDoc
);
/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useQuery(PostsDocument, options);
}
export function usePostsLazyQuery(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useLazyQuery(PostsDocument, options);
}
export var MeDocument = gql(
  templateObject_10 ||
    (templateObject_10 = __makeTemplateObject(
      ["\n    query Me {\n  me {\n    ...RegularUser\n  }\n}\n    ", ""],
      ["\n    query Me {\n  me {\n    ...RegularUser\n  }\n}\n    ", ""]
    )),
  RegularUserFragmentDoc
);
/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useQuery(MeDocument, options);
}
export function useMeLazyQuery(baseOptions) {
  var options = __assign(__assign({}, defaultOptions), baseOptions);
  return Apollo.useLazyQuery(MeDocument, options);
}
var templateObject_1,
  templateObject_2,
  templateObject_3,
  templateObject_4,
  templateObject_5,
  templateObject_6,
  templateObject_7,
  templateObject_8,
  templateObject_9,
  templateObject_10;
//# sourceMappingURL=graphql.js.map
