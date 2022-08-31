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
import { SongRequest, User } from ".";

// many to many
// user <-> SongRequests
// user -> join table <- SongRequests
// user -> upvote <- SongRequests

@ObjectType()
@Entity()
class Upvote extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number; // will be 1 or -1

  @Field()
  @PrimaryColumn()
  userId: string;

  @Field(() => User) // have to be explicit
  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @Field()
  @PrimaryColumn()
  songRequestId: string;

  @Field(() => SongRequest)
  @ManyToOne(() => SongRequest, (songRequest) => songRequest.upvotes, {
    onDelete: "CASCADE",
  })
  songRequest: SongRequest;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Upvote;
