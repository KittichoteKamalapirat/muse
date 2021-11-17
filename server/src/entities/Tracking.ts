import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Tracking extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  statusArray: string[];

  @Column("date", { nullable: true, array: true })
  @Field(() => [Date], { nullable: true })
  dateArray: Date[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
