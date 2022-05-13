import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
class Ingredient {
  // @PrimaryGeneratedColumn()
  // @Field()
  // id!: number;

  @Column()
  @Field()
  ingredient!: string;

  @Column()
  @Field()
  amount!: string;

  @Column()
  @Field()
  unit!: string;

  // @Field()
  // @Column()
  // postId: number;

  // @Field(() => String)
  // @CreateDateColumn()
  // createdAt: Date;

  // @Field(() => String)
  // @UpdateDateColumn()
  // updatedAt: Date;
}

export default Ingredient;
