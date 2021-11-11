import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { Payment } from "./Payment";
import { User } from "./User";

export enum OrderStatus {
  PaymentPending = "PaymentPending", // user: to pay, creator: payment pending. User has made an order.
  ToDeliver = "ToDeliver", // user: to be delivered, creator: to deliver. User paid and waiting for the creator to deliver
  OnDelivery = "OnDelivery", // user and creator: the products are being delivered. waiting for the courrier to deliver
  Complete = "Complete", // user and creator: complete.
  Cancelled = "Cancelled", //user and creator: cancelled. A user cancelled an order- > has to asked for permission before TO_DELIVER
  Refunded = "Refunded", //user: waiting for refund, creator: to refund
}

// registerEnumType(OrderStatus, {
//   name: "OrderStatus", // this one is mandatory
// });

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column() //type: int?
  @Field()
  grossOrder: number;

  @Column({ default: OrderStatus.PaymentPending })
  @Field()
  status: OrderStatus;

  //One order can have many cartitems
  @Field(() => [CartItem])
  @OneToMany((type) => CartItem, (cartItem) => cartItem.order)
  cartItems: CartItem[];

  //Many order belongs to one userId
  @Column({ nullable: true }) //type: int?
  @Field()
  userId: string;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;

  // One order has one payment
  @Field(() => Payment, { nullable: true })
  @OneToOne((type) => Payment, (payment) => payment.order) //create paymentId
  @JoinColumn()
  payment: Payment;

  @Column({ nullable: true }) //type: int?
  @Field()
  paymentId: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
