import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LinkButton from "../../../../components/atoms/LinkButton";
import { AddressComponent } from "../../../../components/Icons/AddressComponent";
import CartItemDetail from "../../../../components/Icons/CartItemDetail";
import { TrackingDetail } from "../../../../components/Icons/TrackingDetail";
import { HeadingLayout } from "../../../../components/Layout/HeadingLayout";
import { MainNav } from "../../../../components/MainNav";
import { Error } from "../../../../components/skeletons/Error";
import { Loading } from "../../../../components/skeletons/Loading";
import { ContentWrapper } from "../../../../components/Wrapper/ContentWrapper";
import { XWrapper } from "../../../../components/Wrapper/XWrapper";
import {
  CartItem,
  CartItemStatus,
  useCartItemQuery,
} from "../../../../generated/graphql";
import {
  elabCreatorCartItemStatus,
  elabUserCartItemStatus,
} from "../../../../util/elabCartItemStatus";
import { withApollo } from "../../../../util/withApollo";

const OrderCartItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useCartItemQuery({
    variables: { id: parseInt(id as string) },
  });

  const tracking = data?.cartItem.tracking;
  const address = data?.cartItem.user?.address;
  console.log(elabUserCartItemStatus(data?.cartItem.status as CartItemStatus));
  if (loading) return <Loading />;
  if (error) return <Error />;
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
              {elabCreatorCartItemStatus(
                data?.cartItem.status as CartItemStatus
              )}
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
          {data?.cartItem.status === CartItemStatus.ToDeliver && (
            <LinkButton
              href={{
                pathname: "/myshop/order",
                query: { status: CartItemStatus.ToDeliver },
              }}
            >
              See list of all delivery
            </LinkButton>
          )}
        </ContentWrapper>
      </XWrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(OrderCartItemDetail);
