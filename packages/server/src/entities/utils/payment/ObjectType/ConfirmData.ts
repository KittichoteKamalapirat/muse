import { ObjectType, Field } from "type-graphql";
import Person from "./Person";

@ObjectType()
class ConfirmData {
  @Field()
  transRef: string;

  @Field()
  sendingBank: string;

  @Field()
  receivingBank: string;

  @Field()
  transDate: string;

  @Field()
  transTime: string;

  @Field(() => Person)
  sender: Person;

  @Field(() => Person)
  receiver: Person;

  @Field()
  amount: string;

  @Field()
  paidLocalAmount: string;

  @Field()
  paidLocalCurrency: string;

  @Field()
  countryCode: string;

  @Field()
  ref1: string;

  @Field()
  ref2: string;

  @Field()
  ref3: string;
}

export default ConfirmData;
