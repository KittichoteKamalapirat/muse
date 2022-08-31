import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Upvote, User } from ".";
import Cooktime from "./utils/post/ObjectType/Cooktime";

@ObjectType()
@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field()
  text: string;

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  instruction: string[];

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  advice: string[];

  @Column("jsonb", { nullable: true })
  @Field(() => Cooktime, { nullable: true })
  cooktime: Cooktime;

  @Column({ type: "int", nullable: true })
  @Field(() => Int, { nullable: true })
  portion: number;

  @Column({ type: "int", default: 0 })
  @Field()
  points: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; // willl be 1 or -1, this is used to check the status of this post for a user

  @Column({ default: true })
  @Field()
  isPublished: boolean;

  @Column()
  @Field()
  creatorId: string;

  @Field(() => User) // need to have explicit type
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  // user.posts have to be added in the User type
  creator: User;
  // └the foreign Id will be creatorId
  // Many to one will create a foreign key, but we sitll ne to create the colum by ourself

  // @Field(type => User) -> return User type?
  // Why use function syntax and not a simple { type: User } config object?
  // Because, by using function syntax we solve the problem of circular dependencies (e.g. Post <--> User), so it was adopted as a convention.
  // You can use the shorthand syntax @Field(() => Rate) if you want to save some keystrokes but it might be less readable for others.

  @OneToMany(() => Upvote, (upvote) => upvote.post, { cascade: true })
  upvotes: Upvote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Post;
