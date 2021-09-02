import { FieldError } from "../generated/graphql";

// the error is something like [
//     {field: 'username', message: 'something wrong'},
//     {field: 'password', message: 'something wrong'},
// ]
//  which is any array
// We'll make it an object {
//     username: "too short,
//     password: 'too short"
// }

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
