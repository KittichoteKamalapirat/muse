import { Field, Int, ObjectType } from "type-graphql";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CartItem } from "./CartItem";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Mealkit extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name: string;

  @Column({ type: "int", nullable: true })
  @Field(() => Int, { nullable: true })
  price!: number;

  @Column()
  @Field()
  // @Field()
  portion: number;

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  items: string[];

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  images: string[];

  @Column()
  @Field()
  postId: number;

  @Field(() => Post, { nullable: true }) //need to have explicit type
  @ManyToOne((type) => Post, (post) => post.mealkits, {
    onDelete: "CASCADE",
  })
  post: Post;

  @Column()
  @Field()
  creatorId: string;

  @Field(() => User, { nullable: true }) //need to have explicit type
  @ManyToOne((type) => User, (user) => user.mealkits)
  //user.posts have to be added in the User type
  creator: User;

  // owner side
  // this create cartItemId according to typeORM
  // @OneToOne((type) => CartItem)
  // @JoinColumn()
  // cartItem: CartItem;

  @OneToMany((type) => CartItem, (cartItem) => cartItem.mealkit)
  cartItems: CartItem[];
  // @ManyToOne((type) => Mealkit, (mealkit) => mealkit.cartItems)

  @Column({ default: 0 })
  @Field()
  deliveryFee: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
