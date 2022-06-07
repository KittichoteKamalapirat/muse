import { Field, InputType } from "type-graphql";
import { UnitEnum } from "../../../Ingredient";

@InputType()
class IngredientInput {
  @Field()
  ingredient: string;

  @Field()
  amount: number;

  @Field()
  unit: UnitEnum; // TODO this cause error in cypress somehow
}

export default IngredientInput;
