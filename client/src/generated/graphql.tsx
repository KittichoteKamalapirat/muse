import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
  id: Scalars['Float'];
  name: Scalars['String'];
  phonenumber: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  subdistrict: Scalars['String'];
  district: Scalars['String'];
  province: Scalars['String'];
  country: Scalars['String'];
  postcode: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type AddressInput = {
  name: Scalars['String'];
  phonenumber: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  subdistrict: Scalars['String'];
  district: Scalars['String'];
  province: Scalars['String'];
  country: Scalars['String'];
  postcode: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['Float'];
  quantity: Scalars['Float'];
  userId: Scalars['String'];
  user?: Maybe<User>;
  mealkitId: Scalars['Int'];
  mealkit?: Maybe<Mealkit>;
  orderId: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  total: Scalars['Int'];
};

export type CartItemInput = {
  mealkitId: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type ConfirmData = {
  __typename?: 'ConfirmData';
  transRef: Scalars['String'];
  sendingBank: Scalars['String'];
  receivingBank: Scalars['String'];
  transDate: Scalars['String'];
  transTime: Scalars['String'];
  sender: Person;
  receiver: Person;
  amount: Scalars['String'];
  paidLocalAmount: Scalars['String'];
  paidLocalCurrency: Scalars['String'];
  countryCode: Scalars['String'];
  ref1: Scalars['String'];
  ref2: Scalars['String'];
  ref3: Scalars['String'];
};

export type ConfirmationResponse = {
  __typename?: 'ConfirmationResponse';
  status: Status;
  data: ConfirmData;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  id: Scalars['Float'];
  userId: Scalars['String'];
  user: User;
  followerId: Scalars['String'];
  follower: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  ingredient: Scalars['String'];
  amount: Scalars['String'];
  unit: Scalars['String'];
};

export type IngredientInput = {
  ingredient: Scalars['String'];
  amount: Scalars['String'];
  unit: Scalars['String'];
};

export type Mealkit = {
  __typename?: 'Mealkit';
  id: Scalars['Float'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  portion: Scalars['Float'];
  items?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<Scalars['String']>>;
  postId: Scalars['Float'];
  post?: Maybe<Post>;
  creatorId: Scalars['String'];
  creator?: Maybe<User>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MealkitInput = {
  name: Scalars['String'];
  items: Array<Scalars['String']>;
  images: Array<Scalars['String']>;
  price: Scalars['Float'];
  portion: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  updateUser: User;
  login: UserResponse;
  logout: Scalars['Boolean'];
  switchAccountType: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  signS3: PostSignedS3;
  signAvatarS3: SignedS3;
  createAddress: Address;
  updateAddress?: Maybe<Address>;
  deleteAddress: Scalars['Boolean'];
  createMealkit: Mealkit;
  updateMealkit?: Maybe<Mealkit>;
  deleteMealkit: Scalars['Boolean'];
  signMealkitS3: Array<SignedS3Result>;
  createCartItem: AddToCart;
  updateCartItem: CartItem;
  deleteCartItem: Scalars['Boolean'];
  createOrder: Order;
  toggleFollow: Scalars['Boolean'];
  createPaymentInfo: PaymentInfoResponse;
  updatePaymentInfo?: Maybe<PaymentInfoResponse>;
  deletePaymentInfo: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: UsernamePasswordInput;
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmailOrPhonenumber: Scalars['String'];
};


export type MutationSwitchAccountTypeArgs = {
  becomeCreator: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationSignS3Args = {
  thumbnailFiletype: Scalars['String'];
  videoFiletype: Scalars['String'];
  thumbnailname: Scalars['String'];
  videoname: Scalars['String'];
};


export type MutationSignAvatarS3Args = {
  filetype: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateAddressArgs = {
  input: AddressInput;
};


export type MutationUpdateAddressArgs = {
  input: AddressInput;
  id: Scalars['Int'];
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMealkitArgs = {
  postId: Scalars['Int'];
  input: MealkitInput;
};


export type MutationUpdateMealkitArgs = {
  id: Scalars['Int'];
  input: MealkitInput;
};


export type MutationDeleteMealkitArgs = {
  id: Scalars['Int'];
};


export type MutationSignMealkitS3Args = {
  input: Array<SignS3Params>;
};


export type MutationCreateCartItemArgs = {
  input: CartItemInput;
};


export type MutationUpdateCartItemArgs = {
  mealkitId: Scalars['Int'];
  id: Scalars['Int'];
  quantity: Scalars['Int'];
};


export type MutationDeleteCartItemArgs = {
  id: Scalars['Int'];
};


export type MutationCreateOrderArgs = {
  grossOrder: Scalars['Int'];
  cartItemIds: Array<Scalars['Int']>;
};


export type MutationToggleFollowArgs = {
  targetUserId: Scalars['String'];
};


export type MutationCreatePaymentInfoArgs = {
  input: PaymentInfoInput;
};


export type MutationUpdatePaymentInfoArgs = {
  input: PaymentInfoInput;
  id: Scalars['Int'];
};


export type MutationDeletePaymentInfoArgs = {
  id: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  grossOrder: Scalars['Float'];
  status: Scalars['String'];
  cartItems: Array<CartItem>;
  userId: Scalars['String'];
  payment?: Maybe<Payment>;
  paymentId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum OrderStatus {
  PaymentPending = 'PaymentPending',
  ToDeliver = 'ToDeliver',
  OnDelivery = 'OnDelivery',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  qrUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PaymentInfo = {
  __typename?: 'PaymentInfo';
  id: Scalars['Float'];
  bankAccount: Scalars['String'];
  bankCode: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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
  displayName: Scalars['String'];
  name: Scalars['String'];
  proxy: TypeAndValue;
  account: TypeAndValue;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  instruction?: Maybe<Array<Scalars['String']>>;
  advice?: Maybe<Array<Scalars['String']>>;
  cooktime?: Maybe<Scalars['String']>;
  portion?: Maybe<Scalars['Int']>;
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  thumbnailUrl: Scalars['String'];
  videoUrl: Scalars['String'];
  creatorId: Scalars['String'];
  creator: User;
  ingredients?: Maybe<Array<Ingredient>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  instruction: Array<Scalars['String']>;
  cooktime: Scalars['String'];
  portion: Scalars['Float'];
  advice: Array<Scalars['String']>;
  videoUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  ingredients: Array<IngredientInput>;
};

export type PostSignedS3 = {
  __typename?: 'PostSignedS3';
  videoSignedRequest: Scalars['String'];
  thumbnailSignedRequest: Scalars['String'];
  videoUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user: User;
  me?: Maybe<User>;
  votedPosts: PaginatedPosts;
  posts: PaginatedPosts;
  postsByCreator: Array<Post>;
  post?: Maybe<Post>;
  address: Address;
  mealkits?: Maybe<Array<Mealkit>>;
  cartItems: Array<CartItem>;
  payment: Payment;
  confirmPayment: ConfirmationResponse;
  orderItems: Array<CartItem>;
  creatorOrderItems: Array<CartItem>;
  myOrders: Array<Order>;
  followers: Array<Follow>;
  following: Array<Follow>;
  paymentInfo?: Maybe<PaymentInfo>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryVotedPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostsByCreatorArgs = {
  userId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryMealkitsArgs = {
  postId: Scalars['Int'];
};


export type QueryPaymentArgs = {
  id: Scalars['Int'];
};


export type QueryConfirmPaymentArgs = {
  sendingBank: Scalars['String'];
  transRef: Scalars['String'];
};


export type QueryOrderItemsArgs = {
  status: OrderStatus;
};


export type QueryCreatorOrderItemsArgs = {
  status: OrderStatus;
};


export type QueryMyOrdersArgs = {
  status: OrderStatus;
};


export type QueryFollowersArgs = {
  userId: Scalars['String'];
};


export type QueryFollowingArgs = {
  userId: Scalars['String'];
};

export type SignedS3 = {
  __typename?: 'SignedS3';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  code: Scalars['Float'];
  description: Scalars['String'];
};

export type TypeAndValue = {
  __typename?: 'TypeAndValue';
  type: Scalars['String'];
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  phonenumber: Scalars['String'];
  isCreator: Scalars['Boolean'];
  avatar: Scalars['String'];
  about?: Maybe<Scalars['String']>;
  followerNum: Scalars['Float'];
  isFollowed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  phonenumber: Scalars['String'];
  about: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

/** Argument for register user */
export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  phonenumber: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  isCreator?: Maybe<Scalars['Boolean']>;
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

export type PostSnippetFragment = { __typename?: 'Post', id: number, title: string, textSnippet: string, videoUrl: string, thumbnailUrl: string, createdAt: string, updatedAt: string, points: number, voteStatus?: Maybe<number>, creator: { __typename?: 'User', id: string, username: string, avatar: string } };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: Maybe<string> };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: Maybe<string> }> };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: Maybe<string> }> } };

export type CreateAddressMutationVariables = Exact<{
  input: AddressInput;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', name: string, phonenumber: string, userId: string, line1: string, line2: string, subdistrict: string, district: string, province: string, country: string, postcode: string } };

export type CreateCartItemMutationVariables = Exact<{
  input: CartItemInput;
}>;


export type CreateCartItemMutation = { __typename?: 'Mutation', createCartItem: { __typename?: 'AddToCart', newItem: boolean, cartItem: { __typename?: 'CartItem', id: number, quantity: number, mealkitId: number, userId: string } } };

export type CreateMealkitMutationVariables = Exact<{
  input: MealkitInput;
  postId: Scalars['Int'];
}>;


export type CreateMealkitMutation = { __typename?: 'Mutation', createMealkit: { __typename?: 'Mealkit', name: string, items?: Maybe<Array<string>>, images?: Maybe<Array<string>>, price?: Maybe<number>, portion: number, id: number } };

export type CreateOrderMutationVariables = Exact<{
  cartItemIds: Array<Scalars['Int']> | Scalars['Int'];
  grossOrder: Scalars['Int'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: number, grossOrder: number, status: string, userId: string } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string, text: string, videoUrl: string, points: number, creatorId: string, createdAt: string, updatedAt: string, instruction?: Maybe<Array<string>>, advice?: Maybe<Array<string>>, cooktime?: Maybe<string>, portion?: Maybe<number> } };

export type CreatorOrderItemsQueryVariables = Exact<{
  status: OrderStatus;
}>;


export type CreatorOrderItemsQuery = { __typename?: 'Query', creatorOrderItems: Array<{ __typename?: 'CartItem', id: number, quantity: number, userId: string, mealkitId: number, orderId: number, total: number, mealkit?: Maybe<{ __typename?: 'Mealkit', id: number, name: string, price?: Maybe<number>, images?: Maybe<Array<string>> }> }> };

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress: boolean };

export type DeleteCartItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem: boolean };

export type DeleteMealkitMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMealkitMutation = { __typename?: 'Mutation', deleteMealkit: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmailOrPhonenumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: Maybe<string> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreatePaymentInfoMutationVariables = Exact<{
  input: PaymentInfoInput;
}>;


export type CreatePaymentInfoMutation = { __typename?: 'Mutation', createPaymentInfo: { __typename?: 'PaymentInfoResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, paymentInfo?: Maybe<{ __typename?: 'PaymentInfo', id: number, userId: string, bankCode: string, bankAccount: string }> } };

export type DeletePaymentInfoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePaymentInfoMutation = { __typename?: 'Mutation', deletePaymentInfo: boolean };

export type PaymentInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentInfoQuery = { __typename?: 'Query', paymentInfo?: Maybe<{ __typename?: 'PaymentInfo', id: number, userId: string, bankCode: string, bankAccount: string }> };

export type UpdatePaymentInfoMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PaymentInfoInput;
}>;


export type UpdatePaymentInfoMutation = { __typename?: 'Mutation', updatePaymentInfo?: Maybe<{ __typename?: 'PaymentInfoResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, paymentInfo?: Maybe<{ __typename?: 'PaymentInfo', id: number, userId: string, bankCode: string, bankAccount: string }> }> };

export type RegisterMutationVariables = Exact<{
  data: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: Maybe<string> }> } };

export type SignMealkitS3MutationVariables = Exact<{
  input: Array<SignS3Params> | SignS3Params;
}>;


export type SignMealkitS3Mutation = { __typename?: 'Mutation', signMealkitS3: Array<{ __typename?: 'signedS3Result', signedRequest: string, url: string }> };

export type SignS3MutationVariables = Exact<{
  videoname: Scalars['String'];
  thumbnailname: Scalars['String'];
  videoFiletype: Scalars['String'];
  thumbnailFiletype: Scalars['String'];
}>;


export type SignS3Mutation = { __typename?: 'Mutation', signS3: { __typename?: 'PostSignedS3', videoSignedRequest: string, thumbnailSignedRequest: string, videoUrl: string, thumbnailUrl: string } };

export type SwitchAccountTypeMutationVariables = Exact<{
  becomeCreator: Scalars['Boolean'];
}>;


export type SwitchAccountTypeMutation = { __typename?: 'Mutation', switchAccountType: boolean };

export type ToggleFollowMutationVariables = Exact<{
  targetUserId: Scalars['String'];
}>;


export type ToggleFollowMutation = { __typename?: 'Mutation', toggleFollow: boolean };

export type UpdateAddressMutationVariables = Exact<{
  input: AddressInput;
  id: Scalars['Int'];
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress?: Maybe<{ __typename?: 'Address', name: string, phonenumber: string, id: number, userId: string, line1: string, line2: string, subdistrict: string, district: string, province: string, country: string, postcode: string }> };

export type UpdateCartItemMutationVariables = Exact<{
  id: Scalars['Int'];
  quantity: Scalars['Int'];
  mealkitId: Scalars['Int'];
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: { __typename?: 'CartItem', id: number, quantity: number, total: number, mealkit?: Maybe<{ __typename?: 'Mealkit', price?: Maybe<number> }> } };

export type UpdateMealkitMutationVariables = Exact<{
  input: MealkitInput;
  id: Scalars['Int'];
}>;


export type UpdateMealkitMutation = { __typename?: 'Mutation', updateMealkit?: Maybe<{ __typename?: 'Mealkit', items?: Maybe<Array<string>>, images?: Maybe<Array<string>>, price?: Maybe<number>, id: number }> };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: number, title: string, textSnippet: string, videoUrl: string, ingredients?: Maybe<Array<{ __typename?: 'Ingredient', ingredient: string, amount: string, unit: string }>> }> };

export type UpdateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, phonenumber: string, about?: Maybe<string> } };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type AddressQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressQuery = { __typename?: 'Query', address: { __typename?: 'Address', name: string, phonenumber: string, id: number, userId: string, line1: string, line2: string, subdistrict: string, district: string, province: string, country: string, postcode: string } };

export type CartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartItemsQuery = { __typename?: 'Query', cartItems: Array<{ __typename?: 'CartItem', id: number, quantity: number, userId: string, mealkitId: number, total: number, user?: Maybe<{ __typename?: 'User', username: string }>, mealkit?: Maybe<{ __typename?: 'Mealkit', name: string, images?: Maybe<Array<string>>, price?: Maybe<number>, portion: number, post?: Maybe<{ __typename?: 'Post', id: number, title: string }> }> }> };

export type FollowersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowersQuery = { __typename?: 'Query', followers: Array<{ __typename?: 'Follow', id: number, followerId: string, follower: { __typename?: 'User', username: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, phonenumber: string, avatar: string, isCreator: boolean, about?: Maybe<string> }> };

export type MealkitsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type MealkitsQuery = { __typename?: 'Query', mealkits?: Maybe<Array<{ __typename?: 'Mealkit', id: number, items?: Maybe<Array<string>>, images?: Maybe<Array<string>>, price?: Maybe<number>, portion: number }>> };

export type MyOrdersQueryVariables = Exact<{
  status: OrderStatus;
}>;


export type MyOrdersQuery = { __typename?: 'Query', myOrders: Array<{ __typename?: 'Order', id: number, grossOrder: number, status: string, userId: string, cartItems: Array<{ __typename?: 'CartItem', id: number, quantity: number, total: number, mealkitId: number, mealkit?: Maybe<{ __typename?: 'Mealkit', id: number, name: string, price?: Maybe<number>, images?: Maybe<Array<string>> }> }>, payment?: Maybe<{ __typename?: 'Payment', id: number, qrUrl: string, amount: number }> }> };

export type OrderItemsQueryVariables = Exact<{
  status: OrderStatus;
}>;


export type OrderItemsQuery = { __typename?: 'Query', orderItems: Array<{ __typename?: 'CartItem', id: number, quantity: number, userId: string, mealkitId: number, total: number, user?: Maybe<{ __typename?: 'User', username: string }>, mealkit?: Maybe<{ __typename?: 'Mealkit', name: string, images?: Maybe<Array<string>>, price?: Maybe<number>, portion: number, post?: Maybe<{ __typename?: 'Post', id: number, title: string }> }> }> };

export type PaymentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: number, qrUrl: string, amount: number } };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: number, title: string, text: string, instruction?: Maybe<Array<string>>, cooktime?: Maybe<string>, portion?: Maybe<number>, advice?: Maybe<Array<string>>, videoUrl: string, thumbnailUrl: string, createdAt: string, updatedAt: string, points: number, voteStatus?: Maybe<number>, ingredients?: Maybe<Array<{ __typename?: 'Ingredient', ingredient: string, amount: string, unit: string }>>, creator: { __typename?: 'User', id: string, username: string } }> };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, title: string, textSnippet: string, videoUrl: string, thumbnailUrl: string, createdAt: string, updatedAt: string, points: number, voteStatus?: Maybe<number>, creator: { __typename?: 'User', id: string, username: string, avatar: string } }> } };

export type PostsByCreatorQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type PostsByCreatorQuery = { __typename?: 'Query', postsByCreator: Array<{ __typename?: 'Post', id: number, title: string, text: string, thumbnailUrl: string, points: number }> };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username: string, about?: Maybe<string>, avatar: string, isFollowed: boolean, followerNum: number } };

export type VotedPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type VotedPostsQuery = { __typename?: 'Query', votedPosts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, title: string, textSnippet: string, videoUrl: string, thumbnailUrl: string }> } };

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
  creator {
    id
    username
    avatar
  }
}
    `;
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
  isCreator
  about
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
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateAddressDocument = gql`
    mutation createAddress($input: AddressInput!) {
  createAddress(input: $input) {
    name
    phonenumber
    userId
    line1
    line2
    subdistrict
    district
    province
    country
    postcode
  }
}
    `;
export type CreateAddressMutationFn = Apollo.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAddressMutation(baseOptions?: Apollo.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<CreateAddressMutation, CreateAddressMutationVariables>;
export const CreateCartItemDocument = gql`
    mutation createCartItem($input: CartItemInput!) {
  createCartItem(input: $input) {
    cartItem {
      id
      quantity
      mealkitId
      userId
    }
    newItem
  }
}
    `;
export type CreateCartItemMutationFn = Apollo.MutationFunction<CreateCartItemMutation, CreateCartItemMutationVariables>;

/**
 * __useCreateCartItemMutation__
 *
 * To run a mutation, you first call `useCreateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCartItemMutation, { data, loading, error }] = useCreateCartItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCartItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateCartItemMutation, CreateCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCartItemMutation, CreateCartItemMutationVariables>(CreateCartItemDocument, options);
      }
export type CreateCartItemMutationHookResult = ReturnType<typeof useCreateCartItemMutation>;
export type CreateCartItemMutationResult = Apollo.MutationResult<CreateCartItemMutation>;
export type CreateCartItemMutationOptions = Apollo.BaseMutationOptions<CreateCartItemMutation, CreateCartItemMutationVariables>;
export const CreateMealkitDocument = gql`
    mutation createMealkit($input: MealkitInput!, $postId: Int!) {
  createMealkit(input: $input, postId: $postId) {
    name
    items
    images
    price
    portion
    id
  }
}
    `;
export type CreateMealkitMutationFn = Apollo.MutationFunction<CreateMealkitMutation, CreateMealkitMutationVariables>;

/**
 * __useCreateMealkitMutation__
 *
 * To run a mutation, you first call `useCreateMealkitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMealkitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMealkitMutation, { data, loading, error }] = useCreateMealkitMutation({
 *   variables: {
 *      input: // value for 'input'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateMealkitMutation(baseOptions?: Apollo.MutationHookOptions<CreateMealkitMutation, CreateMealkitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMealkitMutation, CreateMealkitMutationVariables>(CreateMealkitDocument, options);
      }
export type CreateMealkitMutationHookResult = ReturnType<typeof useCreateMealkitMutation>;
export type CreateMealkitMutationResult = Apollo.MutationResult<CreateMealkitMutation>;
export type CreateMealkitMutationOptions = Apollo.BaseMutationOptions<CreateMealkitMutation, CreateMealkitMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($cartItemIds: [Int!]!, $grossOrder: Int!) {
  createOrder(cartItemIds: $cartItemIds, grossOrder: $grossOrder) {
    id
    grossOrder
    status
    userId
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      cartItemIds: // value for 'cartItemIds'
 *      grossOrder: // value for 'grossOrder'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    text
    videoUrl
    points
    creatorId
    createdAt
    updatedAt
    instruction
    advice
    cooktime
    portion
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreatorOrderItemsDocument = gql`
    query creatorOrderItems($status: OrderStatus!) {
  creatorOrderItems(status: $status) {
    id
    quantity
    userId
    mealkitId
    mealkit {
      id
      name
      price
      images
    }
    orderId
    total
  }
}
    `;

/**
 * __useCreatorOrderItemsQuery__
 *
 * To run a query within a React component, call `useCreatorOrderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreatorOrderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreatorOrderItemsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreatorOrderItemsQuery(baseOptions: Apollo.QueryHookOptions<CreatorOrderItemsQuery, CreatorOrderItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreatorOrderItemsQuery, CreatorOrderItemsQueryVariables>(CreatorOrderItemsDocument, options);
      }
export function useCreatorOrderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreatorOrderItemsQuery, CreatorOrderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreatorOrderItemsQuery, CreatorOrderItemsQueryVariables>(CreatorOrderItemsDocument, options);
        }
export type CreatorOrderItemsQueryHookResult = ReturnType<typeof useCreatorOrderItemsQuery>;
export type CreatorOrderItemsLazyQueryHookResult = ReturnType<typeof useCreatorOrderItemsLazyQuery>;
export type CreatorOrderItemsQueryResult = Apollo.QueryResult<CreatorOrderItemsQuery, CreatorOrderItemsQueryVariables>;
export const DeleteAddressDocument = gql`
    mutation deleteAddress($id: Int!) {
  deleteAddress(id: $id)
}
    `;
export type DeleteAddressMutationFn = Apollo.MutationFunction<DeleteAddressMutation, DeleteAddressMutationVariables>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAddressMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAddressMutation, DeleteAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, options);
      }
export type DeleteAddressMutationHookResult = ReturnType<typeof useDeleteAddressMutation>;
export type DeleteAddressMutationResult = Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<DeleteAddressMutation, DeleteAddressMutationVariables>;
export const DeleteCartItemDocument = gql`
    mutation deleteCartItem($id: Int!) {
  deleteCartItem(id: $id)
}
    `;
export type DeleteCartItemMutationFn = Apollo.MutationFunction<DeleteCartItemMutation, DeleteCartItemMutationVariables>;

/**
 * __useDeleteCartItemMutation__
 *
 * To run a mutation, you first call `useDeleteCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCartItemMutation, { data, loading, error }] = useDeleteCartItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCartItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument, options);
      }
export type DeleteCartItemMutationHookResult = ReturnType<typeof useDeleteCartItemMutation>;
export type DeleteCartItemMutationResult = Apollo.MutationResult<DeleteCartItemMutation>;
export type DeleteCartItemMutationOptions = Apollo.BaseMutationOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>;
export const DeleteMealkitDocument = gql`
    mutation deleteMealkit($id: Int!) {
  deleteMealkit(id: $id)
}
    `;
export type DeleteMealkitMutationFn = Apollo.MutationFunction<DeleteMealkitMutation, DeleteMealkitMutationVariables>;

/**
 * __useDeleteMealkitMutation__
 *
 * To run a mutation, you first call `useDeleteMealkitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMealkitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMealkitMutation, { data, loading, error }] = useDeleteMealkitMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMealkitMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMealkitMutation, DeleteMealkitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMealkitMutation, DeleteMealkitMutationVariables>(DeleteMealkitDocument, options);
      }
export type DeleteMealkitMutationHookResult = ReturnType<typeof useDeleteMealkitMutation>;
export type DeleteMealkitMutationResult = Apollo.MutationResult<DeleteMealkitMutation>;
export type DeleteMealkitMutationOptions = Apollo.BaseMutationOptions<DeleteMealkitMutation, DeleteMealkitMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreatePaymentInfoDocument = gql`
    mutation createPaymentInfo($input: PaymentInfoInput!) {
  createPaymentInfo(input: $input) {
    errors {
      field
      message
    }
    paymentInfo {
      id
      userId
      bankCode
      bankAccount
    }
  }
}
    `;
export type CreatePaymentInfoMutationFn = Apollo.MutationFunction<CreatePaymentInfoMutation, CreatePaymentInfoMutationVariables>;

/**
 * __useCreatePaymentInfoMutation__
 *
 * To run a mutation, you first call `useCreatePaymentInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentInfoMutation, { data, loading, error }] = useCreatePaymentInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentInfoMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentInfoMutation, CreatePaymentInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentInfoMutation, CreatePaymentInfoMutationVariables>(CreatePaymentInfoDocument, options);
      }
export type CreatePaymentInfoMutationHookResult = ReturnType<typeof useCreatePaymentInfoMutation>;
export type CreatePaymentInfoMutationResult = Apollo.MutationResult<CreatePaymentInfoMutation>;
export type CreatePaymentInfoMutationOptions = Apollo.BaseMutationOptions<CreatePaymentInfoMutation, CreatePaymentInfoMutationVariables>;
export const DeletePaymentInfoDocument = gql`
    mutation deletePaymentInfo($id: Int!) {
  deletePaymentInfo(id: $id)
}
    `;
export type DeletePaymentInfoMutationFn = Apollo.MutationFunction<DeletePaymentInfoMutation, DeletePaymentInfoMutationVariables>;

/**
 * __useDeletePaymentInfoMutation__
 *
 * To run a mutation, you first call `useDeletePaymentInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentInfoMutation, { data, loading, error }] = useDeletePaymentInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePaymentInfoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePaymentInfoMutation, DeletePaymentInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePaymentInfoMutation, DeletePaymentInfoMutationVariables>(DeletePaymentInfoDocument, options);
      }
export type DeletePaymentInfoMutationHookResult = ReturnType<typeof useDeletePaymentInfoMutation>;
export type DeletePaymentInfoMutationResult = Apollo.MutationResult<DeletePaymentInfoMutation>;
export type DeletePaymentInfoMutationOptions = Apollo.BaseMutationOptions<DeletePaymentInfoMutation, DeletePaymentInfoMutationVariables>;
export const PaymentInfoDocument = gql`
    query paymentInfo {
  paymentInfo {
    id
    userId
    bankCode
    bankAccount
  }
}
    `;

/**
 * __usePaymentInfoQuery__
 *
 * To run a query within a React component, call `usePaymentInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentInfoQuery(baseOptions?: Apollo.QueryHookOptions<PaymentInfoQuery, PaymentInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentInfoQuery, PaymentInfoQueryVariables>(PaymentInfoDocument, options);
      }
export function usePaymentInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentInfoQuery, PaymentInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentInfoQuery, PaymentInfoQueryVariables>(PaymentInfoDocument, options);
        }
export type PaymentInfoQueryHookResult = ReturnType<typeof usePaymentInfoQuery>;
export type PaymentInfoLazyQueryHookResult = ReturnType<typeof usePaymentInfoLazyQuery>;
export type PaymentInfoQueryResult = Apollo.QueryResult<PaymentInfoQuery, PaymentInfoQueryVariables>;
export const UpdatePaymentInfoDocument = gql`
    mutation updatePaymentInfo($id: Int!, $input: PaymentInfoInput!) {
  updatePaymentInfo(id: $id, input: $input) {
    errors {
      field
      message
    }
    paymentInfo {
      id
      userId
      bankCode
      bankAccount
    }
  }
}
    `;
export type UpdatePaymentInfoMutationFn = Apollo.MutationFunction<UpdatePaymentInfoMutation, UpdatePaymentInfoMutationVariables>;

/**
 * __useUpdatePaymentInfoMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentInfoMutation, { data, loading, error }] = useUpdatePaymentInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePaymentInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentInfoMutation, UpdatePaymentInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentInfoMutation, UpdatePaymentInfoMutationVariables>(UpdatePaymentInfoDocument, options);
      }
export type UpdatePaymentInfoMutationHookResult = ReturnType<typeof useUpdatePaymentInfoMutation>;
export type UpdatePaymentInfoMutationResult = Apollo.MutationResult<UpdatePaymentInfoMutation>;
export type UpdatePaymentInfoMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentInfoMutation, UpdatePaymentInfoMutationVariables>;
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
export const SignMealkitS3Document = gql`
    mutation signMealkitS3($input: [signS3Params!]!) {
  signMealkitS3(input: $input) {
    signedRequest
    url
  }
}
    `;
export type SignMealkitS3MutationFn = Apollo.MutationFunction<SignMealkitS3Mutation, SignMealkitS3MutationVariables>;

/**
 * __useSignMealkitS3Mutation__
 *
 * To run a mutation, you first call `useSignMealkitS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignMealkitS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signMealkitS3Mutation, { data, loading, error }] = useSignMealkitS3Mutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignMealkitS3Mutation(baseOptions?: Apollo.MutationHookOptions<SignMealkitS3Mutation, SignMealkitS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignMealkitS3Mutation, SignMealkitS3MutationVariables>(SignMealkitS3Document, options);
      }
export type SignMealkitS3MutationHookResult = ReturnType<typeof useSignMealkitS3Mutation>;
export type SignMealkitS3MutationResult = Apollo.MutationResult<SignMealkitS3Mutation>;
export type SignMealkitS3MutationOptions = Apollo.BaseMutationOptions<SignMealkitS3Mutation, SignMealkitS3MutationVariables>;
export const SignS3Document = gql`
    mutation signS3($videoname: String!, $thumbnailname: String!, $videoFiletype: String!, $thumbnailFiletype: String!) {
  signS3(
    videoname: $videoname
    thumbnailname: $thumbnailname
    videoFiletype: $videoFiletype
    thumbnailFiletype: $thumbnailFiletype
  ) {
    videoSignedRequest
    thumbnailSignedRequest
    videoUrl
    thumbnailUrl
  }
}
    `;
export type SignS3MutationFn = Apollo.MutationFunction<SignS3Mutation, SignS3MutationVariables>;

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      videoname: // value for 'videoname'
 *      thumbnailname: // value for 'thumbnailname'
 *      videoFiletype: // value for 'videoFiletype'
 *      thumbnailFiletype: // value for 'thumbnailFiletype'
 *   },
 * });
 */
export function useSignS3Mutation(baseOptions?: Apollo.MutationHookOptions<SignS3Mutation, SignS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignS3Mutation, SignS3MutationVariables>(SignS3Document, options);
      }
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = Apollo.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = Apollo.BaseMutationOptions<SignS3Mutation, SignS3MutationVariables>;
export const SwitchAccountTypeDocument = gql`
    mutation switchAccountType($becomeCreator: Boolean!) {
  switchAccountType(becomeCreator: $becomeCreator)
}
    `;
export type SwitchAccountTypeMutationFn = Apollo.MutationFunction<SwitchAccountTypeMutation, SwitchAccountTypeMutationVariables>;

/**
 * __useSwitchAccountTypeMutation__
 *
 * To run a mutation, you first call `useSwitchAccountTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchAccountTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchAccountTypeMutation, { data, loading, error }] = useSwitchAccountTypeMutation({
 *   variables: {
 *      becomeCreator: // value for 'becomeCreator'
 *   },
 * });
 */
export function useSwitchAccountTypeMutation(baseOptions?: Apollo.MutationHookOptions<SwitchAccountTypeMutation, SwitchAccountTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchAccountTypeMutation, SwitchAccountTypeMutationVariables>(SwitchAccountTypeDocument, options);
      }
export type SwitchAccountTypeMutationHookResult = ReturnType<typeof useSwitchAccountTypeMutation>;
export type SwitchAccountTypeMutationResult = Apollo.MutationResult<SwitchAccountTypeMutation>;
export type SwitchAccountTypeMutationOptions = Apollo.BaseMutationOptions<SwitchAccountTypeMutation, SwitchAccountTypeMutationVariables>;
export const ToggleFollowDocument = gql`
    mutation toggleFollow($targetUserId: String!) {
  toggleFollow(targetUserId: $targetUserId)
}
    `;
export type ToggleFollowMutationFn = Apollo.MutationFunction<ToggleFollowMutation, ToggleFollowMutationVariables>;

/**
 * __useToggleFollowMutation__
 *
 * To run a mutation, you first call `useToggleFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFollowMutation, { data, loading, error }] = useToggleFollowMutation({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useToggleFollowMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFollowMutation, ToggleFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFollowMutation, ToggleFollowMutationVariables>(ToggleFollowDocument, options);
      }
export type ToggleFollowMutationHookResult = ReturnType<typeof useToggleFollowMutation>;
export type ToggleFollowMutationResult = Apollo.MutationResult<ToggleFollowMutation>;
export type ToggleFollowMutationOptions = Apollo.BaseMutationOptions<ToggleFollowMutation, ToggleFollowMutationVariables>;
export const UpdateAddressDocument = gql`
    mutation updateAddress($input: AddressInput!, $id: Int!) {
  updateAddress(input: $input, id: $id) {
    name
    phonenumber
    id
    userId
    line1
    line2
    subdistrict
    district
    province
    country
    postcode
  }
}
    `;
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const UpdateCartItemDocument = gql`
    mutation updateCartItem($id: Int!, $quantity: Int!, $mealkitId: Int!) {
  updateCartItem(id: $id, quantity: $quantity, mealkitId: $mealkitId) {
    id
    quantity
    total
    mealkit {
      price
    }
  }
}
    `;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<UpdateCartItemMutation, UpdateCartItemMutationVariables>;

/**
 * __useUpdateCartItemMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemMutation, { data, loading, error }] = useUpdateCartItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      quantity: // value for 'quantity'
 *      mealkitId: // value for 'mealkitId'
 *   },
 * });
 */
export function useUpdateCartItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartItemMutation, UpdateCartItemMutationVariables>(UpdateCartItemDocument, options);
      }
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const UpdateMealkitDocument = gql`
    mutation updateMealkit($input: MealkitInput!, $id: Int!) {
  updateMealkit(input: $input, id: $id) {
    items
    images
    price
    id
  }
}
    `;
export type UpdateMealkitMutationFn = Apollo.MutationFunction<UpdateMealkitMutation, UpdateMealkitMutationVariables>;

/**
 * __useUpdateMealkitMutation__
 *
 * To run a mutation, you first call `useUpdateMealkitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMealkitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMealkitMutation, { data, loading, error }] = useUpdateMealkitMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMealkitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMealkitMutation, UpdateMealkitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMealkitMutation, UpdateMealkitMutationVariables>(UpdateMealkitDocument, options);
      }
export type UpdateMealkitMutationHookResult = ReturnType<typeof useUpdateMealkitMutation>;
export type UpdateMealkitMutationResult = Apollo.MutationResult<UpdateMealkitMutation>;
export type UpdateMealkitMutationOptions = Apollo.BaseMutationOptions<UpdateMealkitMutation, UpdateMealkitMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $input: PostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
    textSnippet
    videoUrl
    ingredients {
      ingredient
      amount
      unit
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UserInput!) {
  updateUser(input: $input) {
    id
    email
    phonenumber
    about
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

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
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const AddressDocument = gql`
    query address {
  address {
    name
    phonenumber
    id
    userId
    line1
    line2
    subdistrict
    district
    province
    country
    postcode
  }
}
    `;

/**
 * __useAddressQuery__
 *
 * To run a query within a React component, call `useAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressQuery(baseOptions?: Apollo.QueryHookOptions<AddressQuery, AddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressQuery, AddressQueryVariables>(AddressDocument, options);
      }
export function useAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressQuery, AddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressQuery, AddressQueryVariables>(AddressDocument, options);
        }
export type AddressQueryHookResult = ReturnType<typeof useAddressQuery>;
export type AddressLazyQueryHookResult = ReturnType<typeof useAddressLazyQuery>;
export type AddressQueryResult = Apollo.QueryResult<AddressQuery, AddressQueryVariables>;
export const CartItemsDocument = gql`
    query cartItems {
  cartItems {
    id
    quantity
    userId
    mealkitId
    total
    user {
      username
    }
    mealkit {
      name
      images
      price
      portion
      post {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useCartItemsQuery__
 *
 * To run a query within a React component, call `useCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
      }
export function useCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
        }
export type CartItemsQueryHookResult = ReturnType<typeof useCartItemsQuery>;
export type CartItemsLazyQueryHookResult = ReturnType<typeof useCartItemsLazyQuery>;
export type CartItemsQueryResult = Apollo.QueryResult<CartItemsQuery, CartItemsQueryVariables>;
export const FollowersDocument = gql`
    query followers($userId: String!) {
  followers(userId: $userId) {
    id
    followerId
    follower {
      username
    }
  }
}
    `;

/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowersQuery(baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
      }
export function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
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
export const MealkitsDocument = gql`
    query mealkits($postId: Int!) {
  mealkits(postId: $postId) {
    id
    items
    images
    price
    portion
  }
}
    `;

/**
 * __useMealkitsQuery__
 *
 * To run a query within a React component, call `useMealkitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealkitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealkitsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useMealkitsQuery(baseOptions: Apollo.QueryHookOptions<MealkitsQuery, MealkitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MealkitsQuery, MealkitsQueryVariables>(MealkitsDocument, options);
      }
export function useMealkitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealkitsQuery, MealkitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MealkitsQuery, MealkitsQueryVariables>(MealkitsDocument, options);
        }
export type MealkitsQueryHookResult = ReturnType<typeof useMealkitsQuery>;
export type MealkitsLazyQueryHookResult = ReturnType<typeof useMealkitsLazyQuery>;
export type MealkitsQueryResult = Apollo.QueryResult<MealkitsQuery, MealkitsQueryVariables>;
export const MyOrdersDocument = gql`
    query myOrders($status: OrderStatus!) {
  myOrders(status: $status) {
    id
    grossOrder
    status
    userId
    cartItems {
      id
      quantity
      total
      mealkitId
      mealkit {
        id
        name
        price
        images
      }
    }
    payment {
      id
      qrUrl
      amount
    }
  }
}
    `;

/**
 * __useMyOrdersQuery__
 *
 * To run a query within a React component, call `useMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrdersQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useMyOrdersQuery(baseOptions: Apollo.QueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, options);
      }
export function useMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, options);
        }
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<typeof useMyOrdersLazyQuery>;
export type MyOrdersQueryResult = Apollo.QueryResult<MyOrdersQuery, MyOrdersQueryVariables>;
export const OrderItemsDocument = gql`
    query orderItems($status: OrderStatus!) {
  orderItems(status: $status) {
    id
    quantity
    userId
    mealkitId
    total
    user {
      username
    }
    mealkit {
      name
      images
      price
      portion
      post {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useOrderItemsQuery__
 *
 * To run a query within a React component, call `useOrderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderItemsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useOrderItemsQuery(baseOptions: Apollo.QueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
      }
export function useOrderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
        }
export type OrderItemsQueryHookResult = ReturnType<typeof useOrderItemsQuery>;
export type OrderItemsLazyQueryHookResult = ReturnType<typeof useOrderItemsLazyQuery>;
export type OrderItemsQueryResult = Apollo.QueryResult<OrderItemsQuery, OrderItemsQueryVariables>;
export const PaymentDocument = gql`
    query payment($id: Int!) {
  payment(id: $id) {
    id
    qrUrl
    amount
  }
}
    `;

/**
 * __usePaymentQuery__
 *
 * To run a query within a React component, call `usePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentQuery(baseOptions: Apollo.QueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
      }
export function usePaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
        }
export type PaymentQueryHookResult = ReturnType<typeof usePaymentQuery>;
export type PaymentLazyQueryHookResult = ReturnType<typeof usePaymentLazyQuery>;
export type PaymentQueryResult = Apollo.QueryResult<PaymentQuery, PaymentQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    title
    text
    instruction
    cooktime
    portion
    advice
    videoUrl
    thumbnailUrl
    createdAt
    updatedAt
    points
    voteStatus
    ingredients {
      ingredient
      amount
      unit
    }
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
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
export const PostsByCreatorDocument = gql`
    query postsByCreator($userId: String!) {
  postsByCreator(userId: $userId) {
    id
    title
    text
    thumbnailUrl
    points
  }
}
    `;

/**
 * __usePostsByCreatorQuery__
 *
 * To run a query within a React component, call `usePostsByCreatorQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByCreatorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByCreatorQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePostsByCreatorQuery(baseOptions: Apollo.QueryHookOptions<PostsByCreatorQuery, PostsByCreatorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByCreatorQuery, PostsByCreatorQueryVariables>(PostsByCreatorDocument, options);
      }
export function usePostsByCreatorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByCreatorQuery, PostsByCreatorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByCreatorQuery, PostsByCreatorQueryVariables>(PostsByCreatorDocument, options);
        }
export type PostsByCreatorQueryHookResult = ReturnType<typeof usePostsByCreatorQuery>;
export type PostsByCreatorLazyQueryHookResult = ReturnType<typeof usePostsByCreatorLazyQuery>;
export type PostsByCreatorQueryResult = Apollo.QueryResult<PostsByCreatorQuery, PostsByCreatorQueryVariables>;
export const UserDocument = gql`
    query user($id: String!) {
  user(id: $id) {
    id
    username
    about
    avatar
    isFollowed
    followerNum
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const VotedPostsDocument = gql`
    query votedPosts($limit: Int!, $cursor: String) {
  votedPosts(limit: $limit, cursor: $cursor) {
    posts {
      id
      title
      textSnippet
      videoUrl
      thumbnailUrl
    }
    hasMore
  }
}
    `;

/**
 * __useVotedPostsQuery__
 *
 * To run a query within a React component, call `useVotedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVotedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotedPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useVotedPostsQuery(baseOptions: Apollo.QueryHookOptions<VotedPostsQuery, VotedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VotedPostsQuery, VotedPostsQueryVariables>(VotedPostsDocument, options);
      }
export function useVotedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VotedPostsQuery, VotedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VotedPostsQuery, VotedPostsQueryVariables>(VotedPostsDocument, options);
        }
export type VotedPostsQueryHookResult = ReturnType<typeof useVotedPostsQuery>;
export type VotedPostsLazyQueryHookResult = ReturnType<typeof useVotedPostsLazyQuery>;
export type VotedPostsQueryResult = Apollo.QueryResult<VotedPostsQuery, VotedPostsQueryVariables>;