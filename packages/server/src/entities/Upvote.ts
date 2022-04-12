import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post, User } from "./";

// many to many
// user <-> posts
// user -> join table <- posts
// user -> upvote <- posts

@ObjectType()
@Entity()
class Upvote extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number; //will be 1 or -1

  @Field()
  @PrimaryColumn()
  userId: string;

  @Field(() => User) //have to be explicit
  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.upvotes, {
    onDelete: "CASCADE",
  })
  post: Post;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Upvote;
