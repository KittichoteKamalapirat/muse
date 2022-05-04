import { FieldError } from "react-hook-form";

const getErrorMessage = (name: string, error: FieldError | undefined) => {
  const message = error?.message || "";
  if (message.length > 0) {
    return `${name} ${message}`;
  }

  return null;
};

export default getErrorMessage;
