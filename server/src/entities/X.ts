import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Y } from "./Y";

@ObjectType()
@Entity()
export class X extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ nullable: true })
  @Field()
  yId: number;

  @Field(() => Y, { nullable: true }) //-> cannot query Y uf this is not added
  @OneToOne((type) => Y)
  @JoinColumn()
  y: Y; //
}
