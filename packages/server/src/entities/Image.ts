import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from ".";

@ObjectType()
@Entity()
class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Generated("uuid")
  @Field()
  uid: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field(() => String)
  postId: string;

  @Field(() => Post)
  @OneToOne(() => Post, (post) => post.image)
  @JoinColumn()
  post: Post;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default Image;
