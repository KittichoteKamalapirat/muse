import { FieldValues, UseFormSetError } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import snakeToCamelCase from "./snakeToCamelCase";

// GraphqlError Format
// {
//   "data": {
//     "login": {
//       "errors": [
//         {
//           "field": "usernameOrEmailOrPhoneNumber",
//           "message": "The username, email, or phone number does not exist"
//         }
//       ],
//       "user": null
//     }
//   }
// }

export interface UserErrorItem {
  field?: string | null | undefined;
  message: string;
}

function handleGraphqlErrors(
  // Disabled as the shape of "data" and "errors" will be dynamic
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any, // data in react hook form
  errors: any, // graphqlErrors
  /* eslint-enable @typescript-eslint/no-explicit-any */
  setError: UseFormSetError<FieldValues>,
  setGenericErrorMessage: Dispatch<SetStateAction<string>>
) {
  const resultUserErrors = (errors || []) as UserErrorItem[];

  let newGenericErrorMessage = "";

  resultUserErrors.map(({ field, message }) => {
    const camelKey = snakeToCamelCase(key as string);
    const errorKey: string | null = Object.keys(data).find(
      (formField) => camelKey === formField
    )
      ? (camelKey as string)
      : null;
    if (errorKey) {
      // Error is related to a specific field
      setError(errorKey, { message, type: "server" });
    } else {
      // Error is not related to a specific field and is generic
      newGenericErrorMessage += `${field} ${message}\n`;
    }
  });

  setGenericErrorMessage(newGenericErrorMessage);

  return resultUserErrors;
}

export default handleGraphqlErrors;
