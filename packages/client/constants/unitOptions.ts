// const unitOptions = [
//   // weight
//   { value: "gram", label: "g" },
//   { value: "kilogram", label: "kg" },

//   // volume
//   { value: "milliliter", label: "ml" },
//   { value: "liter", label: "l" },
//   { value: "pinch", label: "pinch" },
//   { value: "teaspoon", label: "tsp" },
//   { value: "tablespoon", label: "tbsp" },
//   { value: "cup", label: "cup" },

//   // by ingredient
//   { value: "piece", label: "piece" },

//   // others
//   { value: "eyeball", label: "proper amount" },
// ];

const unitOptions = (ingredientName: string) => [
  {
    label: "Weight",
    options: [
      { label: "g", value: "gram" },
      { label: "kg", value: "kilogram" },
    ],
  },
  {
    label: "Volume",
    options: [
      { label: "ml", value: "milliliter" },
      { label: "l", value: "liter" },
      { label: "pinch", value: "pinch" },
      { label: "tsp", value: "teaspoon" },
      { label: "tbsp", value: "tablespoon" },
      { label: "cup", value: "cup" },
    ],
  },
  {
    label: "Others",
    options: [
      { label: "piece", value: "piece" },
      { label: "proper amount", value: "eyeball" },
      { label: ingredientName + "s", value: ingredientName },
    ],
  },
];

export default unitOptions;
