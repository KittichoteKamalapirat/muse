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
} from ".";

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

  @Column()
  @Field()
  avatar: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  about: string;

  //   Client can't query for pass word it will and hashed
  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.creator, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Mealkit, (mealkit) => mealkit.creator)
  mealkits: Mealkit[];
  // .posts have to be matched what in the Post.ts

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Column({ type: "int", default: 0 })
  @Field()
  followerNum!: number;

  @Field()
  isFollowed: boolean;

  // relatioship with profile starts
  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
  })
  // @JoinColumn()
  address: Address;
  // relatioship with account ends -> profileId

  // has many carts
  @OneToMany(() => CartItem, (cartItem) => cartItem.user, { cascade: true })
  cartItems: CartItem[];

  // One user can have many orders
  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];

  // Follow function
  @OneToMany(() => Follow, (followed) => followed.user, { cascade: true })
  followed: Follow[];

  @OneToMany(() => Follow, (following) => following.follower, { cascade: true })
  following: Follow[];

  @OneToOne(() => PaymentInfo, (paymentInfo) => paymentInfo.user, {
    cascade: true,
  })
  @JoinColumn()
  @Field(() => PaymentInfo, { nullable: true })
  paymentInfo: PaymentInfo;

  // relationshiop with reviews
  @OneToMany(() => Review, (reviews) => reviews.user, { cascade: true })
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
