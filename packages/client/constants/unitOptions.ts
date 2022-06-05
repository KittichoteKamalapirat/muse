// const unitOptions = [
//   // weight
//   { value: "gram", label: "g" },
//   { value: "kilogram", label: "kg" },

import { UnitEnum, UnitSelectOption } from "../src/types/utils/UnitEnum";

const unitOptions = (ingredientName: string) => [
  {
    label: "Weight",
    options: [
      {
        label: UnitSelectOption.gram.label,
        value: UnitSelectOption.gram.value,
      },
      { label: UnitEnum.KILOGRAM, value: "KILOGRAM" },
    ],
  },
  {
    label: "Volume",
    options: [
      {
        label: UnitSelectOption.milliliter.label,
        value: UnitSelectOption.milliliter.value,
      },
      {
        label: UnitSelectOption.liter.label,
        value: UnitSelectOption.liter.value,
      },
      {
        label: UnitSelectOption.pinch.label,
        value: UnitSelectOption.pinch.value,
      },

      {
        label: UnitSelectOption.teaspoon.label,
        value: UnitSelectOption.teaspoon.value,
      },
      {
        label: UnitSelectOption.tablespoon.label,
        value: UnitSelectOption.tablespoon.value,
      },
      { label: UnitSelectOption.cup.label, value: UnitSelectOption.cup.value },
    ],
  },
  {
    label: "Others",
    options: [
      {
        label: UnitSelectOption.piece.label,
        value: UnitSelectOption.piece.value,
      },
      {
        label: UnitSelectOption.eyeball.label,
        value: UnitSelectOption.eyeball.value,
      },
      { label: ingredientName + "s", value: ingredientName },
    ],
  },
];

export default unitOptions;
