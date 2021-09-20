import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Post } from "./Post";
import { Upvote } from "./Upvote";
import { User } from "./User";

@ObjectType()
@Entity()
export class AccountInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ nullable: true })
  @Field()
  address: string;

  @Column({ unique: true, nullable: true })
  @Field()
  mobileNumber: string;

  @Column({ unique: true, nullable: true })
  @Field()
  avatarUrl: string;

  // relatioship with user start

  @Column()
  @Field(() => Int)
  // @Field()
  userId: number;

  @Field(() => User) //need to have explicit type
  @OneToOne((type) => User, (user) => user.accountInfo)
  //user.posts have to be added in the User type
  user: User;

  // relatioship with user ends

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
