import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from ".";

@ObjectType()
@Entity()
class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  phonenumber!: string;

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
  @OneToOne(() => User, (user) => user.address, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
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

export default Address;
