import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import {
  Address,
  CartItem,
  Follow,
  Mealkit,
  Order,
  PaymentInfo,
  Review,
  Post,
  Upvote,
} from "./";

@ObjectType()
@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column({ unique: true })
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ unique: true })
  @Field()
  phonenumber!: string;

  @Column("boolean", { default: false })
  @Field()
  isCreator!: boolean;

  @Column({ unique: true })
  @Field()
  avatar!: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  about: string;

  //   Client can't query for pass word it will and hashed
  @Column()
  password!: string;

  @OneToMany((type) => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany((type) => Mealkit, (mealkit) => mealkit.creator)
  mealkits: Mealkit[];
  // .posts have to be matched what in the Post.ts

  @OneToMany((type) => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Column({ type: "int", default: 0 })
  @Field()
  followerNum!: number;

  @Field()
  isFollowed: boolean;

  // relatioship with profile starts
  @Field(() => Address, { nullable: true })
  @OneToOne((type) => Address, (address) => address.user)
  // @JoinColumn()
  address: Address;
  // relatioship with account ends -> profileId

  //has many carts
  @OneToMany((type) => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  //One user can have many orders
  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  //Follow function
  @OneToMany((type) => Follow, (followed) => followed.user)
  followed: Follow[];

  @OneToMany((type) => Follow, (following) => following.follower)
  following: Follow[];

  @OneToOne((type) => PaymentInfo, (paymentInfo) => paymentInfo.user)
  @JoinColumn()
  @Field(() => PaymentInfo, { nullable: true })
  paymentInfo: PaymentInfo;

  // relationshiop with reviews
  @OneToMany(() => Review, (reviews) => reviews.user)
  @Field(() => [Review])
  reviews: Review[];

  @Column({ default: false })
  @Field()
  isAdmin: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default User;
