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
import { Box, User } from ".";

// many to many
// user <-> boxs
// user -> join table <- boxs
// user -> upvote <- boxs

@ObjectType()
@Entity()
class JoinBox extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: string;

  @Field(() => User) // have to be explicit
  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @Field()
  @PrimaryColumn()
  boxId: string;

  @Field(() => Box)
  @ManyToOne(() => Box, (box) => box.joinBoxes, {
    onDelete: "CASCADE",
  })
  box: Box;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default JoinBox;
