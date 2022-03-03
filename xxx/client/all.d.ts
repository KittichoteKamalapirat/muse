declare module "next-apollo";
declare module "promptpay-qr";
declare module "node-fetch";

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
