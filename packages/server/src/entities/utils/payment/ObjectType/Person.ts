import { ObjectType, Field } from "type-graphql";
import { TypeAndValue } from "../..";

@ObjectType()
class Person {
  @Field()
  displayName: string;

  @Field()
  name: string;

  @Field(() => TypeAndValue)
  proxy: TypeAndValue;

  @Field(() => TypeAndValue)
  account: TypeAndValue;
}

export default Person;
