import { Image, Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../components/Layout/HeadingLayout";
import { Button, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import {
  CartItem,
  useCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../generated/graphql";
import { withApollo } from "../util/withApollo";
import NextLink from "next/link";
import { EditCartItemAmountButton } from "../components/EditCartItemAmount";
import { Avatar } from "@chakra-ui/avatar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  mappedCartItemsByCreatorResult,
  toCartItemsByCreatorMap,
} from "../util/toCartItemsByCreatorMap";

interface cartProps {}

const Cart: React.FC<cartProps> = ({}) => {
  // useupdate
  const { data: cartItems, loading, error } = useCartItemsQuery();
  const [mappedCartItems, setMappedCartItems] =
    useState<mappedCartItemsByCreatorResult[]>();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const [gross, setGross] = useState(0);

  useEffect(() => {
    if (cartItems) {
      const mappedArray: mappedCartItemsByCreatorResult[] =
        toCartItemsByCreatorMap(cartItems?.cartItems as CartItem[]);
      console.log({ mappedArray });
      setMappedCartItems(mappedArray);
      console.log({ mappedCartItems });
    }
  }, [cartItems]);

  //run everytime when re-render
  useEffect(() => {
    if (cartItems) {
      let gross: number = 0;
      cartItems?.cartItems.map((cartItem) => {
        gross = gross + cartItem.fieldTotal;
      });
      setGross(gross);
    }
  }, [cartItems]);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (!loading && !cartItems) {
    return (
      <div>
        <div>query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <HeadingLayout heading="Cart">
      <Wrapper>
        <Heading>My cart</Heading>

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
                        <Box>
                          <Flex>
                            {/* show one image if there is */}
                            {!cartItem.mealkit?.images ? null : (
                              <Box flex={1} m={1}>
                                <Img
                                  src={cartItem.mealkit?.images[0]}
                                  alt="image"
                                  fallbacksrc="https://via.placeholder.com/50x500?text=Image+Has+to+be+Square+Ratio"
                                />
                              </Box>
                            )}
                            <Box flex={2}>
                              {/* <LinkOverlay
                                href={`/post/${cartItem.mealkit?.postId}`}
                              > */}
                              <Heading size="md">
                                {cartItem.mealkit?.name}
                              </Heading>
                              {/* </LinkOverlay> */}
                              <Text>
                                For {cartItem.mealkit?.portion}{" "}
                                {cartItem.mealkit?.portion &&
                                cartItem.mealkit.portion > 1
                                  ? "people"
                                  : "person"}
                              </Text>
                              <Box flex={1} m={1}>
                                <Text>฿{cartItem.mealkit?.price}</Text>
                              </Box>

                              <EditCartItemAmountButton
                                cartItem={cartItem as CartItem}
                                deleteCartItem={deleteCartItem}
                                updateCartItem={updateCartItem}
                              />

                              <Box flex={1} m={1}>
                                <Text>Total: {cartItem.fieldTotal}</Text>
                              </Box>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))
            )}
          </Box>
        )}
      </Wrapper>

      <Box
        zIndex={1}
        position="fixed"
        bottom={[0, 0, null, null]}
        right={[0, 0, 0, 0]}
        bgColor="white"
        ml={"auto"}
        align="center"
        width="100%"
        maxW={[null, null, "30%", "30%"]}
        justifyContent="end"
        boxShadow="xs"
      >
        <Box
          width="90%"
          mx="auto"
          py={4}
          maxW={[null, "40%", "none", "none"]}
          fontWeight="bold"
        >
          <Flex justifyContent="space-between" py={2}>
            <Text>Total</Text>
            <Text>฿{gross}</Text>
          </Flex>

          <Button p={3} color="white" width="100%">
            <NextLink href={{ pathname: "/checkout" }}>
              <Link>Checkout</Link>
            </NextLink>
          </Button>
        </Box>
      </Box>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Cart);
