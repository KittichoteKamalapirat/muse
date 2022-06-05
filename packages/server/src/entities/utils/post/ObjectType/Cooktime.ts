import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
class Cooktime {
  @Column()
  @Field()
  length: number;

  @Column()
  @Field()
  unit: string;
}

export default Cooktime;
