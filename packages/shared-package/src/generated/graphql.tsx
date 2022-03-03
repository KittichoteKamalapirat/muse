import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddToCart = {
  __typename?: 'AddToCart';
  cartItem: CartItem;
  newItem: Scalars['Boolean'];
};

export type Address = {
  __typename?: 'Address';
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  district: Scalars['String'];
  id: Scalars['Float'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  name: Scalars['String'];
  phonenumber: Scalars['String'];
  postcode: Scalars['String'];
  province: Scalars['String'];
  subdistrict: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type AddressInput = {
  country: Scalars['String'];
  district: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  name: Scalars['String'];
  phonenumber: Scalars['String'];
  postcode: Scalars['String'];
  province: Scalars['String'];
  subdistrict: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cartItemNoti: CartItemNoti;
  createdAt: Scalars['String'];
  fieldTotal: Scalars['Int'];
  id: Scalars['Float'];
  isReviewed: Scalars['Boolean'];
  mealkit: Mealkit;
  mealkitId: Scalars['Int'];
  orderId: Scalars['Int'];
  quantity: Scalars['Float'];
  status: Scalars['String'];
  total: Scalars['Int'];
  tracking?: Maybe<Tracking>;
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type CartItemInput = {
  mealkitId: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type CartItemNoti = {
  __typename?: 'CartItemNoti';
  cartItem: CartItem;
  cartItemId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['String'];
  id: Scalars['Float'];
  message: Scalars['String'];
  read: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export enum CartItemStatus {
  Cancelled = 'Cancelled',
  Delivered = 'Delivered',
  OnDelivery = 'OnDelivery',
  PaymentPending = 'PaymentPending',
  Received = 'Received',
  Refunded = 'Refunded',
  ToDeliver = 'ToDeliver',
  UnOrdered = 'UnOrdered'
}

export type CartItemsByCreator = {
  __typename?: 'CartItemsByCreator';
  creatorId: Scalars['String'];
  deliveryFee: Scalars['Float'];
  mealkitsFee: Scalars['Float'];
};

export type CartItemsByCreatorFormat = {
  __typename?: 'CartItemsByCreatorFormat';
  avatar: Scalars['String'];
  cartItems: Array<CartItem>;
  creatorId: Scalars['String'];
  creatorName: Scalars['String'];
  deliveryFee: Scalars['Int'];
  totalByCreator: Scalars['Float'];
};

export type CartItemsByCreatorInput = {
  creatorId: Scalars['String'];
  deliveryFee: Scalars['Float'];
  mealkitsFee: Scalars['Float'];
};

export type CartItemsByOrderFormat = {
  __typename?: 'CartItemsByOrderFormat';
  byCreator: Array<CartItemsByCreatorFormat>;
  grossOrder: Scalars['Float'];
  orderId: Scalars['Float'];
  paymentId: Scalars['Float'];
  trackingId?: Maybe<Scalars['Float']>;
};

export type ConfirmData = {
  __typename?: 'ConfirmData';
  amount: Scalars['String'];
  countryCode: Scalars['String'];
  paidLocalAmount: Scalars['String'];
  paidLocalCurrency: Scalars['String'];
  receiver: Person;
  receivingBank: Scalars['String'];
  ref1: Scalars['String'];
  ref2: Scalars['String'];
  ref3: Scalars['String'];
  sender: Person;
  sendingBank: Scalars['String'];
  transDate: Scalars['String'];
  transRef: Scalars['String'];
  transTime: Scalars['String'];
};

export type ConfirmationResponse = {
  __typename?: 'ConfirmationResponse';
  data: ConfirmData;
  status: Status;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['String'];
  follower: User;
  followerId: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  amount: Scalars['String'];
  ingredient: Scalars['String'];
  unit: Scalars['String'];
};

export type IngredientInput = {
  amount: Scalars['String'];
  ingredient: Scalars['String'];
  unit: Scalars['String'];
};

export type MappedCreatorOrders = {
  __typename?: 'MappedCreatorOrders';
  address: Address;
  avatar: Scalars['String'];
  cartItems: Array<CartItem>;
  deliveryFee: Scalars['Int'];
  orderId?: Maybe<Scalars['Float']>;
  tracking?: Maybe<Tracking>;
  username: Scalars['String'];
};

export type Mealkit = {
  __typename?: 'Mealkit';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  deliveryFee: Scalars['Float'];
  id: Scalars['Float'];
  images?: Maybe<Array<Scalars['String']>>;
  items?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  portion: Scalars['Float'];
  post?: Maybe<Post>;
  postId: Scalars['Float'];
  price?: Maybe<Scalars['Int']>;
  reviewAvg: Scalars['Float'];
  reviews: Array<Review>;
  reviewsCounter: Scalars['Int'];
  reviewsSum: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type MealkitInput = {
  images: Array<Scalars['String']>;
  items: Array<Scalars['String']>;
  name: Scalars['String'];
  portion: Scalars['Float'];
  price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createAddress: Address;
  createCartItem: AddToCart;
  createMealkit: Mealkit;
  createOrder: Order;
  createPaymentInfo: PaymentInfoResponse;
  createPost: Post;
  createReview: Review;
  createTracking: Tracking;
  deleteAddress: Scalars['Boolean'];
  deleteCartItem: Scalars['Boolean'];
  deleteMealkit: Scalars['Boolean'];
  deletePaymentInfo: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  readOrderNotis: Scalars['Boolean'];
  register: UserResponse;
  signAvatarS3: SignedS3;
  signMealkitS3: Array<SignedS3Result>;
  signS3: PostSignedS3;
  signSingleFileS3: SingleFileSignedS3;
  switchAccountType: Scalars['Boolean'];
  toggleFollow: Scalars['Boolean'];
  updateAddress?: Maybe<Address>;
  updateAvatar: Scalars['Boolean'];
  updateCartItem: CartItem;
  updateMealkit?: Maybe<Mealkit>;
  updatePaymentInfo?: Maybe<PaymentInfoResponse>;
  updatePost?: Maybe<Post>;
  updateReview: Review;
  updateUser: User;
  uploadSlip: Scalars['Boolean'];
  vote: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateAddressArgs = {
  input: AddressInput;
};


export type MutationCreateCartItemArgs = {
  input: CartItemInput;
};


export type MutationCreateMealkitArgs = {
  input: MealkitInput;
  postId: Scalars['Int'];
};


export type MutationCreateOrderArgs = {
  cartItemIds: Array<Scalars['Int']>;
  cartItemsByCreatorInput: Array<CartItemsByCreatorInput>;
  grossOrder: Scalars['Int'];
};


export type MutationCreatePaymentInfoArgs = {
  input: PaymentInfoInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateReviewArgs = {
  cartItemId: Scalars['Int'];
  input: ReviewInput;
  mealkitId: Scalars['Int'];
};


export type MutationCreateTrackingArgs = {
  input: TrackingInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCartItemArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMealkitArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePaymentInfoArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  cartItemId: Scalars['Int'];
  mealkitId: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmailOrPhonenumber: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: UsernamePasswordInput;
};


export type MutationSignAvatarS3Args = {
  filetype: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSignMealkitS3Args = {
  input: Array<SignS3Params>;
};


export type MutationSignS3Args = {
  thumbnailFiletype: Scalars['String'];
  thumbnailname: Scalars['String'];
  videoFiletype: Scalars['String'];
  videoname: Scalars['String'];
};


export type MutationSignSingleFileS3Args = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
};


export type MutationSwitchAccountTypeArgs = {
  becomeCreator: Scalars['Boolean'];
};


export type MutationToggleFollowArgs = {
  targetUserId: Scalars['String'];
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int'];
  input: AddressInput;
};


export type MutationUpdateAvatarArgs = {
  newAvatar: Scalars['String'];
};


export type MutationUpdateCartItemArgs = {
  id: Scalars['Int'];
  mealkitId: Scalars['Int'];
  quantity: Scalars['Int'];
};


export type MutationUpdateMealkitArgs = {
  id: Scalars['Int'];
  input: MealkitInput;
};


export type MutationUpdatePaymentInfoArgs = {
  id: Scalars['Int'];
  input: PaymentInfoInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: PostInput;
};


export type MutationUpdateReviewArgs = {
  cartItemId: Scalars['Int'];
  input: ReviewInput;
  mealkitId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};


export type MutationUploadSlipArgs = {
  paymentId: Scalars['Int'];
  slipUrl: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  cartItems: Array<CartItem>;
  cartItemsByCreator?: Maybe<Array<CartItemsByCreator>>;
  createdAt: Scalars['DateTime'];
  grossOrder: Scalars['Float'];
  id: Scalars['Float'];
  payment?: Maybe<Payment>;
  paymentId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  qrUrl: Scalars['String'];
  slipUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type PaymentInfo = {
  __typename?: 'PaymentInfo';
  bankAccount: Scalars['String'];
  bankCode: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type PaymentInfoInput = {
  bankAccount: Scalars['String'];
  bankCode: Scalars['String'];
};

export type PaymentInfoResponse = {
  __typename?: 'PaymentInfoResponse';
  errors?: Maybe<Array<FieldError>>;
  paymentInfo?: Maybe<PaymentInfo>;
};

export type Person = {
  __typename?: 'Person';
  account: TypeAndValue;
  displayName: Scalars['String'];
  name: Scalars['String'];
  proxy: TypeAndValue;
};

export type Post = {
  __typename?: 'Post';
  advice?: Maybe<Array<Scalars['String']>>;
  cooktime?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['Float'];
  ingredients?: Maybe<Array<Ingredient>>;
  instruction?: Maybe<Array<Scalars['String']>>;
  mealkits?: Maybe<Array<Mealkit>>;
  points: Scalars['Float'];
  portion?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  videoUrl: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInput = {
  advice: Array<Scalars['String']>;
  cooktime: Scalars['String'];
  ingredients: Array<IngredientInput>;
  instruction: Array<Scalars['String']>;
  portion: Scalars['Float'];
  text: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type PostSignedS3 = {
  __typename?: 'PostSignedS3';
  thumbnailSignedRequest: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  videoSignedRequest: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  address: Address;
  cartItems: Array<CartItem>;
  confirmPayment: ConfirmationResponse;
  creatorOrders: Array<MappedCreatorOrders>;
  followers: Array<Follow>;
  following: Array<Follow>;
  manuallyConfirmPayment: Scalars['Boolean'];
  me?: Maybe<User>;
  mealkit?: Maybe<Mealkit>;
  mealkits?: Maybe<Array<Mealkit>>;
  orderNotis: Array<CartItemNoti>;
  payment: Payment;
  paymentInfo?: Maybe<PaymentInfo>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  postsByCreator: Array<Post>;
  reviews: Array<Review>;
  tracking: Tracking;
  user: User;
  userOrders: Array<CartItemsByOrderFormat>;
  users: Array<User>;
  votedPosts: PaginatedPosts;
};


export type QueryConfirmPaymentArgs = {
  sendingBank: Scalars['String'];
  transRef: Scalars['String'];
};


export type QueryCreatorOrdersArgs = {
  status: CartItemStatus;
};


export type QueryFollowersArgs = {
  userId: Scalars['String'];
};


export type QueryFollowingArgs = {
  userId: Scalars['String'];
};


export type QueryManuallyConfirmPaymentArgs = {
  paymentId: Scalars['Int'];
};


export type QueryMealkitArgs = {
  id: Scalars['Int'];
};


export type QueryMealkitsArgs = {
  postId: Scalars['Int'];
};


export type QueryPaymentArgs = {
  id: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostsByCreatorArgs = {
  userId: Scalars['String'];
};


export type QueryReviewsArgs = {
  mealkitId: Scalars['Int'];
};


export type QueryTrackingArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserOrdersArgs = {
  status: CartItemStatus;
};


export type QueryVotedPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  cartItemId: Scalars['Int'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  images?: Maybe<Array<Scalars['String']>>;
  mealkit: Mealkit;
  mealkitId: Scalars['Int'];
  score: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type ReviewInput = {
  score: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type SignedS3 = {
  __typename?: 'SignedS3';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type SingleFileSignedS3 = {
  __typename?: 'SingleFileSignedS3';
  fileUrl: Scalars['String'];
  signedRequest: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  code: Scalars['Float'];
  description: Scalars['String'];
};

export type TimeLine = {
  __typename?: 'TimeLine';
  date: Scalars['String'];
  details: Array<TimelineDetail>;
};

export type TimelineDetail = {
  __typename?: 'TimelineDetail';
  date: Scalars['String'];
  dateTime: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['String'];
  time: Scalars['String'];
};

export type Tracking = {
  __typename?: 'Tracking';
  cartItems: Array<CartItem>;
  color: Scalars['String'];
  courier: Scalars['String'];
  courierKey: Scalars['String'];
  createdAt: Scalars['String'];
  currentStatus: Scalars['String'];
  id: Scalars['Float'];
  shareLink: Scalars['String'];
  status: Scalars['String'];
  timelines: Array<TimeLine>;
  trackingNo: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TrackingInput = {
  cartItemIds: Array<Scalars['Int']>;
  courier: Scalars['String'];
  trackingNo: Scalars['String'];
};

export type TypeAndValue = {
  __typename?: 'TypeAndValue';
  type: Scalars['String'];
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  followerNum: Scalars['Float'];
  id: Scalars['String'];
  isCreator: Scalars['Boolean'];
  isFollowed: Scalars['Boolean'];
  phonenumber: Scalars['String'];
  reviews: Array<Review>;
  updatedAt: Scalars['DateTime'];
  userReview: UserReview;
  username: Scalars['String'];
};

export type UserInput = {
  about: Scalars['String'];
  email: Scalars['String'];
  phonenumber: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserReview = {
  __typename?: 'UserReview';
  reviewCounter: Scalars['Int'];
  reviewScore: Scalars['Int'];
};

/** Argument for register user */
export type UsernamePasswordInput = {
  email: Scalars['String'];
  isCreator?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phonenumber: Scalars['String'];
  username: Scalars['String'];
};

export type SignS3Params = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type SignedS3Result = {
  __typename?: 'signedS3Result';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: string | null | undefined, followerNum: number, userReview: { __typename?: 'UserReview', reviewScore: number, reviewCounter: number } } | null | undefined };

export type ReadOrderNotisMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadOrderNotisMutation = { __typename?: 'Mutation', readOrderNotis: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmailOrPhonenumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: string | null | undefined, followerNum: number, userReview: { __typename?: 'UserReview', reviewScore: number, reviewCounter: number } } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  data: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: string | null | undefined, followerNum: number, userReview: { __typename?: 'UserReview', reviewScore: number, reviewCounter: number } } | null | undefined } };

export type OrderNotisQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderNotisQuery = { __typename?: 'Query', orderNotis: Array<{ __typename?: 'CartItemNoti', id: number, message: string, read: boolean, cartItemId: number, createdAt: any, cartItem: { __typename?: 'CartItem', id: number, quantity: number, status: string, user?: { __typename?: 'User', username: string } | null | undefined, mealkit: { __typename?: 'Mealkit', name: string, images?: Array<string> | null | undefined } } }> };

export type PostSnippetFragment = { __typename?: 'Post', id: number, title: string, textSnippet: string, videoUrl: string, thumbnailUrl: string, createdAt: string, updatedAt: string, points: number, voteStatus?: number | null | undefined, mealkits?: Array<{ __typename?: 'Mealkit', id: number, name: string, images?: Array<string> | null | undefined, price?: number | null | undefined, portion: number, reviewAvg: number, reviewsCounter: number }> | null | undefined, creator: { __typename?: 'User', id: string, username: string, avatar: string } };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, title: string, textSnippet: string, videoUrl: string, thumbnailUrl: string, createdAt: string, updatedAt: string, points: number, voteStatus?: number | null | undefined, mealkits?: Array<{ __typename?: 'Mealkit', id: number, name: string, images?: Array<string> | null | undefined, price?: number | null | undefined, portion: number, reviewAvg: number, reviewsCounter: number }> | null | undefined, creator: { __typename?: 'User', id: string, username: string, avatar: string } }> } };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: string | null | undefined, followerNum: number, userReview: { __typename?: 'UserReview', reviewScore: number, reviewCounter: number } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: string | null | undefined, followerNum: number, userReview: { __typename?: 'UserReview', reviewScore: number, reviewCounter: number } } | null | undefined };

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
  phonenumber
  avatar
  userReview {
    reviewScore
    reviewCounter
  }
  isCreator
  about
  followerNum
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
${RegularUserFragmentDoc}`;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  title
  textSnippet
  videoUrl
  thumbnailUrl
  createdAt
  updatedAt
  points
  voteStatus
  mealkits {
    id
    name
    images
    price
    portion
    reviewAvg
    reviewsCounter
  }
  creator {
    id
    username
    avatar
  }
}
    `;
export const ReadOrderNotisDocument = gql`
    mutation readOrderNotis {
  readOrderNotis
}
    `;
export type ReadOrderNotisMutationFn = Apollo.MutationFunction<ReadOrderNotisMutation, ReadOrderNotisMutationVariables>;

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
export function useReadOrderNotisMutation(baseOptions?: Apollo.MutationHookOptions<ReadOrderNotisMutation, ReadOrderNotisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadOrderNotisMutation, ReadOrderNotisMutationVariables>(ReadOrderNotisDocument, options);
      }
export type ReadOrderNotisMutationHookResult = ReturnType<typeof useReadOrderNotisMutation>;
export type ReadOrderNotisMutationResult = Apollo.MutationResult<ReadOrderNotisMutation>;
export type ReadOrderNotisMutationOptions = Apollo.BaseMutationOptions<ReadOrderNotisMutation, ReadOrderNotisMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmailOrPhonenumber: String!, $password: String!) {
  login(
    usernameOrEmailOrPhonenumber: $usernameOrEmailOrPhonenumber
    password: $password
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UsernamePasswordInput!) {
  register(data: $data) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const OrderNotisDocument = gql`
    query orderNotis {
  orderNotis {
    id
    message
    read
    cartItemId
    createdAt
    cartItem {
      id
      quantity
      status
      user {
        username
      }
      mealkit {
        name
        images
      }
    }
  }
}
    `;

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
export function useOrderNotisQuery(baseOptions?: Apollo.QueryHookOptions<OrderNotisQuery, OrderNotisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderNotisQuery, OrderNotisQueryVariables>(OrderNotisDocument, options);
      }
export function useOrderNotisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderNotisQuery, OrderNotisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderNotisQuery, OrderNotisQueryVariables>(OrderNotisDocument, options);
        }
export type OrderNotisQueryHookResult = ReturnType<typeof useOrderNotisQuery>;
export type OrderNotisLazyQueryHookResult = ReturnType<typeof useOrderNotisLazyQuery>;
export type OrderNotisQueryResult = Apollo.QueryResult<OrderNotisQuery, OrderNotisQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

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
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;