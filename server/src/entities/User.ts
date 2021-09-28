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
import { Address } from "./Address";
import { Post } from "./Post";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  // will use this later
  //   @Column({ unique: true })
  //   @Field()
  //   phone_no!: string;

  @Column({ unique: true })
  @Field()
  username!: string;

  // , nullable: true
  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ unique: true })
  @Field()
  avatar!: string;

  //   Client can't query for pass word it will and hashed
  @Column()
  password!: string;

  @OneToMany((type) => Post, (post) => post.creator)
  posts: Post[];
  // .posts have to be matched what in the Post.ts

  @OneToMany((type) => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  // relatioship with profile starts
  @OneToOne((type) => Address, (address) => address.user)
  @JoinColumn()
  address: Address;
  // relatioship with account ends -> profileId

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
