import { Avatar } from "@chakra-ui/avatar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ButtonLink from "../components/atoms/LinkButton";
import { EditCartItemAmountButton } from "../components/EditCartItemAmount";
import { HeadingLayout } from "../components/Layout/HeadingLayout";
import { Layout } from "../components/Layout/Layout";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import { ContentWrapper } from "../components/Wrapper/ContentWrapper";
import { Wrapper } from "../components/Wrapper/Wrapper";
import {
  CartItem,
  useCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../generated/graphql";
import {
  mappedCartItemsByCreatorResult,
  toCartItemsByCreatorMap,
} from "../util/toCartItemsByCreatorMap";
import { withApollo } from "../util/withApollo";

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
      setMappedCartItems(mappedArray);
    }
  }, [cartItems, mappedCartItems]);

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
    return (
      <Layout heading="loading">
        <Loading />
      </Layout>
    );
  }

  if (!loading && !cartItems) {
    return (
      <Layout heading="loading">
        <Error text={error?.message} />
      </Layout>
    );
  }

  return (
    <HeadingLayout heading="Cart">
      {/* a lot margin otherwise bottom nav hides cartItem */}
      <Wrapper mb={32}>
        <ContentWrapper>
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
                          name="creator avatar"
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

                              <Box flex={1} m={1}>
                                <Image
                                  src={cartItem.mealkit.thumbnail.url}
                                  alt="image"
                                  fallbackSrc="oops.png"
                                />
                              </Box>

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

              <Box
                zIndex={1}
                position="fixed"
                bottom={[0, 0, null, null]}
                right={[0, 0, 0, 0]}
                bgColor="white"
                ml={"auto"}
                // align="center"
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

                  <ButtonLink pathname="/checkout">Checkout</ButtonLink>
                </Box>
              </Box>
            </Box>
          )}
        </ContentWrapper>
      </Wrapper>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Cart);
