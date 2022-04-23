import { InputType, Field } from "type-graphql";
import { IngredientInput } from "../..";

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field(() => [String])
  instruction: string[];

  @Field()
  cooktime: string;

  @Field()
  portion: number;

  @Field(() => [String])
  advice: string[];

  @Field(() => [IngredientInput])
  ingredients: IngredientInput[];
}

export default PostInput;
