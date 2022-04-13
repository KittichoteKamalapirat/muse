import { ObjectType, Field } from "type-graphql";
import { QrData, Status } from "../..";

@ObjectType()
class Account {
  @Field(() => Status)
  status: Status;

  @Field(() => QrData)
  data: QrData;
}

export default Account;
