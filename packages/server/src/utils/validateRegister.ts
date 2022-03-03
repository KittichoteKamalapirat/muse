import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (data: UsernamePasswordInput) => {
  if (!data.email.includes("@")) {
    return [
      {
        field: "email",
        message: " invalid email",
      },
    ];
  }

  if (data.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (data.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an @",
      },
    ];
  }

  if (data.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Length must be greater than 2",
      },
    ];
  }
  // if there is not errors, return null
  return null;
};
