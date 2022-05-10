import { define } from "typeorm-seeding";
import Faker from "faker";
import { User } from "../entities";

define(User, (faker: typeof Faker) => {
  const username = faker.name.findName();
  const user = new User();
  user.username = username;
  user.email = faker.internet.email();
  user.phonenumber = faker.phone.phoneNumber();
  user.isCreator = true;
  user.avatar = faker.image.avatar();
  user.password = faker.internet.password();

  return user;
});
