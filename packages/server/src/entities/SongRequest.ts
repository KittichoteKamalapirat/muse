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

@ObjectType()
@Entity()
class SongRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ type: "int", default: 1 })
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
