import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { X } from "./X";

@ObjectType()
@Entity()
export class Y extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field(() => X, { nullable: true })
  @OneToOne((type) => X, (x) => x.y)
  x: X;
}
//
