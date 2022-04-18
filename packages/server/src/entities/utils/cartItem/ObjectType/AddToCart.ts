import { ObjectType, Field } from "type-graphql";
import CartItem from "../../../CartItem";

@ObjectType()
class AddToCart {
  @Field(() => CartItem)
  cartItem: CartItem;

  @Field()
  newItem: boolean;
}

export default AddToCart;
