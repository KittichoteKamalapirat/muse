import { Field, ObjectType } from "type-graphql";
import {
  Column,
  PrimaryColumn,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followed, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field()
  @Column()
  followerId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.following, {
    onDelete: "CASCADE",
  })
  follower: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
