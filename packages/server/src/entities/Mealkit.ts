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
import { CartItem, User, Post, Review } from ".";
import MealkitFile from "./MealkitFile";

@ObjectType()
@Entity()
class Mealkit extends BaseEntity {
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

  // @Column("text", { nullable: true, array: true })
  // @Field(() => [String], { nullable: true })
  // images: string[];

  @Column()
  @Field()
  postId: number;

  @Field(() => Post, { nullable: true }) // need to have explicit type
  @ManyToOne(() => Post, (post) => post.mealkits, {
    onDelete: "CASCADE",
  })
  post: Post;

  @Column()
  @Field()
  creatorId: string;

  @Field(() => User) // need to have explicit type
  @ManyToOne(() => User, (user) => user.mealkits)
  // user.posts have to be added in the User type
  creator: User;

  // owner side
  // this create cartItemId according to typeORM
  // @OneToOne((type) => CartItem)
  // @JoinColumn()
  // cartItem: CartItem;

  @OneToMany(() => CartItem, (cartItem) => cartItem.mealkit)
  cartItems: CartItem[];
  // @ManyToOne((type) => Mealkit, (mealkit) => mealkit.cartItems)

  @Column({ default: 0 })
  @Field()
  deliveryFee: number;

  @OneToMany(() => MealkitFile, (mealkitFiles) => mealkitFiles.mealkit)
  @Field(() => [MealkitFile])
  mealkitFiles: MealkitFile[];

  @OneToMany(() => Review, (reviews) => reviews.mealkit)
  @Field(() => [Review])
  reviews: Review[];

  @Column({ type: "int", default: 0 })
  @Field(() => Int)
  reviewsSum: number;

  @Column({ type: "int", default: 0 })
  @Field(() => Int)
  reviewsCounter: number;

  // Date

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Mealkit;
