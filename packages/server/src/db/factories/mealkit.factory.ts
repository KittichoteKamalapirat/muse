import { define } from "typeorm-seeding";
import Faker from "faker";
import { Mealkit } from "../../entities";

define(Mealkit, (faker: typeof Faker) => {
  const mealkit = new Mealkit();
  mealkit.name = faker.commerce.productName();
  mealkit.price = Math.floor(Math.random() * 200);
  mealkit.portion = Math.floor(Math.random() * 10);
  mealkit.items = [...Array(3)].map(() => faker.commerce.productName());

  // creator define in seed
  // post define in seed

  return mealkit;
});
