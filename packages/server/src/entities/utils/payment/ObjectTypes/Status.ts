import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Status {
  @Field()
  code: number;

  @Field()
  description: string;
}
export default Status;
