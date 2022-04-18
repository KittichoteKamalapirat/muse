import { ObjectType, Field } from "type-graphql";
import { FieldError } from "../../../../utils/FieldError";
import User from "../../../User";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export default UserResponse;
