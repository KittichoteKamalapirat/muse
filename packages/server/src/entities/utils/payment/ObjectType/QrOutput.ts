import { ObjectType, Field } from "type-graphql";
import QrData from "./QrData";
import Status from "./Status";

@ObjectType()
class QrOutput {
  @Field(() => Status)
  status: Status;

  @Field(() => QrData)
  data: QrData;
}

export default QrOutput;
