import { ObjectType, Field } from "type-graphql";
import TimelineDetail from "./TimelineDetail";

@ObjectType()
class TimeLine {
  @Field()
  date: string;

  @Field(() => [TimelineDetail])
  details: TimelineDetail[];
}

export default TimeLine;
