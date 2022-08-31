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
import SongRequest from "./SongRequest";

@ObjectType()
@Entity()
class Song extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  albumName: string;

  @Column()
  @Field()
  albumImage: string;

  @Column()
  @Field()
  artistName: string;

  // One song can have many song requests
  @Field(() => [SongRequest])
  @OneToMany(() => SongRequest, (songRequest) => songRequest.song, {
    cascade: true,
  })
  songRequests: SongRequest[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default Song;
