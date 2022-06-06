import { Field, InputType } from "type-graphql";

@InputType()
class IngredientInput {
  @Field()
  ingredient: string;

  @Field()
  amount: number;

  @Field()
  unit: string; // TODO actuall UnitEnum but cause error in either cypress or backend somehow
}

export default IngredientInput;
