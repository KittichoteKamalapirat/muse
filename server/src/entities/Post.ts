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
import { Upvote } from "./Upvote";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ nullable: true })
  @Field()
  title!: string;

  @Column({ nullable: true })
  @Field()
  text!: string;

  @Column({ type: "int", default: 0 })
  @Field()
  points!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; //willl be 1 or -1, this is used to check the status of this post for a user

  @Column()
  @Field()
  videoUrl!: string;

  @Column()
  @Field()
  // @Field()
  creatorId: number;

  @Field(() => User) //need to have explicit type
  @ManyToOne((type) => User, (user) => user.posts)
  //user.posts have to be added in the User type
  creator: User;
  // └the foreign Id will be creatorId
  // Many to one will create a foreign key, but we sitll ne to create the colum by ourself

  @OneToMany((type) => Upvote, (upvote) => upvote.post)
  upvotes: Upvote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
