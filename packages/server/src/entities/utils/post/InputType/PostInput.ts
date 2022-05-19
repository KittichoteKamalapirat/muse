import { InputType, Field } from "type-graphql";
import { IngredientInput } from "../..";

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  text: string;

  @Field(() => [String], { nullable: true })
  instruction: string[];

  @Field({ nullable: true })
  cooktime: string;

  @Field({ nullable: true })
  portion: number;

  @Field(() => [String], { nullable: true })
  advice: string[];

  @Field(() => [IngredientInput])
  ingredients: IngredientInput[];
}

export default PostInput;
