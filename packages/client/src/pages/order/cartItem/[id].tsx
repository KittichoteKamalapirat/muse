import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import LinkButton from "../../../components/atoms/LinkButton";
import { AddressComponent } from "../../../components/Icons/AddressComponent";
import CartItemDetail from "../../../components/Icons/CartItemDetail";
import { TrackingDetail } from "../../../components/Icons/TrackingDetail";
import { HeadingLayout } from "../../../components/Layout/HeadingLayout";
import { MainNav } from "../../../components/MainNav";
import { Error } from "../../../components/skeletons/Error";
import { Loading } from "../../../components/skeletons/Loading";
import { ContentWrapper } from "../../../components/Wrapper/ContentWrapper";
import { XWrapper } from "../../../components/Wrapper/XWrapper";
import {
  CartItem,
  CartItemStatus,
  useCartItemQuery,
  useReceivedCartItemMutation,
} from "../../../generated/graphql";
import { elabUserCartItemStatus } from "../../../util/elabCartItemStatus";
import { withApollo } from "../../../util/withApollo";

const UserCartItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useCartItemQuery({
    variables: { id: parseInt(id as string) },
  });
  const [receivedCartItem] = useReceivedCartItemMutation();

  const tracking = data?.cartItem.tracking;
  const address = data?.cartItem.user?.address;
  console.log(elabUserCartItemStatus(data?.cartItem.status as CartItemStatus));
  if (loading) return <Loading />;
  if (error) return <Error text={error.message} />;
  return (
    <HeadingLayout heading="Order Summary">
      <MainNav />
      <XWrapper>
        <ContentWrapper>
          <Box>
            <Heading size="sm" as="h3">
              Current Status
            </Heading>
            <Text color="brand" fontWeight="bold">
              {elabUserCartItemStatus(data?.cartItem.status as CartItemStatus)}
            </Text>
            {tracking && <TrackingDetail tracking={tracking} />}
          </Box>

          <Divider variant="solid" my={2} />

          <Box>
            <Heading size="sm" as="h3">
              Address
            </Heading>
            <AddressComponent address={address!} />
          </Box>

          <Divider variant="solid" my={2} />

          <Box>
            <Heading size="sm" as="h3">
              Product
            </Heading>
            <CartItemDetail cartItem={data?.cartItem as CartItem} />
          </Box>

          {/* dynamic  part */}
          {data?.cartItem.status === CartItemStatus.PaymentPending && (
            <LinkButton href={`/payment/${data.cartItem.order.paymentId}`}>
              Make a payment
            </LinkButton>
          )}
          {data?.cartItem.status === CartItemStatus.Delivered && (
            <LinkButton
              onClick={async () => {
                const result = await receivedCartItem({
                  variables: { id: data.cartItem.id },
                  update: (cache) =>
                    cache.evict({ fieldName: "userOrders:{}" }),
                });

                if (result.data?.receivedCartItem) {
                  router.push("/order?status=Received");
                }
              }}
            >
              Received an item
            </LinkButton>
          )}

          {data?.cartItem.status === CartItemStatus.Complete && (
            <LinkButton
              href={{
                pathname: "/review/create",
                query: {
                  cartItemId: data.cartItem.id,
                  mealkitId: data.cartItem.mealkitId,
                },
              }}
            >
              Leave a Review
            </LinkButton>
          )}
        </ContentWrapper>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(UserCartItemDetail);
