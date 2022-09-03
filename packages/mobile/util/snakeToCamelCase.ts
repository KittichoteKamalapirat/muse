// function that converts snake_case to camelCase
const snakeToCamelCase = (str: string): string => {
  return str.replace(/(_\w)/g, (m) => m[1].toUpperCase());
};

export default snakeToCamelCase;
