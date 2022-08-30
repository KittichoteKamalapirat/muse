import { define } from "typeorm-seeding";
import Faker from "faker";
import { User } from "../../entities";

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.username = faker.name.findName();
  user.email = faker.internet.email();
  user.phoneNumber = faker.phone.phoneNumber();
  user.isCreator = true;
  user.avatar = faker.image.avatar();
  user.password = faker.internet.password();

  return user;
});
