import { define } from "typeorm-seeding";
import Faker from "faker";
import { Ingredient } from "../entities";

define(Ingredient, (faker: typeof Faker) => {
  const ingredient = new Ingredient();
  ingredient.ingredient = faker.commerce.productName();
  ingredient.amount = Math.floor(Math.random() * 30).toString();
  ingredient.unit = faker.commerce.productName();

  return ingredient;
});
