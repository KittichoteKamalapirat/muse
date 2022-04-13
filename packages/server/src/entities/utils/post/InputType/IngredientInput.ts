import { InputType, Field } from "type-graphql";

@InputType()
class IngredientInput {
  @Field()
  ingredient: string;

  @Field()
  amount: string;

  @Field()
  unit: string;
}

export default IngredientInput;
