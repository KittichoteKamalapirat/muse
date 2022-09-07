import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Box from "./Box";

@ObjectType()
@Entity()
class Address extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column() // TODO make unique?
  @Field()
  name!: string;

  // One location can have many boxes
  @Field(() => [Box])
  @OneToMany(() => Box, (box) => box.address, {
    cascade: true,
  })
  boxes: Box[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default Address;
