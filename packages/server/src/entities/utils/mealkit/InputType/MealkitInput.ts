import { InputType, Field } from "type-graphql";

@InputType()
class MealkitInput {
  @Field()
  name: string;

  @Field(() => [String])
  items: string[];

  @Field()
  price: number;

  @Field()
  portion: number;

  @Field()
  deliveryFee: number;
}

export default MealkitInput;
