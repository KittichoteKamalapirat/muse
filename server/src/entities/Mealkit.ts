import { Field, InputType, Int, ObjectType } from "type-graphql";

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
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Mealkit extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @Field()
  postId: number;

  @Field(() => Post, { nullable: true }) //need to have explicit type
  @ManyToOne((type) => Post, (post) => post.mealkits)
  post: Post;

  @Column()
  @Field()
  creatorId: string;

  @Field(() => User, { nullable: true }) //need to have explicit type
  @ManyToOne((type) => User, (user) => user.mealkits)
  //user.posts have to be added in the User type
  creator: User;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
