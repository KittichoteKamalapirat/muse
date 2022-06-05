import { InputType, Field } from "type-graphql";
import { UnitEnum } from "../../../Ingredient";

@InputType()
class IngredientInput {
  @Field()
  ingredient: string;

  @Field()
  amount: number;

  @Field()
  unit: UnitEnum;
}

export default IngredientInput;
