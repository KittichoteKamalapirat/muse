//value = "label"

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

// usecase
// getSelectOption(UnitSelectOption["GRAM"].label, UnitSelectOption["GRAM"].value)
export const UnitSelectOption = {
  [UnitEnum.GRAM]: {
    label: "g",
    value: UnitEnum.GRAM,
  },
  [UnitEnum.KILOGRAM]: {
    label: "kg",
    value: UnitEnum.KILOGRAM,
  },
  [UnitEnum.MILLILITER]: {
    label: "ml",
    value: UnitEnum.MILLILITER,
  },
  [UnitEnum.LITER]: {
    label: "l",
    value: UnitEnum.LITER,
  },
  [UnitEnum.PINCH]: {
    label: "pinch",
    value: UnitEnum.PINCH,
  },
  [UnitEnum.TABLESPOON]: {
    label: "tbsp",
    value: UnitEnum.TABLESPOON,
  },
  [UnitEnum.TEASPOON]: {
    label: "tsp",
    value: UnitEnum.TEASPOON,
  },
  [UnitEnum.CUP]: {
    label: "cup",
    value: UnitEnum.CUP,
  },
  [UnitEnum.PIECE]: {
    label: "piece",
    value: UnitEnum.PIECE,
  },
  [UnitEnum.EYEBALL]: {
    label: "proper amount",
    value: UnitEnum.EYEBALL,
  },
};
