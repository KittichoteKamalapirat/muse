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
import { Post, Upvote, Box } from ".";
import SongRequest from "./SongRequest";

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
  phoneNumber!: string;

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

  @OneToMany(() => Box, (box) => box.creator, {
    cascade: true,
  })
  boxes: Box[];

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

  // One user can have many song requests
  @Field(() => [SongRequest])
  @OneToMany(() => SongRequest, (songRequest) => songRequest.requester, {
    cascade: true,
  })
  songRequests: SongRequest[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default User;
