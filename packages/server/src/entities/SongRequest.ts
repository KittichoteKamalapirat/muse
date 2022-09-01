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
import Box from "./Box";
import Song from "./Song";
import Upvote from "./Upvote";
import User from "./User";

@ObjectType()
@Entity()
class SongRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ type: "int", default: 0 })
  @Field()
  counts: number;

  // Many song requests can belong to one song
  @Column()
  @Field()
  songId: string;

  @Field(() => Song)
  @ManyToOne(() => Song, (song) => song.songRequests, {
    onDelete: "CASCADE",
  })
  song: Song;

  // Many song requests can belong to one user
  @Column()
  @Field()
  requesterId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.songRequests, {
    onDelete: "CASCADE",
  })
  requester: User;

  // Many song requests can belong to one box
  @Column({ nullable: true })
  @Field()
  boxId: string;

  @Field(() => Box)
  @ManyToOne(() => Box, (box) => box.songRequests, {
    onDelete: "CASCADE",
  })
  box: Box;

  @OneToMany(() => Upvote, (upvote) => upvote.songRequest, { cascade: true })
  upvotes: Upvote[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default SongRequest;
