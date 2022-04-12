import { ObjectType, Field } from "type-graphql";
import { Status, ConfirmData } from "../..";

@ObjectType()
class ConfirmationResponse {
  @Field(() => Status)
  status: Status;

  @Field(() => ConfirmData)
  data: ConfirmData;
}

export default ConfirmationResponse;
