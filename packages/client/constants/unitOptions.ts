import { UnitSelectOption } from "./unitSelectOption";

const unitOptions = (ingredientName: string) => [
  {
    label: "Weight",
    options: [
      {
        label: UnitSelectOption.gram.label,
        value: UnitSelectOption.gram.value,
      },
      {
        label: UnitSelectOption.kilogram.label,
        value: UnitSelectOption.kilogram.value,
      },
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
