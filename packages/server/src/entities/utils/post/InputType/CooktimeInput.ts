import { Field, InputType } from "type-graphql";

@InputType()
class CooktimeInput {
  @Field()
  length: number;

  @Field()
  unit: string;
}

export default CooktimeInput;
