import { ObjectType, Field } from "type-graphql";

@ObjectType()
class TimelineDetail {
  @Field()
  dateTime: string;

  @Field()
  date: string;

  @Field()
  time: string;

  @Field()
  status: string;

  @Field()
  description: string;
}

export default TimelineDetail;
