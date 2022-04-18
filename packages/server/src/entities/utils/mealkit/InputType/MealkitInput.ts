import { InputType, Field } from "type-graphql";

@InputType()
class MealkitInput {
  @Field()
  name: string;

  @Field(() => [String])
  items: string[];

  @Field(() => [String])
  images: string[];

  @Field()
  price: number;

  @Field()
  portion: number;
}

export default MealkitInput;
