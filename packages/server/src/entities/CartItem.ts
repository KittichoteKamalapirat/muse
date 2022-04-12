import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItemNoti, Mealkit, Order, Tracking, User } from ".";

export enum CartItemStatus {
  UnOrdered = "UnOrdered", // user: to pay, creator: payment pending. User has made an order.
  PaymentPending = "PaymentPending", // user: to pay, creator: payment pending. User has made an order.
  ToDeliver = "ToDeliver", // user: to be delivered, creator: to deliver. User paid and waiting for the creator to deliver
  OnDelivery = "OnDelivery", // user and creator: the products are being delivered. waiting for the courrier to deliver
  Delivered = "Delivered", // user and creator: complete.
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
  @ManyToOne(() => User, (user) => user.cartItems)
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
  @ManyToOne(() => Mealkit, (mealkit) => mealkit.cartItems)
  mealkit: Mealkit;

  // @Field(() => Order, { nullable: true })
  @ManyToOne(() => Order, (order) => order.cartItems)
  order: Order;

  // Order can have many cartItems
  @Column({ nullable: true })
  @Field(() => Int)
  orderId: number;

  // tracking
  @Field(() => Tracking, { nullable: true })
  @ManyToOne(() => Tracking, (tracking) => tracking.cartItems)
  tracking: Tracking;

  @Column({ nullable: true })
  trackingId: number;

  @Field(() => CartItemNoti)
  @OneToOne(() => CartItemNoti, (cartItemNoti) => cartItemNoti.cartItem)
  cartItemNoti: CartItemNoti;

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
