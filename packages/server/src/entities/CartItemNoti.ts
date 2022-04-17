import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "./";

@Entity()
@ObjectType()
class CartItemNoti extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  // @Column()
  // @Field((type) => String)
  // message(): string {
  //   return `You received an order for ${this.cartItem.quantity} ${this.cartItem.mealkit.name} from ${this.cartItem.user.username}.`;
  // }

  @Field()
  @Column({ default: false })
  read: boolean;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  userId: string; // could be for seller or buyer, so userId instead of  creatorId is preferred

  @Field()
  @Column()
  cartItemId: number;

  @Field(() => CartItem)
  @ManyToOne(() => CartItem, (cartItem) => cartItem.cartItemNotis)
  cartItem: CartItem;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default CartItemNoti;
