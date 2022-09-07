import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Address = {
  __typename?: "Address";
  boxes: Array<Box>;
  createdAt: Scalars["DateTime"];
  id: Scalars["String"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type Box = {
  __typename?: "Box";
  address?: Maybe<Address>;
  addressId: Scalars["String"];
  createdAt: Scalars["String"];
  creator: User;
  creatorId: Scalars["String"];
  description: Scalars["String"];
  endTime: Scalars["DateTime"];
  id: Scalars["String"];
  isJoined?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  songRequests: Array<SongRequest>;
  startTime: Scalars["DateTime"];
  type: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type BoxInput = {
  addressName: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  endTime?: InputMaybe<Scalars["DateTime"]>;
  name?: InputMaybe<Scalars["String"]>;
  startTime?: InputMaybe<Scalars["DateTime"]>;
  type: BoxTypeEnum;
};

export enum BoxTypeEnum {
  Bar = "BAR",
  DanceClub = "DANCE_CLUB",
  MusicEvent = "MUSIC_EVENT",
  Other = "OTHER",
  Restaurant = "RESTAURANT",
  Wedding = "WEDDING",
}

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addSongRequest: SongRequest;
  changePassword: UserResponse;
  createAddress: Address;
  createBox: Box;
  createSong: Song;
  forgotPassword: Scalars["Boolean"];
  guestLogin: UserResponse;
  joinBox: Scalars["Boolean"];
  login: UserResponse;
  logout: Scalars["Boolean"];
  register: UserResponse;
  switchAccountType: Scalars["Boolean"];
  unjoinBox: Scalars["Boolean"];
  updateAvatar: User;
  updateUser: User;
  vote: Scalars["Boolean"];
};

export type MutationAddSongRequestArgs = {
  boxId: Scalars["String"];
  songInput: SongInput;
  spotifyTrackId: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateAddressArgs = {
  name: Scalars["String"];
};

export type MutationCreateBoxArgs = {
  input: BoxInput;
};

export type MutationCreateSongArgs = {
  input: SongInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationJoinBoxArgs = {
  boxId: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmailOrPhoneNumber: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: UsernamePasswordInput;
};

export type MutationSwitchAccountTypeArgs = {
  becomeMusician: Scalars["Boolean"];
};

export type MutationUnjoinBoxArgs = {
  boxId: Scalars["String"];
};

export type MutationUpdateAvatarArgs = {
  newAvatar: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  input: UserInput;
};

export type MutationVoteArgs = {
  songRequestId: Scalars["String"];
  value: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  address: Address;
  addresses: Array<Address>;
  box: Box;
  boxes: Array<Box>;
  getSpotifyAccessToken: SpotifyToken;
  joinedBoxes: Array<Box>;
  me?: Maybe<User>;
  song: Song;
  songRequest: SongRequest;
  songRequests: Array<SongRequest>;
  songs: Array<Song>;
  user: User;
  users: Array<User>;
};

export type QueryAddressArgs = {
  id: Scalars["String"];
};

export type QueryBoxArgs = {
  id: Scalars["String"];
};

export type QuerySongArgs = {
  id: Scalars["String"];
};

export type QuerySongRequestArgs = {
  id: Scalars["String"];
};

export type QuerySongRequestsArgs = {
  boxId: Scalars["String"];
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type Song = {
  __typename?: "Song";
  albumImageUrl: Scalars["String"];
  albumName: Scalars["String"];
  artistName: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["String"];
  name: Scalars["String"];
  songRequests: Array<SongRequest>;
  spotifyTrackId: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type SongInput = {
  albumImageUrl: Scalars["String"];
  albumName: Scalars["String"];
  artistName: Scalars["String"];
  name: Scalars["String"];
};

export type SongRequest = {
  __typename?: "SongRequest";
  box: Box;
  boxId: Scalars["String"];
  counts: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  id: Scalars["String"];
  isRequested?: Maybe<Scalars["Boolean"]>;
  requester: User;
  requesterId: Scalars["String"];
  song: Song;
  songId: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  voteStatus?: Maybe<Scalars["Int"]>;
};

export type SpotifyToken = {
  __typename?: "SpotifyToken";
  accessToken?: Maybe<Scalars["String"]>;
  expiresIn?: Maybe<Scalars["Int"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  songRequestsSubs: Array<SongRequest>;
};

export type SubscriptionSongRequestsSubsArgs = {
  boxId: Scalars["String"];
};

export type User = {
  __typename?: "User";
  about?: Maybe<Scalars["String"]>;
  avatar: Scalars["String"];
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  followerNum: Scalars["Float"];
  id: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  isFollowed: Scalars["Boolean"];
  isGuest: Scalars["Boolean"];
  isMusician: Scalars["Boolean"];
  songRequests: Array<SongRequest>;
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
};

export type UserInput = {
  about: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

/** Argument for register user */
export type UsernamePasswordInput = {
  email: Scalars["String"];
  isMusician?: InputMaybe<Scalars["Boolean"]>;
  password?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type RegularErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type RegularUserFragment = {
  __typename?: "User";
  id: string;
  username: string;
  email: string;
  avatar: string;
};

export type RegularUserResponseFragment = {
  __typename?: "UserResponse";
  errors?: Array<{
    __typename?: "FieldError";
    field: string;
    message: string;
  }> | null;
  user?: {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
    avatar: string;
  } | null;
};

export type CreateBoxMutationVariables = Exact<{
  input: BoxInput;
}>;

export type CreateBoxMutation = {
  __typename?: "Mutation";
  createBox: {
    __typename?: "Box";
    id: string;
    name: string;
    description: string;
    type: string;
    startTime: any;
    endTime: any;
  };
};

export type CreateSongMutationVariables = Exact<{
  input: SongInput;
}>;

export type CreateSongMutation = {
  __typename?: "Mutation";
  createSong: {
    __typename?: "Song";
    id: string;
    name: string;
    albumName: string;
    albumImageUrl: string;
    artistName: string;
  };
};

export type AddSongRequestMutationVariables = Exact<{
  spotifyTrackId: Scalars["String"];
  songInput: SongInput;
  boxId: Scalars["String"];
}>;

export type AddSongRequestMutation = {
  __typename?: "Mutation";
  addSongRequest: {
    __typename?: "SongRequest";
    id: string;
    songId: string;
    boxId: string;
    counts: number;
  };
};

export type VoteMutationVariables = Exact<{
  value: Scalars["Int"];
  songRequestId: Scalars["String"];
}>;

export type VoteMutation = { __typename?: "Mutation"; vote: boolean };

export type GuestLoginMutationVariables = Exact<{ [key: string]: never }>;

export type GuestLoginMutation = {
  __typename?: "Mutation";
  guestLogin: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      avatar: string;
    } | null;
  };
};

export type LoginMutationVariables = Exact<{
  usernameOrEmailOrPhoneNumber: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      avatar: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
    avatar: string;
  } | null;
};

export type RegisterMutationVariables = Exact<{
  data: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      avatar: string;
    } | null;
  };
};

export type BoxQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type BoxQuery = {
  __typename?: "Query";
  box: {
    __typename?: "Box";
    id: string;
    name: string;
    description: string;
    isJoined?: boolean | null;
    address?: { __typename?: "Address"; id: string; name: string } | null;
    songRequests: Array<{
      __typename?: "SongRequest";
      id: string;
      voteStatus?: number | null;
      isRequested?: boolean | null;
      requesterId: string;
      songId: string;
      counts: number;
      requester: { __typename?: "User"; id: string };
      song: {
        __typename?: "Song";
        name: string;
        artistName: string;
        albumName: string;
        albumImageUrl: string;
      };
    }>;
  };
};

export type BoxesQueryVariables = Exact<{ [key: string]: never }>;

export type BoxesQuery = {
  __typename?: "Query";
  boxes: Array<{
    __typename?: "Box";
    id: string;
    name: string;
    isJoined?: boolean | null;
    description: string;
    startTime: any;
    type: BoxTypeEnum;
    endTime: any;
    address?: { __typename?: "Address"; id: string; name: string } | null;
  }>;
};

export type JoinBoxMutationVariables = Exact<{
  boxId: Scalars["String"];
}>;

export type JoinBoxMutation = { __typename?: "Mutation"; joinBox: boolean };

export type JoinedBoxesQueryVariables = Exact<{ [key: string]: never }>;

export type JoinedBoxesQuery = {
  __typename?: "Query";
  joinedBoxes: Array<{
    __typename?: "Box";
    id: string;
    name: string;
    description: string;
    isJoined?: boolean | null;
    address?: { __typename?: "Address"; id: string; name: string } | null;
  }>;
};

export type UnjoinBoxMutationVariables = Exact<{
  boxId: Scalars["String"];
}>;

export type UnjoinBoxMutation = { __typename?: "Mutation"; unjoinBox: boolean };

export type SongRequestsQueryVariables = Exact<{
  boxId: Scalars["String"];
}>;

export type SongRequestsQuery = {
  __typename?: "Query";
  songRequests: Array<{
    __typename?: "SongRequest";
    id: string;
    voteStatus?: number | null;
    isRequested?: boolean | null;
    requesterId: string;
    songId: string;
    boxId: string;
    counts: number;
    requester: { __typename?: "User"; id: string };
    song: {
      __typename?: "Song";
      name: string;
      artistName: string;
      albumName: string;
      albumImageUrl: string;
      spotifyTrackId: string;
    };
    box: {
      __typename?: "Box";
      id: string;
      name: string;
      description: string;
      startTime: any;
      endTime: any;
    };
  }>;
};

export type SongRequestsSubsSubscriptionVariables = Exact<{
  boxId: Scalars["String"];
}>;

export type SongRequestsSubsSubscription = {
  __typename?: "Subscription";
  songRequestsSubs: Array<{
    __typename?: "SongRequest";
    id: string;
    voteStatus?: number | null;
    isRequested?: boolean | null;
    requesterId: string;
    songId: string;
    boxId: string;
    counts: number;
    requester: { __typename?: "User"; id: string };
    song: {
      __typename?: "Song";
      name: string;
      artistName: string;
      albumName: string;
      albumImageUrl: string;
      spotifyTrackId: string;
    };
    box: {
      __typename?: "Box";
      id: string;
      name: string;
      description: string;
      startTime: any;
      endTime: any;
    };
  }>;
};

export type GetSpotifyAccessTokenQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetSpotifyAccessTokenQuery = {
  __typename?: "Query";
  getSpotifyAccessToken: {
    __typename?: "SpotifyToken";
    accessToken?: string | null;
    expiresIn?: number | null;
  };
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
    email
    avatar
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const CreateBoxDocument = gql`
  mutation CreateBox($input: BoxInput!) {
    createBox(input: $input) {
      id
      name
      description
      type
      startTime
      endTime
    }
  }
`;
export type CreateBoxMutationFn = Apollo.MutationFunction<
  CreateBoxMutation,
  CreateBoxMutationVariables
>;

/**
 * __useCreateBoxMutation__
 *
 * To run a mutation, you first call `useCreateBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoxMutation, { data, loading, error }] = useCreateBoxMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBoxMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBoxMutation,
    CreateBoxMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBoxMutation, CreateBoxMutationVariables>(
    CreateBoxDocument,
    options
  );
}
export type CreateBoxMutationHookResult = ReturnType<
  typeof useCreateBoxMutation
>;
export type CreateBoxMutationResult = Apollo.MutationResult<CreateBoxMutation>;
export type CreateBoxMutationOptions = Apollo.BaseMutationOptions<
  CreateBoxMutation,
  CreateBoxMutationVariables
>;
export const CreateSongDocument = gql`
  mutation CreateSong($input: SongInput!) {
    createSong(input: $input) {
      id
      name
      albumName
      albumImageUrl
      artistName
    }
  }
`;
export type CreateSongMutationFn = Apollo.MutationFunction<
  CreateSongMutation,
  CreateSongMutationVariables
>;

/**
 * __useCreateSongMutation__
 *
 * To run a mutation, you first call `useCreateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSongMutation, { data, loading, error }] = useCreateSongMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSongMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSongMutation,
    CreateSongMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSongMutation, CreateSongMutationVariables>(
    CreateSongDocument,
    options
  );
}
export type CreateSongMutationHookResult = ReturnType<
  typeof useCreateSongMutation
>;
export type CreateSongMutationResult =
  Apollo.MutationResult<CreateSongMutation>;
export type CreateSongMutationOptions = Apollo.BaseMutationOptions<
  CreateSongMutation,
  CreateSongMutationVariables
>;
export const AddSongRequestDocument = gql`
  mutation AddSongRequest(
    $spotifyTrackId: String!
    $songInput: SongInput!
    $boxId: String!
  ) {
    addSongRequest(
      spotifyTrackId: $spotifyTrackId
      songInput: $songInput
      boxId: $boxId
    ) {
      id
      songId
      boxId
      counts
    }
  }
`;
export type AddSongRequestMutationFn = Apollo.MutationFunction<
  AddSongRequestMutation,
  AddSongRequestMutationVariables
>;

/**
 * __useAddSongRequestMutation__
 *
 * To run a mutation, you first call `useAddSongRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSongRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSongRequestMutation, { data, loading, error }] = useAddSongRequestMutation({
 *   variables: {
 *      spotifyTrackId: // value for 'spotifyTrackId'
 *      songInput: // value for 'songInput'
 *      boxId: // value for 'boxId'
 *   },
 * });
 */
export function useAddSongRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSongRequestMutation,
    AddSongRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddSongRequestMutation,
    AddSongRequestMutationVariables
  >(AddSongRequestDocument, options);
}
export type AddSongRequestMutationHookResult = ReturnType<
  typeof useAddSongRequestMutation
>;
export type AddSongRequestMutationResult =
  Apollo.MutationResult<AddSongRequestMutation>;
export type AddSongRequestMutationOptions = Apollo.BaseMutationOptions<
  AddSongRequestMutation,
  AddSongRequestMutationVariables
>;
export const VoteDocument = gql`
  mutation Vote($value: Int!, $songRequestId: String!) {
    vote(value: $value, songRequestId: $songRequestId)
  }
`;
export type VoteMutationFn = Apollo.MutationFunction<
  VoteMutation,
  VoteMutationVariables
>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      songRequestId: // value for 'songRequestId'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    options
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
export const GuestLoginDocument = gql`
  mutation GuestLogin {
    guestLogin {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type GuestLoginMutationFn = Apollo.MutationFunction<
  GuestLoginMutation,
  GuestLoginMutationVariables
>;

/**
 * __useGuestLoginMutation__
 *
 * To run a mutation, you first call `useGuestLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGuestLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [guestLoginMutation, { data, loading, error }] = useGuestLoginMutation({
 *   variables: {
 *   },
 * });
 */
export function useGuestLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GuestLoginMutation,
    GuestLoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GuestLoginMutation, GuestLoginMutationVariables>(
    GuestLoginDocument,
    options
  );
}
export type GuestLoginMutationHookResult = ReturnType<
  typeof useGuestLoginMutation
>;
export type GuestLoginMutationResult =
  Apollo.MutationResult<GuestLoginMutation>;
export type GuestLoginMutationOptions = Apollo.BaseMutationOptions<
  GuestLoginMutation,
  GuestLoginMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($usernameOrEmailOrPhoneNumber: String!, $password: String!) {
    login(
      usernameOrEmailOrPhoneNumber: $usernameOrEmailOrPhoneNumber
      password: $password
    ) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
 *      usernameOrEmailOrPhoneNumber: // value for 'usernameOrEmailOrPhoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
  mutation Register($data: UsernamePasswordInput!) {
    register(data: $data) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

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
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const BoxDocument = gql`
  query Box($id: String!) {
    box(id: $id) {
      id
      name
      description
      isJoined
      startTime
      endTime
      address {
        id
        name
      }
      songRequests {
        id
        voteStatus
        isRequested
        requesterId
        requester {
          id
        }
        songId
        song {
          name
          artistName
          albumName
          albumImageUrl
        }
        counts
      }
    }
  }
`;

/**
 * __useBoxQuery__
 *
 * To run a query within a React component, call `useBoxQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoxQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBoxQuery(
  baseOptions: Apollo.QueryHookOptions<BoxQuery, BoxQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BoxQuery, BoxQueryVariables>(BoxDocument, options);
}
export function useBoxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BoxQuery, BoxQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BoxQuery, BoxQueryVariables>(BoxDocument, options);
}
export type BoxQueryHookResult = ReturnType<typeof useBoxQuery>;
export type BoxLazyQueryHookResult = ReturnType<typeof useBoxLazyQuery>;
export type BoxQueryResult = Apollo.QueryResult<BoxQuery, BoxQueryVariables>;
export const BoxesDocument = gql`
  query Boxes {
    boxes {
      id
      name
      isJoined
      description
      startTime
      endTime
      type
      address {
        id
        name
      }
    }
  }
`;

/**
 * __useBoxesQuery__
 *
 * To run a query within a React component, call `useBoxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoxesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBoxesQuery(
  baseOptions?: Apollo.QueryHookOptions<BoxesQuery, BoxesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BoxesQuery, BoxesQueryVariables>(
    BoxesDocument,
    options
  );
}
export function useBoxesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BoxesQuery, BoxesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BoxesQuery, BoxesQueryVariables>(
    BoxesDocument,
    options
  );
}
export type BoxesQueryHookResult = ReturnType<typeof useBoxesQuery>;
export type BoxesLazyQueryHookResult = ReturnType<typeof useBoxesLazyQuery>;
export type BoxesQueryResult = Apollo.QueryResult<
  BoxesQuery,
  BoxesQueryVariables
>;
export const JoinBoxDocument = gql`
  mutation JoinBox($boxId: String!) {
    joinBox(boxId: $boxId)
  }
`;
export type JoinBoxMutationFn = Apollo.MutationFunction<
  JoinBoxMutation,
  JoinBoxMutationVariables
>;

/**
 * __useJoinBoxMutation__
 *
 * To run a mutation, you first call `useJoinBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinBoxMutation, { data, loading, error }] = useJoinBoxMutation({
 *   variables: {
 *      boxId: // value for 'boxId'
 *   },
 * });
 */
export function useJoinBoxMutation(
  baseOptions?: Apollo.MutationHookOptions<
    JoinBoxMutation,
    JoinBoxMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<JoinBoxMutation, JoinBoxMutationVariables>(
    JoinBoxDocument,
    options
  );
}
export type JoinBoxMutationHookResult = ReturnType<typeof useJoinBoxMutation>;
export type JoinBoxMutationResult = Apollo.MutationResult<JoinBoxMutation>;
export type JoinBoxMutationOptions = Apollo.BaseMutationOptions<
  JoinBoxMutation,
  JoinBoxMutationVariables
>;
export const JoinedBoxesDocument = gql`
  query JoinedBoxes {
    joinedBoxes {
      id
      name
      isJoined
      description
      startTime
      endTime
      type
      address {
        id
        name
      }
    }
  }
`;

/**
 * __useJoinedBoxesQuery__
 *
 * To run a query within a React component, call `useJoinedBoxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinedBoxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinedBoxesQuery({
 *   variables: {
 *   },
 * });
 */
export function useJoinedBoxesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    JoinedBoxesQuery,
    JoinedBoxesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<JoinedBoxesQuery, JoinedBoxesQueryVariables>(
    JoinedBoxesDocument,
    options
  );
}
export function useJoinedBoxesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    JoinedBoxesQuery,
    JoinedBoxesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<JoinedBoxesQuery, JoinedBoxesQueryVariables>(
    JoinedBoxesDocument,
    options
  );
}
export type JoinedBoxesQueryHookResult = ReturnType<typeof useJoinedBoxesQuery>;
export type JoinedBoxesLazyQueryHookResult = ReturnType<
  typeof useJoinedBoxesLazyQuery
>;
export type JoinedBoxesQueryResult = Apollo.QueryResult<
  JoinedBoxesQuery,
  JoinedBoxesQueryVariables
>;
export const UnjoinBoxDocument = gql`
  mutation UnjoinBox($boxId: String!) {
    unjoinBox(boxId: $boxId)
  }
`;
export type UnjoinBoxMutationFn = Apollo.MutationFunction<
  UnjoinBoxMutation,
  UnjoinBoxMutationVariables
>;

/**
 * __useUnjoinBoxMutation__
 *
 * To run a mutation, you first call `useUnjoinBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnjoinBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unjoinBoxMutation, { data, loading, error }] = useUnjoinBoxMutation({
 *   variables: {
 *      boxId: // value for 'boxId'
 *   },
 * });
 */
export function useUnjoinBoxMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnjoinBoxMutation,
    UnjoinBoxMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnjoinBoxMutation, UnjoinBoxMutationVariables>(
    UnjoinBoxDocument,
    options
  );
}
export type UnjoinBoxMutationHookResult = ReturnType<
  typeof useUnjoinBoxMutation
>;
export type UnjoinBoxMutationResult = Apollo.MutationResult<UnjoinBoxMutation>;
export type UnjoinBoxMutationOptions = Apollo.BaseMutationOptions<
  UnjoinBoxMutation,
  UnjoinBoxMutationVariables
>;
export const SongRequestsDocument = gql`
  query SongRequests($boxId: String!) {
    songRequests(boxId: $boxId) {
      id
      voteStatus
      isRequested
      requesterId
      requester {
        id
      }
      songId
      song {
        name
        artistName
        albumName
        albumImageUrl
        spotifyTrackId
      }
      boxId
      box {
        id
        name
        description
        startTime
        endTime
      }
      counts
    }
  }
`;

/**
 * __useSongRequestsQuery__
 *
 * To run a query within a React component, call `useSongRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongRequestsQuery({
 *   variables: {
 *      boxId: // value for 'boxId'
 *   },
 * });
 */
export function useSongRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SongRequestsQuery,
    SongRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SongRequestsQuery, SongRequestsQueryVariables>(
    SongRequestsDocument,
    options
  );
}
export function useSongRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SongRequestsQuery,
    SongRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SongRequestsQuery, SongRequestsQueryVariables>(
    SongRequestsDocument,
    options
  );
}
export type SongRequestsQueryHookResult = ReturnType<
  typeof useSongRequestsQuery
>;
export type SongRequestsLazyQueryHookResult = ReturnType<
  typeof useSongRequestsLazyQuery
>;
export type SongRequestsQueryResult = Apollo.QueryResult<
  SongRequestsQuery,
  SongRequestsQueryVariables
>;
export const SongRequestsSubsDocument = gql`
  subscription SongRequestsSubs($boxId: String!) {
    songRequestsSubs(boxId: $boxId) {
      id
      voteStatus
      isRequested
      requesterId
      requester {
        id
      }
      songId
      song {
        name
        artistName
        albumName
        albumImageUrl
        spotifyTrackId
      }
      boxId
      box {
        id
        name
        description
        startTime
        endTime
      }
      counts
    }
  }
`;

/**
 * __useSongRequestsSubsSubscription__
 *
 * To run a query within a React component, call `useSongRequestsSubsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSongRequestsSubsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongRequestsSubsSubscription({
 *   variables: {
 *      boxId: // value for 'boxId'
 *   },
 * });
 */
export function useSongRequestsSubsSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SongRequestsSubsSubscription,
    SongRequestsSubsSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    SongRequestsSubsSubscription,
    SongRequestsSubsSubscriptionVariables
  >(SongRequestsSubsDocument, options);
}
export type SongRequestsSubsSubscriptionHookResult = ReturnType<
  typeof useSongRequestsSubsSubscription
>;
export type SongRequestsSubsSubscriptionResult =
  Apollo.SubscriptionResult<SongRequestsSubsSubscription>;
export const GetSpotifyAccessTokenDocument = gql`
  query GetSpotifyAccessToken {
    getSpotifyAccessToken {
      accessToken
      expiresIn
    }
  }
`;

/**
 * __useGetSpotifyAccessTokenQuery__
 *
 * To run a query within a React component, call `useGetSpotifyAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpotifyAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpotifyAccessTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpotifyAccessTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSpotifyAccessTokenQuery,
    GetSpotifyAccessTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSpotifyAccessTokenQuery,
    GetSpotifyAccessTokenQueryVariables
  >(GetSpotifyAccessTokenDocument, options);
}
export function useGetSpotifyAccessTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSpotifyAccessTokenQuery,
    GetSpotifyAccessTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSpotifyAccessTokenQuery,
    GetSpotifyAccessTokenQueryVariables
  >(GetSpotifyAccessTokenDocument, options);
}
export type GetSpotifyAccessTokenQueryHookResult = ReturnType<
  typeof useGetSpotifyAccessTokenQuery
>;
export type GetSpotifyAccessTokenLazyQueryHookResult = ReturnType<
  typeof useGetSpotifyAccessTokenLazyQuery
>;
export type GetSpotifyAccessTokenQueryResult = Apollo.QueryResult<
  GetSpotifyAccessTokenQuery,
  GetSpotifyAccessTokenQueryVariables
>;
