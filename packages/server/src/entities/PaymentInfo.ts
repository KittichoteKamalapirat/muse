import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class PaymentInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field(() => String)
  bankAccount: string;

  @Column()
  @Field(() => String)
  bankCode: string;

  @Field(() => User)
  @OneToOne((type) => User, (user) => user.paymentInfo)
  user: User;

  @Field(() => String)
  @Column()
  userId: string;

  // relatioship with user ends

  // relatioship with address start

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
