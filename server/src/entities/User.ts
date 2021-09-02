import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  // will use this later
  //   @Column({ unique: true })
  //   @Field()
  //   phone_no!: string;

  @Column({ unique: true })
  @Field()
  username!: string;

  // , nullable: true
  @Column({ unique: true })
  @Field()
  email!: string;

  //   Client can't query for pass word it will and hashed
  @Column()
  password!: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
