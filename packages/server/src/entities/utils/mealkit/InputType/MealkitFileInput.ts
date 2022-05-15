import { InputType, Field } from "type-graphql";

@InputType()
class MealkitFileInput {
  @Field()
  postId: number;

  @Field()
  fileType: string;
}

export default MealkitFileInput;
