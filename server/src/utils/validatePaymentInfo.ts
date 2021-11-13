import { PaymentInfoInput } from "../resolvers/paymentInfo";

export const validatePaymentInfo = (input: PaymentInfoInput) => {
  if (input.bankAccount.length <= 9) {
    return [
      {
        field: "bankAccount",
        message: "Length must be greater than 9",
      },
    ];
  }
  return null;
};
