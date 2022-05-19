import { CartItemStatus } from "../generated/graphql";

export const elabUserCartItemStatus = (status: CartItemStatus) => {
  switch (status) {
    case CartItemStatus.UnOrdered:
      return "You have not placed an order yet";
    case CartItemStatus.PaymentPending:
      return "You have not completed the payment";
    case CartItemStatus.ToDeliver:
      return "The seller is preparing the order";
    case CartItemStatus.OnTheWay:
      return "The product is on its way";
    case CartItemStatus.Delivered:
      return "The product is successfully delivered. Please confirm.";
    case CartItemStatus.Received:
      return "You have received the meal kits.";
    case CartItemStatus.Complete:
      return "You have reviewed this product";
    case CartItemStatus.Cancelled:
      return "The order is cancelled and the refund is being processed.";
    case CartItemStatus.Refunded:
      return "You have been refunded.";
  }
};

export const elabCreatorCartItemStatus = (status: CartItemStatus) => {
  switch (status) {
    case CartItemStatus.UnOrdered:
      return "The customer has not placed this order yet";
    case CartItemStatus.PaymentPending:
      return "Waiting for the customer to complete the payment";
    case CartItemStatus.ToDeliver:
      return "Please deliver the product to customer";
    case CartItemStatus.OnTheWay:
      return "The courier is delivering the product to customer";
    case CartItemStatus.Delivered:
      return "The product is delivered. Waiting for the customer to confirm.";
    case CartItemStatus.Received:
      return "The customer has received the product.";
    case CartItemStatus.Complete:
      return "The customer has reviewed the product";
    case CartItemStatus.Cancelled:
      return "The order is cancelled and the refund is being processed.";
    case CartItemStatus.Refunded:
      return "The customer has received the refund.";
  }
};
