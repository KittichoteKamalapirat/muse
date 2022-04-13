import { ObjectType, Field } from "type-graphql";

@ObjectType()
class QrData {
  @Field()
  qrRawData: string;

  @Field()
  qrImage: string;
}

export default QrData;
