import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./";

@ObjectType()
@Entity()
class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  amount: number;

  @Column()
  @Field()
  qrUrl: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  slipUrl: string;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default Payment;
