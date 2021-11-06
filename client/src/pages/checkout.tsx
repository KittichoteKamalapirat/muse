import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../components/HeadingLayout";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import {
  useAddressQuery,
  useCartItemsQuery,
  useCreateOrderMutation,
  useCreateScbQrQuery,
  useMeQuery,
  useUpdateCartItemMutation,
} from "../generated/graphql";
import { createWithApollo } from "../util/createWithApollo";
import { withApollo } from "../util/withApollo";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Table, Tr, Th } from "@chakra-ui/react";

import axios from "axios";
import { useField } from "formik";

interface checkoutProps {}

const Checkout: React.FC<checkoutProps> = ({}) => {
  // useupdate
  const { data: cartItems, loading, error } = useCartItemsQuery();
  const { data: address, loading: addressLoading } = useAddressQuery();
  // const { data: me, loading: meLoading } = useMeQuery();
  const [createOrder, { data: orderData, loading: orderLoading }] =
    useCreateOrderMutation();

  const noAddress = (
    <Flex justifyContent="center" alignItems="center" minH="600px">
      <Flex direction="column" alignItems="center">
        <Text m={5}>You have not added your address yet</Text>
        <NextLink href="/account/address/create" as="/account/address/create">
          <Button colorScheme="teal" leftIcon={<AddIcon />}>
            Add address
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );

  const [gross, setGross] = useState(0);

  //run everytime when re-render
  useEffect(() => {
    if (cartItems) {
      let gross: number = 0;
      // let counter: number = 0;
      cartItems?.cartItems.map((cartItem) => {
        console.log(cartItem.total);
        gross = gross + cartItem.total;

        // counter = counter + 1;
      });
      // if (counter === cartItems.cartItems.length) {
      setGross(gross);
      // }
    }
  }, []);

  if (!loading && !cartItems) {
    return (
      <div>
        <div>query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <HeadingLayout heading="Checkout">
      <Wrapper mb={20}>
        {!address ? (
          <Wrapper>{noAddress}</Wrapper>
        ) : (
          <Wrapper>
            <Box>
              <Heading size="sm" flex={1}>
                ที่อยู่สำหรับจัดส่ง
              </Heading>
              <Box>
                {/* <Text>{meLoading ? null : me?.me?.username}</Text> */}
                <Text flex={3}>add name to address</Text>
                <Text flex={3}>add phone number to address</Text>
              </Box>
              <Text d="inline">{address?.address.line1}</Text>
              <Text d="inline">{address?.address.line2}, </Text>
              <Text d="inline">{address?.address.subdistrict} </Text>
              <Text>{address?.address.district} </Text>
              <Text d="inline">{address?.address.province}</Text>
              {/* <Text d="inline">{address?.address.country}</Text>{" "} */}
              <Text d="inline">{address?.address.postcode}</Text>
            </Box>
          </Wrapper>
        )}

        {/* <Heading>Checkout</Heading> */}

        {!cartItems ? (
          <Text>You don't have any items yet</Text>
        ) : (
          <Box>
            {cartItems.cartItems.map((item) => (
              <Flex textAlign="center">
                <Box flex={1} m={1}>
                  {!item.mealkit?.images ? null : (
                    <Image
                      src={item.mealkit?.images[0]}
                      alt="image"
                      fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                    />
                  )}
                </Box>

                <Box flex={3} m={1} textAlign="left">
                  <Heading size="md">{item.mealkit?.name}</Heading>

                  <Box flex={1} m={1}>
                    <Text>฿{item.mealkit?.price}</Text>
                  </Box>

                  <Text color="gray.700" fontSize="md" fontWeight="normal">
                    quantity: {item.quantity}
                  </Text>

                  <Heading size="lg">Add Delivery fee and update total</Heading>

                  <Box flex={1} m={1}>
                    <Text>Total: {item.total}</Text>
                  </Box>
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Wrapper>

      <Flex
        zIndex={1}
        position="fixed"
        bottom={0}
        bg={["white", "red"]}
        ml={"auto"}
        align="center"
        width="100%"
        justifyContent="end"
      >
        <Box m={2}>
          <Text>Total: ฿{gross}</Text>
        </Box>
        <Box p={3} bgColor="red.400" color="white">
          <Box
            onClick={async () => {
              const cartItemIds: number[] = [];
              cartItems?.cartItems.forEach((cartItem) => {
                cartItemIds.push(cartItem.id);
              });
              await createOrder({
                variables: {
                  cartItemIds: cartItemIds,
                  grossOrder: gross,
                },
              });
              if (!orderLoading && orderData?.createOrder.id) {
                router.push(`/payment/${orderData?.createOrder.id}`);
              }
            }}
          >
            Make a payment
          </Box>
          {/* <NextLink href={{ pathname: "/payment" }}>
            <Link>Make a payment</Link>
          </NextLink> */}

          {/* <Button
            onClick={() => {
              createScbQr(gross);
            }}
          >
            Make a payment
          </Button> */}
        </Box>
      </Flex>

      {/* {!qrLoading ? null : <Image src={qrData?.createScbQr.data.qrImage} />} */}
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Checkout);
