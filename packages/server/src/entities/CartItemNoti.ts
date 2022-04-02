import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  creatorId: string;

  @Field()
  @Column()
  cartItemId: number;

  @Field(() => CartItem)
  @OneToOne((type) => CartItem, (cartItem) => cartItem.cartItemNoti)
  @JoinColumn()
  cartItem: CartItem;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default CartItemNoti;
