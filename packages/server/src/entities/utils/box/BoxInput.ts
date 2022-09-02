import { Field, InputType } from "type-graphql";
import { BoxTypeEnum } from "../../Box";

@InputType()
export class BoxInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  // TODO: remove this later
  @Field()
  addressName: string;

  @Field(() => BoxTypeEnum)
  type: BoxTypeEnum;

  @Field({ nullable: true })
  startTime: Date;

  @Field({ nullable: true })
  endTime: Date;
}

export default BoxInput;
