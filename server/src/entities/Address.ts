import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ nullable: true })
  @Field()
  line1: string;

  @Column({ nullable: true })
  @Field()
  line2: string;

  @Column({ nullable: true })
  @Field()
  subdistrict: string;

  @Column({ nullable: true })
  @Field()
  district: string;

  @Column({ nullable: true })
  @Field()
  province: string;

  @Column({ nullable: true })
  @Field()
  country: string;

  @Column({ nullable: true })
  @Field()
  postcode: string;

  // relatioship with user start

  // relationship with user
  @Column()
  @Field(() => String)
  // @Field()
  userId: string;

  @Field(() => User)
  @OneToOne((type) => User, (user) => user.address)
  user: User;

  // relatioship with user ends

  // relatioship with address start

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
