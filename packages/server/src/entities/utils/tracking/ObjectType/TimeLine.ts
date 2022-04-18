import { ObjectType, Field } from "type-graphql";
import { TimelineDetail } from "../..";

@ObjectType()
class TimeLine {
  @Field()
  date: string;

  @Field(() => [TimelineDetail])
  details: TimelineDetail[];
}

export default TimeLine;
