import { InputType, Field } from "type-graphql";

@InputType()
class CartItemInput {
  @Field()
  mealkitId: number;

  @Field()
  quantity: number;
}
export default CartItemInput;
