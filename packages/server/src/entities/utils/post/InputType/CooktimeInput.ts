import { Field, InputType } from "type-graphql";
import { Column } from "typeorm";

@InputType()
class CooktimeInput {
  @Column()
  @Field()
  length: number;

  @Column()
  @Field()
  unit: string;
}

export default CooktimeInput;
