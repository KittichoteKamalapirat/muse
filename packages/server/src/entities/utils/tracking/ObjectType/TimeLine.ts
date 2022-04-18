import { ObjectType, Field } from "type-graphql";
import { TimelineDetail } from "../..";

@ObjectType()
class Timeline {
  @Field()
  date: string;

  @Field(() => [TimelineDetail])
  details: TimelineDetail[];
}

export default Timeline;
