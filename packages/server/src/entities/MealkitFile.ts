import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Mealkit from "./Mealkit";

@ObjectType()
@Entity()
class MealkitFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  fileType: string;

  @Column()
  @Field()
  url: string;

  // for some reasons, no need to specify nullable for column
  // this can be null because video can be created before post
  @Column({ nullable: true })
  @Field({ nullable: true })
  mealkitId: number;

  @Field(() => Mealkit)
  @ManyToOne(() => Mealkit, (mealkit) => mealkit.mealkitFiles, {
    nullable: true, // TODO is it nullable?
    onDelete: "CASCADE",
  })
  mealkit: Mealkit;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

export default MealkitFile;
