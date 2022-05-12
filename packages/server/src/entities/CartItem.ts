/* eslint-disable no-unused-vars */
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItemNoti, Mealkit, Order, Tracking, User } from ".";

export enum CartItemStatus {
  UnOrdered = "UnOrdered", // user: to pay, creator: payment pending. User has made an order.
  PaymentPending = "PaymentPending", // user: to pay, creator: payment pending. User has made an order.
  ToDeliver = "ToDeliver", // user: to be delivered, creator: to deliver. User paid and waiting for the creator to deliver
  OnTheWay = "OnTheWay", // user and creator: the products are being delivered. waiting for the courrier to deliver
  Delivered = "Delivered", // courier delivered (webhook)
  Received = "Received", // user confirmed
  Complete = "Complete", // admin transfered money to seller
  Cancelled = "Cancelled", // user and creator: cancelled. A user cancelled an order- > has to asked for permission before TO_DELIVER
  Refunded = "Refunded", // user: waiting for refund, creator: to refund
}

@ObjectType()
@Entity()
class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field(() => Int)
  total(): number {
    return this.quantity * this.mealkit.price;
  }

  @Column()
  @Field()
  // @Field()
  quantity: number;

  //   belongs to a user
  @Column()
  @Field()
  userId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: "CASCADE" })
  user: User;

  @Column({ default: CartItemStatus.UnOrdered })
  @Field()
  status: CartItemStatus;

  // belongs to mealkit
  // one mealkit -> many cart
  // on cart one mealkit

  @Column()
  @Field(() => Int)
  mealkitId: number;

  @Field(() => Mealkit)
  @ManyToOne(() => Mealkit, (mealkit) => mealkit.cartItems, {
    onDelete: "CASCADE",
  })
  mealkit: Mealkit;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.cartItems, { onDelete: "CASCADE" })
  order: Order;

  // Order can have many cartItems
  @Column({ nullable: true })
  @Field(() => Int)
  orderId: number;

  // tracking
  @Field(() => Tracking, { nullable: true })
  @ManyToOne(() => Tracking, (tracking) => tracking.cartItems, {
    cascade: true,
  })
  tracking: Tracking;

  @Column({ nullable: true })
  trackingId: number;

  @Field(() => CartItemNoti)
  @OneToMany(() => CartItemNoti, (cartItemNoti) => cartItemNoti.cartItem, {
    cascade: true,
  })
  cartItemNotis: CartItemNoti[];

  @Field()
  @Column({ default: false })
  isReviewed: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default CartItem;
