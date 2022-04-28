import * as Apollo from "@apollo/client";
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<
  T extends {
    [key: string]: unknown;
  }
> = {
  [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};
export declare type AddToCart = {
  __typename?: "AddToCart";
  cartItem: CartItem;
  newItem: Scalars["Boolean"];
};
export declare type Address = {
  __typename?: "Address";
  country: Scalars["String"];
  createdAt: Scalars["DateTime"];
  district: Scalars["String"];
  id: Scalars["Float"];
  line1: Scalars["String"];
  line2: Scalars["String"];
  name: Scalars["String"];
  phonenumber: Scalars["String"];
  postcode: Scalars["String"];
  province: Scalars["String"];
  subdistrict: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["String"];
};
export declare type AddressInput = {
  country: Scalars["String"];
  district: Scalars["String"];
  line1: Scalars["String"];
  line2: Scalars["String"];
  name: Scalars["String"];
  phonenumber: Scalars["String"];
  postcode: Scalars["String"];
  province: Scalars["String"];
  subdistrict: Scalars["String"];
};
export declare type CartItem = {
  __typename?: "CartItem";
  cartItemNoti: CartItemNoti;
  createdAt: Scalars["String"];
  fieldTotal: Scalars["Int"];
  id: Scalars["Float"];
  isReviewed: Scalars["Boolean"];
  mealkit: Mealkit;
  mealkitId: Scalars["Int"];
  orderId: Scalars["Int"];
  quantity: Scalars["Float"];
  status: Scalars["String"];
  total: Scalars["Int"];
  tracking?: Maybe<Tracking>;
  updatedAt: Scalars["String"];
  user?: Maybe<User>;
  userId: Scalars["String"];
};
export declare type CartItemInput = {
  mealkitId: Scalars["Float"];
  quantity: Scalars["Float"];
};
export declare type CartItemNoti = {
  __typename?: "CartItemNoti";
  cartItem: CartItem;
  cartItemId: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  creatorId: Scalars["String"];
  id: Scalars["Float"];
  message: Scalars["String"];
  read: Scalars["Boolean"];
  updatedAt: Scalars["DateTime"];
};
export declare enum CartItemStatus {
  Cancelled = "Cancelled",
  Delivered = "Delivered",
  OnTheWay = "OnTheWay",
  PaymentPending = "PaymentPending",
  Received = "Received",
  Refunded = "Refunded",
  ToDeliver = "ToDeliver",
  UnOrdered = "UnOrdered",
}
export declare type CartItemsByCreator = {
  __typename?: "CartItemsByCreator";
  creatorId: Scalars["String"];
  deliveryFee: Scalars["Float"];
  mealkitsFee: Scalars["Float"];
};
export declare type CartItemsByCreatorFormat = {
  __typename?: "CartItemsByCreatorFormat";
  avatar: Scalars["String"];
  cartItems: Array<CartItem>;
  creatorId: Scalars["String"];
  creatorName: Scalars["String"];
  deliveryFee: Scalars["Int"];
  totalByCreator: Scalars["Float"];
};
export declare type CartItemsByCreatorInput = {
  creatorId: Scalars["String"];
  deliveryFee: Scalars["Float"];
  mealkitsFee: Scalars["Float"];
};
export declare type CartItemsByOrderFormat = {
  __typename?: "CartItemsByOrderFormat";
  byCreator: Array<CartItemsByCreatorFormat>;
  grossOrder: Scalars["Float"];
  orderId: Scalars["Float"];
  paymentId: Scalars["Float"];
  trackingId?: Maybe<Scalars["Float"]>;
};
export declare type ConfirmData = {
  __typename?: "ConfirmData";
  amount: Scalars["String"];
  countryCode: Scalars["String"];
  paidLocalAmount: Scalars["String"];
  paidLocalCurrency: Scalars["String"];
  receiver: Person;
  receivingBank: Scalars["String"];
  ref1: Scalars["String"];
  ref2: Scalars["String"];
  ref3: Scalars["String"];
  sender: Person;
  sendingBank: Scalars["String"];
  transDate: Scalars["String"];
  transRef: Scalars["String"];
  transTime: Scalars["String"];
};
export declare type ConfirmationResponse = {
  __typename?: "ConfirmationResponse";
  data: ConfirmData;
  status: Status;
};
export declare type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};
export declare type Follow = {
  __typename?: "Follow";
  createdAt: Scalars["String"];
  follower: User;
  followerId: Scalars["String"];
  id: Scalars["Float"];
  updatedAt: Scalars["String"];
  user: User;
  userId: Scalars["String"];
};
export declare type Ingredient = {
  __typename?: "Ingredient";
  amount: Scalars["String"];
  ingredient: Scalars["String"];
  unit: Scalars["String"];
};
export declare type IngredientInput = {
  amount: Scalars["String"];
  ingredient: Scalars["String"];
  unit: Scalars["String"];
};
export declare type MappedCreatorOrders = {
  __typename?: "MappedCreatorOrders";
  address: Address;
  avatar: Scalars["String"];
  cartItems: Array<CartItem>;
  deliveryFee: Scalars["Int"];
  orderId?: Maybe<Scalars["Float"]>;
  tracking?: Maybe<Tracking>;
  username: Scalars["String"];
};
export declare type Mealkit = {
  __typename?: "Mealkit";
  createdAt: Scalars["String"];
  creator: User;
  creatorId: Scalars["String"];
  deliveryFee: Scalars["Float"];
  id: Scalars["Float"];
  images?: Maybe<Array<Scalars["String"]>>;
  items?: Maybe<Array<Scalars["String"]>>;
  name: Scalars["String"];
  portion: Scalars["Float"];
  post?: Maybe<Post>;
  postId: Scalars["Float"];
  price?: Maybe<Scalars["Int"]>;
  reviewAvg: Scalars["Float"];
  reviews: Array<Review>;
  reviewsCounter: Scalars["Int"];
  reviewsSum: Scalars["Int"];
  updatedAt: Scalars["String"];
};
export declare type MealkitInput = {
  images: Array<Scalars["String"]>;
  items: Array<Scalars["String"]>;
  name: Scalars["String"];
  portion: Scalars["Float"];
  price: Scalars["Float"];
};
export declare type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  createAddress: Address;
  createCartItem: AddToCart;
  createMealkit: Mealkit;
  createOrder: Order;
  createPaymentInfo: PaymentInfoResponse;
  createPost: Post;
  createReview: Review;
  createTracking: Tracking;
  deleteAddress: Scalars["Boolean"];
  deleteCartItem: Scalars["Boolean"];
  deleteMealkit: Scalars["Boolean"];
  deletePaymentInfo: Scalars["Boolean"];
  deletePost: Scalars["Boolean"];
  deleteReview: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  login: UserResponse;
  logout: Scalars["Boolean"];
  readOrderNotis: Scalars["Boolean"];
  register: UserResponse;
  signAvatarS3: SignedS3;
  signMealkitS3: Array<SignedS3Result>;
  signS3: PostSignedS3;
  signSingleFileS3: SingleFileSignedS3;
  switchAccountType: Scalars["Boolean"];
  toggleFollow: Scalars["Boolean"];
  updateAddress?: Maybe<Address>;
  updateAvatar: Scalars["Boolean"];
  updateCartItem: CartItem;
  updateMealkit?: Maybe<Mealkit>;
  updatePaymentInfo?: Maybe<PaymentInfoResponse>;
  updatePost?: Maybe<Post>;
  updateReview: Review;
  updateUser: User;
  uploadSlip: Scalars["Boolean"];
  vote: Scalars["Boolean"];
};
export declare type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};
export declare type MutationCreateAddressArgs = {
  input: AddressInput;
};
export declare type MutationCreateCartItemArgs = {
  input: CartItemInput;
};
export declare type MutationCreateMealkitArgs = {
  input: MealkitInput;
  postId: Scalars["Int"];
};
export declare type MutationCreateOrderArgs = {
  cartItemIds: Array<Scalars["Int"]>;
  cartItemsByCreatorInput: Array<CartItemsByCreatorInput>;
  grossOrder: Scalars["Int"];
};
export declare type MutationCreatePaymentInfoArgs = {
  input: PaymentInfoInput;
};
export declare type MutationCreatePostArgs = {
  input: PostInput;
};
export declare type MutationCreateReviewArgs = {
  cartItemId: Scalars["Int"];
  input: ReviewInput;
  mealkitId: Scalars["Int"];
};
export declare type MutationCreateTrackingArgs = {
  input: TrackingInput;
};
export declare type MutationDeleteAddressArgs = {
  id: Scalars["Int"];
};
export declare type MutationDeleteCartItemArgs = {
  id: Scalars["Int"];
};
export declare type MutationDeleteMealkitArgs = {
  id: Scalars["Int"];
};
export declare type MutationDeletePaymentInfoArgs = {
  id: Scalars["Int"];
};
export declare type MutationDeletePostArgs = {
  id: Scalars["Int"];
};
export declare type MutationDeleteReviewArgs = {
  cartItemId: Scalars["Int"];
  mealkitId: Scalars["Int"];
};
export declare type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};
export declare type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmailOrPhonenumber: Scalars["String"];
};
export declare type MutationRegisterArgs = {
  data: UsernamePasswordInput;
};
export declare type MutationSignAvatarS3Args = {
  filetype: Scalars["String"];
  name: Scalars["String"];
};
export declare type MutationSignMealkitS3Args = {
  input: Array<SignS3Params>;
};
export declare type MutationSignS3Args = {
  thumbnailFiletype: Scalars["String"];
  thumbnailname: Scalars["String"];
  videoFiletype: Scalars["String"];
  videoname: Scalars["String"];
};
export declare type MutationSignSingleFileS3Args = {
  filename: Scalars["String"];
  filetype: Scalars["String"];
};
export declare type MutationSwitchAccountTypeArgs = {
  becomeCreator: Scalars["Boolean"];
};
export declare type MutationToggleFollowArgs = {
  targetUserId: Scalars["String"];
};
export declare type MutationUpdateAddressArgs = {
  id: Scalars["Int"];
  input: AddressInput;
};
export declare type MutationUpdateAvatarArgs = {
  newAvatar: Scalars["String"];
};
export declare type MutationUpdateCartItemArgs = {
  id: Scalars["Int"];
  mealkitId: Scalars["Int"];
  quantity: Scalars["Int"];
};
export declare type MutationUpdateMealkitArgs = {
  id: Scalars["Int"];
  input: MealkitInput;
};
export declare type MutationUpdatePaymentInfoArgs = {
  id: Scalars["Int"];
  input: PaymentInfoInput;
};
export declare type MutationUpdatePostArgs = {
  id: Scalars["Int"];
  input: PostInput;
};
export declare type MutationUpdateReviewArgs = {
  cartItemId: Scalars["Int"];
  input: ReviewInput;
  mealkitId: Scalars["Int"];
};
export declare type MutationUpdateUserArgs = {
  input: UserInput;
};
export declare type MutationUploadSlipArgs = {
  paymentId: Scalars["Int"];
  slipUrl: Scalars["String"];
};
export declare type MutationVoteArgs = {
  postId: Scalars["Int"];
  value: Scalars["Int"];
};
export declare type Order = {
  __typename?: "Order";
  cartItems: Array<CartItem>;
  cartItemsByCreator?: Maybe<Array<CartItemsByCreator>>;
  createdAt: Scalars["DateTime"];
  grossOrder: Scalars["Float"];
  id: Scalars["Float"];
  payment?: Maybe<Payment>;
  paymentId: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  userId: Scalars["String"];
};
export declare type PaginatedPosts = {
  __typename?: "PaginatedPosts";
  hasMore: Scalars["Boolean"];
  posts: Array<Post>;
};
export declare type Payment = {
  __typename?: "Payment";
  amount: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  qrUrl: Scalars["String"];
  slipUrl?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};
export declare type PaymentInfo = {
  __typename?: "PaymentInfo";
  bankAccount: Scalars["String"];
  bankCode: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["String"];
};
export declare type PaymentInfoInput = {
  bankAccount: Scalars["String"];
  bankCode: Scalars["String"];
};
export declare type PaymentInfoResponse = {
  __typename?: "PaymentInfoResponse";
  errors?: Maybe<Array<FieldError>>;
  paymentInfo?: Maybe<PaymentInfo>;
};
export declare type Person = {
  __typename?: "Person";
  account: TypeAndValue;
  displayName: Scalars["String"];
  name: Scalars["String"];
  proxy: TypeAndValue;
};
export declare type Post = {
  __typename?: "Post";
  advice?: Maybe<Array<Scalars["String"]>>;
  cooktime?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  creator: User;
  creatorId: Scalars["String"];
  id: Scalars["Float"];
  ingredients?: Maybe<Array<Ingredient>>;
  instruction?: Maybe<Array<Scalars["String"]>>;
  mealkits?: Maybe<Array<Mealkit>>;
  points: Scalars["Float"];
  portion?: Maybe<Scalars["Int"]>;
  text: Scalars["String"];
  textSnippet: Scalars["String"];
  thumbnailUrl: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
  videoUrl: Scalars["String"];
  voteStatus?: Maybe<Scalars["Int"]>;
};
export declare type PostInput = {
  advice: Array<Scalars["String"]>;
  cooktime: Scalars["String"];
  ingredients: Array<IngredientInput>;
  instruction: Array<Scalars["String"]>;
  portion: Scalars["Float"];
  text: Scalars["String"];
  thumbnailUrl: Scalars["String"];
  title: Scalars["String"];
  videoUrl: Scalars["String"];
};
export declare type PostSignedS3 = {
  __typename?: "PostSignedS3";
  thumbnailSignedRequest: Scalars["String"];
  thumbnailUrl: Scalars["String"];
  videoSignedRequest: Scalars["String"];
  videoUrl: Scalars["String"];
};
export declare type Query = {
  __typename?: "Query";
  address: Address;
  cartItems: Array<CartItem>;
  confirmPayment: ConfirmationResponse;
  creatorOrders: Array<MappedCreatorOrders>;
  followers: Array<Follow>;
  following: Array<Follow>;
  manuallyConfirmPayment: Scalars["Boolean"];
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
export declare type QueryConfirmPaymentArgs = {
  sendingBank: Scalars["String"];
  transRef: Scalars["String"];
};
export declare type QueryCreatorOrdersArgs = {
  status: CartItemStatus;
};
export declare type QueryFollowersArgs = {
  userId: Scalars["String"];
};
export declare type QueryFollowingArgs = {
  userId: Scalars["String"];
};
export declare type QueryManuallyConfirmPaymentArgs = {
  paymentId: Scalars["Int"];
};
export declare type QueryMealkitArgs = {
  id: Scalars["Int"];
};
export declare type QueryMealkitsArgs = {
  postId: Scalars["Int"];
};
export declare type QueryPaymentArgs = {
  id: Scalars["Int"];
};
export declare type QueryPostArgs = {
  id: Scalars["Int"];
};
export declare type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};
export declare type QueryPostsByCreatorArgs = {
  userId: Scalars["String"];
};
export declare type QueryReviewsArgs = {
  mealkitId: Scalars["Int"];
};
export declare type QueryTrackingArgs = {
  id: Scalars["Int"];
};
export declare type QueryUserArgs = {
  id: Scalars["String"];
};
export declare type QueryUserOrdersArgs = {
  status: CartItemStatus;
};
export declare type QueryVotedPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};
export declare type Review = {
  __typename?: "Review";
  cartItemId: Scalars["Int"];
  createdAt: Scalars["String"];
  id: Scalars["Int"];
  images?: Maybe<Array<Scalars["String"]>>;
  mealkit: Mealkit;
  mealkitId: Scalars["Int"];
  score: Scalars["Int"];
  text?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
  user: User;
  userId: Scalars["String"];
};
export declare type ReviewInput = {
  score: Scalars["Int"];
  text: Scalars["String"];
  title: Scalars["String"];
};
export declare type SignedS3 = {
  __typename?: "SignedS3";
  signedRequest: Scalars["String"];
  url: Scalars["String"];
};
export declare type SingleFileSignedS3 = {
  __typename?: "SingleFileSignedS3";
  fileUrl: Scalars["String"];
  signedRequest: Scalars["String"];
};
export declare type Status = {
  __typename?: "Status";
  code: Scalars["Float"];
  description: Scalars["String"];
};
export declare type TimeLine = {
  __typename?: "TimeLine";
  date: Scalars["String"];
  details: Array<TimelineDetail>;
};
export declare type TimelineDetail = {
  __typename?: "TimelineDetail";
  date: Scalars["String"];
  dateTime: Scalars["String"];
  description: Scalars["String"];
  status: Scalars["String"];
  time: Scalars["String"];
};
export declare type Tracking = {
  __typename?: "Tracking";
  cartItems: Array<CartItem>;
  color: Scalars["String"];
  courier: Scalars["String"];
  courierKey: Scalars["String"];
  createdAt: Scalars["String"];
  currentStatus: Scalars["String"];
  id: Scalars["Float"];
  shareLink: Scalars["String"];
  status: Scalars["String"];
  timelines: Array<TimeLine>;
  trackingNo: Scalars["String"];
  updatedAt: Scalars["String"];
};
export declare type TrackingInput = {
  cartItemIds: Array<Scalars["Int"]>;
  courier: Scalars["String"];
  trackingNo: Scalars["String"];
};
export declare type TypeAndValue = {
  __typename?: "TypeAndValue";
  type: Scalars["String"];
  value: Scalars["String"];
};
export declare type User = {
  __typename?: "User";
  about?: Maybe<Scalars["String"]>;
  address?: Maybe<Address>;
  avatar: Scalars["String"];
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  followerNum: Scalars["Float"];
  id: Scalars["String"];
  isCreator: Scalars["Boolean"];
  isFollowed: Scalars["Boolean"];
  phonenumber: Scalars["String"];
  reviews: Array<Review>;
  updatedAt: Scalars["DateTime"];
  userReview: UserReview;
  username: Scalars["String"];
};
export declare type UserInput = {
  about: Scalars["String"];
  email: Scalars["String"];
  phonenumber: Scalars["String"];
  username: Scalars["String"];
};
export declare type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};
export declare type UserReview = {
  __typename?: "UserReview";
  reviewCounter: Scalars["Int"];
  reviewScore: Scalars["Int"];
};
/** Argument for register user */
export declare type UsernamePasswordInput = {
  email: Scalars["String"];
  isCreator?: InputMaybe<Scalars["Boolean"]>;
  password?: InputMaybe<Scalars["String"]>;
  phonenumber: Scalars["String"];
  username: Scalars["String"];
};
export declare type SignS3Params = {
  name: Scalars["String"];
  type: Scalars["String"];
};
export declare type SignedS3Result = {
  __typename?: "signedS3Result";
  signedRequest: Scalars["String"];
  url: Scalars["String"];
};
export declare type RegularErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};
export declare type RegularUserResponseFragment = {
  __typename?: "UserResponse";
  errors?:
    | Array<{
        __typename?: "FieldError";
        field: string;
        message: string;
      }>
    | null
    | undefined;
  user?:
    | {
        __typename?: "User";
        id: string;
        username: string;
        email: string;
        phonenumber: string;
        avatar: string;
        isCreator: boolean;
        about?: string | null | undefined;
        followerNum: number;
        userReview: {
          __typename?: "UserReview";
          reviewScore: number;
          reviewCounter: number;
        };
      }
    | null
    | undefined;
};
export declare type ReadOrderNotisMutationVariables = Exact<{
  [key: string]: never;
}>;
export declare type ReadOrderNotisMutation = {
  __typename?: "Mutation";
  readOrderNotis: boolean;
};
export declare type LoginMutationVariables = Exact<{
  usernameOrEmailOrPhonenumber: Scalars["String"];
  password: Scalars["String"];
}>;
export declare type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?:
      | Array<{
          __typename?: "FieldError";
          field: string;
          message: string;
        }>
      | null
      | undefined;
    user?:
      | {
          __typename?: "User";
          id: string;
          username: string;
          email: string;
          phonenumber: string;
          avatar: string;
          isCreator: boolean;
          about?: string | null | undefined;
          followerNum: number;
          userReview: {
            __typename?: "UserReview";
            reviewScore: number;
            reviewCounter: number;
          };
        }
      | null
      | undefined;
  };
};
export declare type RegisterMutationVariables = Exact<{
  data: UsernamePasswordInput;
}>;
export declare type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?:
      | Array<{
          __typename?: "FieldError";
          field: string;
          message: string;
        }>
      | null
      | undefined;
    user?:
      | {
          __typename?: "User";
          id: string;
          username: string;
          email: string;
          phonenumber: string;
          avatar: string;
          isCreator: boolean;
          about?: string | null | undefined;
          followerNum: number;
          userReview: {
            __typename?: "UserReview";
            reviewScore: number;
            reviewCounter: number;
          };
        }
      | null
      | undefined;
  };
};
export declare type OrderNotisQueryVariables = Exact<{
  [key: string]: never;
}>;
export declare type OrderNotisQuery = {
  __typename?: "Query";
  orderNotis: Array<{
    __typename?: "CartItemNoti";
    id: number;
    message: string;
    read: boolean;
    cartItemId: number;
    createdAt: any;
    cartItem: {
      __typename?: "CartItem";
      id: number;
      quantity: number;
      status: string;
      user?:
        | {
            __typename?: "User";
            username: string;
          }
        | null
        | undefined;
      mealkit: {
        __typename?: "Mealkit";
        name: string;
        images?: Array<string> | null | undefined;
      };
    };
  }>;
};
export declare type PostSnippetFragment = {
  __typename?: "Post";
  id: number;
  title: string;
  textSnippet: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  points: number;
  voteStatus?: number | null | undefined;
  mealkits?:
    | Array<{
        __typename?: "Mealkit";
        id: number;
        name: string;
        images?: Array<string> | null | undefined;
        price?: number | null | undefined;
        portion: number;
        reviewAvg: number;
        reviewsCounter: number;
      }>
    | null
    | undefined;
  creator: {
    __typename?: "User";
    id: string;
    username: string;
    avatar: string;
  };
};
export declare type PostsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;
export declare type PostsQuery = {
  __typename?: "Query";
  posts: {
    __typename?: "PaginatedPosts";
    hasMore: boolean;
    posts: Array<{
      __typename?: "Post";
      id: number;
      title: string;
      textSnippet: string;
      videoUrl: string;
      thumbnailUrl: string;
      createdAt: string;
      updatedAt: string;
      points: number;
      voteStatus?: number | null | undefined;
      mealkits?:
        | Array<{
            __typename?: "Mealkit";
            id: number;
            name: string;
            images?: Array<string> | null | undefined;
            price?: number | null | undefined;
            portion: number;
            reviewAvg: number;
            reviewsCounter: number;
          }>
        | null
        | undefined;
      creator: {
        __typename?: "User";
        id: string;
        username: string;
        avatar: string;
      };
    }>;
  };
};
export declare type RegularUserFragment = {
  __typename?: "User";
  id: string;
  username: string;
  email: string;
  phonenumber: string;
  avatar: string;
  isCreator: boolean;
  about?: string | null | undefined;
  followerNum: number;
  userReview: {
    __typename?: "UserReview";
    reviewScore: number;
    reviewCounter: number;
  };
};
export declare type MeQueryVariables = Exact<{
  [key: string]: never;
}>;
export declare type MeQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename?: "User";
        id: string;
        username: string;
        email: string;
        phonenumber: string;
        avatar: string;
        isCreator: boolean;
        about?: string | null | undefined;
        followerNum: number;
        userReview: {
          __typename?: "UserReview";
          reviewScore: number;
          reviewCounter: number;
        };
      }
    | null
    | undefined;
};
export declare const RegularErrorFragmentDoc: Apollo.DocumentNode;
export declare const RegularUserFragmentDoc: Apollo.DocumentNode;
export declare const RegularUserResponseFragmentDoc: Apollo.DocumentNode;
export declare const PostSnippetFragmentDoc: Apollo.DocumentNode;
export declare const ReadOrderNotisDocument: Apollo.DocumentNode;
export declare type ReadOrderNotisMutationFn = Apollo.MutationFunction<
  ReadOrderNotisMutation,
  ReadOrderNotisMutationVariables
>;
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
export declare function useReadOrderNotisMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReadOrderNotisMutation,
    ReadOrderNotisMutationVariables
  >
): Apollo.MutationTuple<
  ReadOrderNotisMutation,
  Exact<{
    [key: string]: never;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export declare type ReadOrderNotisMutationHookResult = ReturnType<
  typeof useReadOrderNotisMutation
>;
export declare type ReadOrderNotisMutationResult =
  Apollo.MutationResult<ReadOrderNotisMutation>;
export declare type ReadOrderNotisMutationOptions = Apollo.BaseMutationOptions<
  ReadOrderNotisMutation,
  ReadOrderNotisMutationVariables
>;
export declare const LoginDocument: Apollo.DocumentNode;
export declare type LoginMutationFn = Apollo.MutationFunction<
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
 *      usernameOrEmailOrPhonenumber: // value for 'usernameOrEmailOrPhonenumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export declare function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
): Apollo.MutationTuple<
  LoginMutation,
  Exact<{
    usernameOrEmailOrPhonenumber: string;
    password: string;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export declare type LoginMutationHookResult = ReturnType<
  typeof useLoginMutation
>;
export declare type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export declare type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export declare const RegisterDocument: Apollo.DocumentNode;
export declare type RegisterMutationFn = Apollo.MutationFunction<
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
export declare function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
): Apollo.MutationTuple<
  RegisterMutation,
  Exact<{
    data: UsernamePasswordInput;
  }>,
  Apollo.DefaultContext,
  Apollo.ApolloCache<any>
>;
export declare type RegisterMutationHookResult = ReturnType<
  typeof useRegisterMutation
>;
export declare type RegisterMutationResult =
  Apollo.MutationResult<RegisterMutation>;
export declare type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export declare const OrderNotisDocument: Apollo.DocumentNode;
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
export declare function useOrderNotisQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OrderNotisQuery,
    OrderNotisQueryVariables
  >
): Apollo.QueryResult<
  OrderNotisQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useOrderNotisLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrderNotisQuery,
    OrderNotisQueryVariables
  >
): Apollo.QueryTuple<
  OrderNotisQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare type OrderNotisQueryHookResult = ReturnType<
  typeof useOrderNotisQuery
>;
export declare type OrderNotisLazyQueryHookResult = ReturnType<
  typeof useOrderNotisLazyQuery
>;
export declare type OrderNotisQueryResult = Apollo.QueryResult<
  OrderNotisQuery,
  OrderNotisQueryVariables
>;
export declare const PostsDocument: Apollo.DocumentNode;
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
export declare function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
): Apollo.QueryResult<
  PostsQuery,
  Exact<{
    limit: number;
    cursor?: InputMaybe<string> | undefined;
  }>
>;
export declare function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
): Apollo.QueryTuple<
  PostsQuery,
  Exact<{
    limit: number;
    cursor?: InputMaybe<string> | undefined;
  }>
>;
export declare type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export declare type PostsLazyQueryHookResult = ReturnType<
  typeof usePostsLazyQuery
>;
export declare type PostsQueryResult = Apollo.QueryResult<
  PostsQuery,
  PostsQueryVariables
>;
export declare const MeDocument: Apollo.DocumentNode;
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
export declare function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
): Apollo.QueryResult<
  MeQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
): Apollo.QueryTuple<
  MeQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export declare type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export declare type MeQueryResult = Apollo.QueryResult<
  MeQuery,
  MeQueryVariables
>;
