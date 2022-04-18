import { InputType, Field } from "type-graphql";

@InputType()
class PaymentInfoInput {
  @Field()
  bankAccount: string;

  @Field()
  bankCode: string;
}

export default PaymentInfoInput;
