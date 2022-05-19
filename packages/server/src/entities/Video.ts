import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from ".";

@ObjectType()
@Entity()
class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  // @Column()
  // @Generated("uuid")
  // @Field()
  // uid: string;

  @Column()
  @Field()
  name: string;

  // TODO actually can't be null, remove this later but neware of error
  @Column({ nullable: true })
  @Field()
  fileType: string;

  @Column()
  @Field()
  url: string;

  // for some reasons, no need to specify nullable for column
  // this can be null because video can be created before post
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  postId: number;

  @Field(() => Post)
  @OneToOne(() => Post, (post) => post.video, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  post: Post;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default Video;
