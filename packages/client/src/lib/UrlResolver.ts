import { CartItemStatus } from "../generated/graphql";

class UrlResolver {
  index() {
    return "/";
  }
  orderTab(tab: CartItemStatus) {
    return `/order?status=${tab}`;
  }

  // API
  graphql() {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`;
  }

  paymentStatusAPI(paymentId: string) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/status/${paymentId}`;
  }

  signS3() {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/s3/sign-and-save`;
  }
}

export const urlResolver = new UrlResolver();
