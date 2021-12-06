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
import { Tracking } from "./Tracking";
import { User } from "./User";

@ObjectType()
class CartItemsByCreator {
  @Field()
  creatorId: string;

  @Field()
  deliveryFee: number;

  @Field()
  mealkitsFee: number;
}

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column() //type: int?
  @Field()
  grossOrder: number;

  @Column("jsonb", { nullable: true })
  @Field(() => [CartItemsByCreator], { nullable: true })
  cartItemsByCreator: CartItemsByCreator[];

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
