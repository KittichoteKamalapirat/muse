import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post, Upvote } from ".";

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

  // .posts have to be matched what in the Post.ts

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Column({ type: "int", default: 0 })
  @Field()
  followerNum!: number;

  @Field()
  isFollowed: boolean;

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
