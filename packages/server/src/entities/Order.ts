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
import { CartItem, Payment, User } from ".";
import { CartItemsByCreator } from "./utils";

@ObjectType()
@Entity()
class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column() // type: int?
  @Field()
  grossOrder: number;

  @Column("jsonb", { nullable: true })
  @Field(() => [CartItemsByCreator], { nullable: true })
  cartItemsByCreator: CartItemsByCreator[];

  // One order can have many cartitems
  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.order, {
    cascade: true,
  })
  cartItems: CartItem[];

  // Many order belongs to one userId
  @Column({ nullable: true }) // type: int?
  @Field()
  userId: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user: User;

  // One order has one payment
  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true }) // create paymentId
  @JoinColumn()
  payment: Payment;

  @Column({ nullable: true }) // type: int?
  @Field()
  paymentId: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default Order;
