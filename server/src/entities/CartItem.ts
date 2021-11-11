import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Mealkit } from "./Mealkit";
import { Order } from "./Order";
import { User } from "./User";

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  // @Field()
  quantity: number;

  //   belongs to a user
  @Column()
  @Field()
  userId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.cartItems)
  user: User;

  //belongs to mealkit
  // one mealkit -> many cart
  // on cart one mealkit

  @Column()
  @Field(() => Int)
  mealkitId: number;

  @Field(() => Mealkit, { nullable: true })
  @ManyToOne((type) => Mealkit, (mealkit) => mealkit.cartItems)
  mealkit: Mealkit;

  // @Field(() => Order, { nullable: true })
  @ManyToOne((type) => Order, (order) => order.cartItems)
  order: Order;

  //Order can have many cartItems
  @Column({ nullable: true })
  @Field(() => Int)
  orderId: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
