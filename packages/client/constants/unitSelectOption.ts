//value = "label"

import { UnitEnum } from "../src/types/utils/UnitEnum";

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
