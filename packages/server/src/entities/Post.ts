import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Mealkit, Upvote, User, Ingredient, Video, Image } from ".";

@ObjectType()
@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ nullable: true })
  @Field()
  title!: string;

  @Column({ nullable: true })
  @Field()
  text!: string;

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  instruction: string[];

  @Column("text", { nullable: true, array: true })
  @Field(() => [String], { nullable: true })
  advice: string[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  cooktime!: string;

  @Column({ type: "int", nullable: true })
  @Field(() => Int, { nullable: true })
  portion!: number;

  @Column({ type: "int", default: 0 })
  @Field()
  points!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; // willl be 1 or -1, this is used to check the status of this post for a user

  @Column({ nullable: true })
  @Field()
  thumbnailUrl!: string;

  @Column()
  @Field()
  videoUrl!: string;

  @Column()
  @Field()
  // @Field()
  creatorId: string;

  @Field(() => User) // need to have explicit type
  @ManyToOne(() => User, (user) => user.posts)
  // user.posts have to be added in the User type
  creator: User;
  // └the foreign Id will be creatorId
  // Many to one will create a foreign key, but we sitll ne to create the colum by ourself

  // @Field(type => User) -> return User type?
  // Why use function syntax and not a simple { type: User } config object?
  // Because, by using function syntax we solve the problem of circular dependencies (e.g. Post <--> User), so it was adopted as a convention.
  // You can use the shorthand syntax @Field(() => Rate) if you want to save some keystrokes but it might be less readable for others.

  @OneToMany(() => Upvote, (upvote) => upvote.post)
  upvotes: Upvote[];

  @Field(() => [Ingredient], { nullable: true })
  @Column("jsonb", { nullable: true })
  ingredients: Ingredient[];
  // @Column({type: 'jsonb', array: true, nullable: true})
  // testJson: object[];

  @Field(() => [Mealkit], { nullable: true })
  @OneToMany(() => Mealkit, (mealkit) => mealkit.post, {
    cascade: true,
  })
  mealkits: Mealkit[];

  @Field(() => Video)
  @OneToOne(() => Video, (video) => video.post, {
    cascade: true,
  })
  video: Video;

  @Field(() => Image)
  @OneToOne(() => Image, (image) => image.post, {
    cascade: true,
  })
  image: Image;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Post;
