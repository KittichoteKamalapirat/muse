import { InputType, Field } from "type-graphql";
import { IngredientInput } from "../..";
import CooktimeInput from "./CooktimeInput";

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  text: string;

  @Field(() => [String], { nullable: true })
  instruction: string[];

  @Field(() => CooktimeInput, { nullable: true })
  cooktime: CooktimeInput;

  @Field({ nullable: true })
  portion: number;

  @Field(() => [String], { nullable: true })
  advice: string[];

  @Field(() => [IngredientInput])
  ingredients: IngredientInput[];
}

export default PostInput;
