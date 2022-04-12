import { ObjectType, Field } from "type-graphql";

@ObjectType()
class TypeAndValue {
  @Field()
  type: string;

  @Field()
  value: string;
}

export default TypeAndValue;
