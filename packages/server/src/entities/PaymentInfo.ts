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
import { User } from ".";

@ObjectType()
@Entity()
class PaymentInfo extends BaseEntity {
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
  @OneToOne(() => User, (user) => user.paymentInfo, { onDelete: "CASCADE" })
  user: User;

  @Field(() => String)
  @Column()
  userId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default PaymentInfo;
