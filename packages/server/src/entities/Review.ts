import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Mealkit, User } from ".";

@Entity()
@ObjectType()
class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text: string;

  @Field(() => Int)
  @Column()
  score: number;

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  images: string[];

  // relationship with user

  @ManyToOne(() => User, (user) => user.reviews)
  @Field(() => User)
  user: User;

  @Field()
  @Column()
  userId: string;

  // relationship with mealkit

  @ManyToOne(() => Mealkit, (mealkit) => mealkit.reviews)
  @Field(() => Mealkit)
  mealkit: Mealkit;

  @Field(() => Int)
  @Column()
  mealkitId: number;

  // for verification purpose that 1 cartItem has 1 review, but on user can vote the same mealkit many times
  @Field(() => Int)
  @Column({ nullable: true })
  cartItemId: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Review;
