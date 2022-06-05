/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

export enum UnitEnum {
  GRAM = "gram",
  KILOGRAM = "kilogram",

  MILLILITER = "milliliter",
  LITER = "liter",
  PINCH = "pinch",
  TABLESPOON = "tablespoon",
  TEASPOON = "teaspoon",
  CUP = "cup",

  PIECE = "piece",
  EYEBALL = "eyeball",
}

@ObjectType()
class Ingredient {
  // @PrimaryGeneratedColumn()
  // @Field()
  // id!: number;

  @Column()
  @Field()
  ingredient!: string;

  @Column()
  @Field()
  amount!: number;

  @Column({
    type: "enum",
    enum: UnitEnum,
  })
  @Field()
  unit!: UnitEnum;
}

export default Ingredient;
