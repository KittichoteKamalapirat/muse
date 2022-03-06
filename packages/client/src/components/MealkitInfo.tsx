import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  Mealkit,
  useCartItemsQuery,
  useCreateCartItemMutation,
  useMealkitsQuery,
} from "../generated/graphql";
import { gql } from "@apollo/client";
import { Wrapper } from "./Wrapper";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { AddIcon, CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import router from "next/router";
import { useToast, Avatar, Img } from "@chakra-ui/react";
import { ReviewStars } from "./ReviewStars";
import { Reviews } from "./Reviews";
import { Layout } from "./Layout/Layout";
import { FooterLayout } from "./Layout/FooterLayout";
import { ContentWrapper } from "./Wrapper/ContentWrapper";
import { Loading } from "./skeletons/Loading";

interface MealkitInfoProps {
  postId: number;
}

export const MealkitInfo: React.FC<MealkitInfoProps> = ({ postId }) => {
  const toast = useToast();
  const [createCartItem, { data: cartItemData, loading: cartItemLoading }] =
    useCreateCartItemMutation();
  const [cartLoading, setCartLoading] = useState(false);
  const { data: mealkits, loading } = useMealkitsQuery({
    variables: { postId: postId },
  });

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Box bgColor="white" py="1px">
      {/* <Wrapper> */}
      <ContentWrapper>
        <Heading size="lg">Meal kit</Heading>
      </ContentWrapper>

      {!mealkits?.mealkits || mealkits?.mealkits.length === 0 ? (
        <Box>
          <Text>ไม่มีชุดทำอาหาร</Text>
          <NextLink href="/" as="/">
            <Button leftIcon={<AddIcon />}>เพิ่มชุดทำอาหาร</Button>
          </NextLink>
        </Box>
      ) : (
        <Box>
          {mealkits.mealkits.map((mealkit, index) => (
            <Box key={index}>
              <Box overflowX="auto" width="90%" margin="auto">
                {mealkit.images?.map((url, index) => (
                  <Center key={index} m={1} minW="150px">
                    <Img src={url} alt="image" borderRadius="10%" />
                  </Center>
                ))}
              </Box>

              <ContentWrapper>
                <Box>
                  <Heading fontSize="lg"> {mealkit.name} </Heading>
                  <ReviewStars
                    reviewScore={4}
                    reviewsCounter={mealkit.reviewsCounter}
                  />

                  <Text>
                    For {mealkit.portion}{" "}
                    {mealkit.portion > 1 ? "people" : "person"}
                  </Text>
                  <Text>฿{mealkit.price}</Text>
                </Box>

                <Box>
                  <Heading size="md">รายการ</Heading>
                  {mealkit.items?.map((item, itemIndex) => (
                    <Text key={itemIndex}>
                      {itemIndex + 1}. {item}
                    </Text>
                  ))}
                </Box>

                <Box
                  zIndex={1}
                  position="fixed"
                  // bottom="0"
                  // left="0"
                  width="100%"
                  bottom={[0, 0, null, null]}
                  right={[0, 0, 0, 0]}
                  maxW={[null, null, "30%", "30%"]}
                  bgColor="white"
                  boxShadow="xs"
                >
                  <Box
                    width="90%"
                    mx="auto"
                    pt={2}
                    pb={2}
                    maxW={[null, "40%", "none", "none"]}
                  >
                    {" "}
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      my={2}
                    >
                      <Flex alignItems="center">
                        <Avatar src={mealkit.images![0]} size="sm" />
                        <Heading fontSize="lg" ml={2}>
                          {" "}
                          {mealkit.name}{" "}
                        </Heading>
                      </Flex>

                      <Text>฿{mealkit.price}</Text>
                    </Flex>
                    <Button
                      width="100%"
                      mx="auto"
                      leftIcon={<AddIcon />}
                      isLoading={cartLoading}
                      onClick={() => {
                        setCartLoading(true);
                        createCartItem({
                          variables: {
                            input: {
                              quantity: 1,
                              mealkitId: mealkit.id,
                            },
                          },
                          update(cache, { data }) {
                            const id = data?.createCartItem.cartItem.id;
                            const newItem = data?.createCartItem.newItem;
                            console.log({ newItem });
                            // if it's a newItem -> append to an array
                            //if it's the old one -> do nothing since Apollo automatically update for us
                            //have to remove mealkit and user, keep only mealkitId and userI since user=null and mealkit=null replace the cache
                            if (newItem) {
                              cache.modify({
                                fields: {
                                  cartItems(existingCartItems = []) {
                                    const newCartItemRef = cache.writeFragment({
                                      data: data.createCartItem.cartItem,
                                      fragment: gql`
                                        fragment NewCartItem on CartItem {
                                          id
                                          meakitId
                                          type
                                        }
                                      `,
                                    });
                                    return [
                                      ...existingCartItems,
                                      newCartItemRef,
                                    ];
                                  },
                                },
                              });
                            } else {
                              // existing item
                              const cached = cache.readFragment({
                                id: "CartItem:" + id, // The value of the to-do item's cache ID
                                fragment: gql`
                                  fragment MyCartItem on CartItem {
                                    id
                                    mealkitId
                                  }
                                `,
                              });
                            }
                          },
                        });
                        setCartLoading(false);
                        // router.push("/cart");
                      }}
                    >
                      ใส่ตะกร้า
                    </Button>
                  </Box>
                </Box>
              </ContentWrapper>

              <Box my={4}>
                <Reviews mealkitId={mealkit.id} />
              </Box>

              <Box display="none">
                {cartItemData &&
                  toast({
                    title: "Added to Cart.",
                    description: `${mealkit.name} has been added to your cart.`,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                    render: () => (
                      <Box width="100%" bgColor="white" p={4} boxShadow="lg">
                        <Flex alignItems="center">
                          <CheckCircleIcon color="brand" m={2} />
                          <Box m={2}>
                            <Heading fontSize="lg">Added to Cart</Heading>
                            <Text color="blackAlpha.600">
                              {" "}
                              {mealkit.name} has been added to your cart.
                            </Text>

                            <Button
                              as={Link}
                              mr={2}
                              onClick={() => router.push("/cart")}
                            >
                              See Cart
                            </Button>
                          </Box>
                        </Flex>
                      </Box>
                    ),
                    // variant: "subtle",
                  })}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <FooterLayout mb="130px" />
      {/* </Wrapper> */}
    </Box>
  );
};
