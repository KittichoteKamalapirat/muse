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
import { User, Address, JoinBox, SongRequest } from ".";

export enum BoxTypeEnum {
  DANCE_CLUB = "danceClub",
  BAR = "bar",
  RESTAURANT = "restaurant",
  WEDDING = "wedding",
  MUSIC_EVENT = "musicEvent",
  OTHER = "other",
}

@ObjectType()
@Entity()
class Box extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: BoxTypeEnum;

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
  @Column({ nullable: true }) // todo make this not nullable
  @Field()
  addressId: string;

  @Field(() => Address, { nullable: true }) // TODO make not nullable
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

  // one box can have many joinBoxes
  @OneToMany(() => JoinBox, (joinBox) => joinBox.box, { cascade: true })
  joinBoxes: JoinBox[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Box;
