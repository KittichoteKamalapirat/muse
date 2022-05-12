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
class Image extends BaseEntity {
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

  @Column({ nullable: true })
  @Field()
  fileType: string;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field(() => Int)
  postId: number;

  @Field(() => Post)
  @OneToOne(() => Post, (post) => post.image, { onDelete: "CASCADE" })
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
