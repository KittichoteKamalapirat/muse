import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from ".";

@Entity()
@ObjectType()
class CartItemNoti extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ default: false })
  read: boolean;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  avatarHref: string; // could be url or path to icon

  @Field()
  @Column()
  detailUrl: string;

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
