import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../components/HeadingLayout";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import {
  CartItem,
  useAddressQuery,
  useCartItemsQuery,
  useCreateOrderMutation,
  useMeQuery,
  useUpdateCartItemMutation,
} from "../generated/graphql";
import { createWithApollo } from "../util/createWithApollo";
import { withApollo } from "../util/withApollo";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import { Button, IconButton } from "@chakra-ui/button";
import {
  AddIcon,
  ChevronRightIcon,
  MinusIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import { Table, Tr, Th, Avatar, LinkBox, LinkOverlay } from "@chakra-ui/react";

import axios from "axios";
import { useField } from "formik";
import {
  mappedResult,
  toCartItemsByCreatorMap,
} from "../util/toCartItemsByCreatorMap";
import { EditCartItemAmountButton } from "../components/EditCartItemAmount";
import { primaryColor } from "../components/Variables";

interface checkoutProps {}

interface CartItemsByCreatorInput {
  creatorId: string;
  deliveryFee: number;
  mealkitsFee: number;
}

const Checkout: React.FC<checkoutProps> = ({}) => {
  // useupdate
  const { data: cartItems, loading, error } = useCartItemsQuery();
  const { data: address, loading: addressLoading } = useAddressQuery();

  const [mappedCartItems, setMappedCartItems] = useState<mappedResult[]>();

  const [cartItemsByCreatorInput, setCartItemsByCreatorInput] =
    useState<CartItemsByCreatorInput[]>();

  // const { data: me, loading: meLoading } = useMeQuery();
  const [createOrder, { data: orderData, loading: orderLoading }] =
    useCreateOrderMutation();

  const [gross, setGross] = useState(0);

  useEffect(() => {
    if (cartItems) {
      const mappedArray: mappedResult[] = toCartItemsByCreatorMap(
        cartItems?.cartItems as CartItem[]
      );
      console.log({ mappedArray });
      setMappedCartItems(mappedArray);
      console.log({ mappedCartItems });
    }
  }, [cartItems]);

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

  useEffect(() => {
    const inputArray: CartItemsByCreatorInput[] = [];
    if (mappedCartItems) {
      console.log("check");
      mappedCartItems.map((itemsbycreator) => {
        const mealkitFee = itemsbycreator.cartItems
          .map((item) => item.total)
          .reduce((a, b) => a + b, 0);
        const deliveryFeeArray = itemsbycreator.cartItems.map(
          (item) => item.mealkit?.deliveryFee
        ) as number[];
        const deliveryFee = Math.max(...deliveryFeeArray);

        const input: CartItemsByCreatorInput = {
          creatorId: itemsbycreator.creatorId,
          deliveryFee: deliveryFee,
          mealkitsFee: mealkitFee,
        };

        inputArray.push(input);
      });
    }

    setCartItemsByCreatorInput(inputArray);
    console.log({ cartItemsByCreatorInput });
    console.log({ inputArray });
  }, [mappedCartItems]);

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

  if (!loading && !cartItems) {
    return (
      <div>
        <div>query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (orderLoading) {
    return <Text>Creating payment</Text>;
  }
  if (orderData) {
    router.push(`/payment/${orderData?.createOrder.id}`);
  }

  return (
    <HeadingLayout heading="Checkout">
      <Box mb="50px">
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

        <Divider />
        {/* <Heading>Checkout</Heading> */}
        {/* 
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
      )} */}

        {cartItems?.cartItems.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          <Box>
            {!mappedCartItems ? (
              <Text>loading</Text>
            ) : (
              mappedCartItems.map((item, index) => (
                <Box key={index}>
                  <LinkBox>
                    <Flex alignItems="center">
                      <Avatar
                        margin="auto"
                        m={2}
                        size="xs"
                        src={item.avatar}
                        alt="creator avatar"
                      />
                      <LinkOverlay href={`/user/${item.creatorId}`}>
                        <Text>{item.creatorName}</Text>
                      </LinkOverlay>

                      <ChevronRightIcon mt="2px" />
                    </Flex>
                  </LinkBox>
                  {item.cartItems.map((cartItem, subindex) => (
                    <Box flex={2} m={1} textAlign="left" key={subindex}>
                      <Box flex={1} m={1}>
                        <LinkBox>
                          <Flex>
                            {/* show one image if there is */}
                            {!cartItem.mealkit?.images ? null : (
                              <Box flex={1} m={1}>
                                <Image
                                  src={cartItem.mealkit?.images[0]}
                                  alt="image"
                                  fallbackSrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                                />
                              </Box>
                            )}
                            <Box flex={2}>
                              <LinkOverlay
                                href={`/post/${cartItem.mealkit?.postId}`}
                              >
                                <Heading size="md">
                                  {cartItem.mealkit?.name}
                                </Heading>
                              </LinkOverlay>
                              <Text>
                                For {cartItem.mealkit?.portion}{" "}
                                {cartItem.mealkit?.portion &&
                                cartItem.mealkit.portion > 1
                                  ? "people"
                                  : "person"}
                              </Text>
                              <Flex
                                justifyContent="space-between"
                                fontSize="sm"
                              >
                                <Text>Unit price</Text>
                                <Text>฿{cartItem.mealkit?.price}</Text>
                              </Flex>

                              <Flex
                                justifyContent="space-between"
                                fontSize="sm"
                              >
                                <Text>Amount</Text>
                                <Text>
                                  x {cartItem.quantity}{" "}
                                  {cartItem.quantity > 1 ? "sets" : "set"}
                                </Text>
                              </Flex>

                              <Flex justifyContent="space-between">
                                <Text>Total</Text>
                                <Text>฿ {cartItem.total}</Text>
                              </Flex>
                            </Box>
                          </Flex>
                        </LinkBox>
                      </Box>
                    </Box>
                  ))}
                  <Divider />
                  {/* summary of each creator */}
                  <Box py={4}>
                    <Wrapper mt={0} mb={0}>
                      <Heading fontSize="md">Delivery</Heading>
                      <Flex justifyContent="space-between">
                        <Box>
                          <Text>By Inter Express</Text>
                          <Text color="gray.600"> arrive on tomorrow</Text>
                        </Box>
                        <Text>฿ {item.deliveryFee}</Text>
                      </Flex>
                    </Wrapper>
                  </Box>
                  <Divider />
                  {/* summary of the order */}

                  <Box
                    bgColor="green.50"
                    py={2}
                    borderTopWidth="1px"
                    borderBottomWidth="1px"
                    borderColor="green.300"
                  >
                    <Wrapper mt={0} mb={0}>
                      <Flex justifyContent="space-between">
                        <Text>Total order</Text>
                        <Heading fontSize="md" color={primaryColor}>
                          ฿ {item.totalByCreator + item.deliveryFee}
                        </Heading>
                      </Flex>
                    </Wrapper>
                  </Box>
                  <Divider />
                </Box>
              ))
            )}
          </Box>
        )}

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
                    cartItemsByCreatorInput: cartItemsByCreatorInput!, //check this
                  },
                });
                // if (!orderLoading && orderData?.createOrder.id) {
                //   console.log(orderLoading);
                //   console.log(3);
                //   router.push(`/payment/${orderData?.createOrder.id}`);
                // }
              }}
            >
              Make a payment
            </Box>
          </Box>
        </Flex>

        {/* {!qrLoading ? null : <Image src={qrData?.createScbQr.data.qrImage} />} */}
      </Box>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Checkout);
