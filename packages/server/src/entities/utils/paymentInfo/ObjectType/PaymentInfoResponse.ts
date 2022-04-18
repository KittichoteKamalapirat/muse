import { ObjectType, Field } from "type-graphql";
import { FieldError } from "../../../../utils/FieldError";
import PaymentInfo from "../../../PaymentInfo";

@ObjectType()
class PaymentInfoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => PaymentInfo, { nullable: true })
  paymentInfo?: PaymentInfo;
}

export default PaymentInfoResponse;
