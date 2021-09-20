import { ObjectType, Field, Int } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  ingredient!: string;

  @Column()
  @Field()
  amount!: number;

  @Column()
  @Field()
  unit!: string;

  @Field()
  @Column()
  postId: number;

  // @Field(() => Post)
  // @ManyToOne((type) => Post, (post) => post.ingredients) //type => Post is a function that returns the class of the entity with which we want to make our relationship.
  // post: Post;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
