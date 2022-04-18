import { InputType, Field } from "type-graphql";

@InputType()
class AddressInput {
  @Field()
  name: string;

  @Field()
  phonenumber: string;

  @Field()
  line1: string;

  @Field()
  line2: string;

  @Field()
  subdistrict: string;

  @Field()
  district: string;

  @Field()
  province: string;

  @Field()
  country: string;

  @Field()
  postcode: string;
}

export default AddressInput;
