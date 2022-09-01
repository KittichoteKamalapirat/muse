import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from ".";
import Address from "./Address";
import SongRequest from "./SongRequest";

@ObjectType()
@Entity()
class Box extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @Column()
  @Field()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.boxes, {
    onDelete: "CASCADE",
  })
  creator: User;

  // Many boxes can belong to one location
  @Column()
  @Field()
  addressId: string;

  @Field(() => Address)
  @ManyToOne(() => Address, (address) => address.boxes, {
    onDelete: "CASCADE",
  })
  address: Address;

  // one box can have many song requests
  @Field(() => [SongRequest])
  @OneToMany(() => SongRequest, (songRequest) => songRequest.box, {
    cascade: true,
  })
  songRequests: SongRequest[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  startTime: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  endTime: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Box;
