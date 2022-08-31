import { Field, InputType } from "type-graphql";

@InputType()
export class BoxInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  startTime: Date;

  @Field({ nullable: true })
  endTime: Date;
}

export default BoxInput;
