import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  Mealkit,
  useCartItemsQuery,
  useCreateCartItemMutation,
  useMealkitsQuery,
} from "../generated/graphql";
import { gql } from "@apollo/client";
import { Layout } from "./Layout";
import { Wrapper } from "./Wrapper";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { AddIcon, CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import { Image, Img } from "@chakra-ui/image";
import { inActiveGray, primaryColor } from "./Variables";
import { graphqlSync } from "graphql";
import router from "next/router";
import { useToast } from "@chakra-ui/react";

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
  console.log(mealkits);
  if (loading) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    );
  }

  // useEffect(() => {
  //   if (cartItemData) {
  //     toast({
  //       title: "Added to Cart.",
  //       description: `xxxhas been added to your cart.`,
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  // }, [cartItemData]);

  // {cartItemData &&
  //   toast({
  //     title: "Added to Cart.",
  //     description: `${mealkit.name}has been added to your cart.`,
  //     status: "success",
  //     duration: 4000,
  //     isClosable: true,
  //   })}

  return (
    <Box bgColor="white" py="1px">
      <Wrapper>
        <Heading size="lg">Meal kit</Heading>
        {!mealkits?.mealkits || mealkits?.mealkits.length === 0 ? (
          <Box>
            <Text>ไม่มีชุดทำอาหาร</Text>
            <NextLink href="/" as="/">
              <Button colorScheme="teal" leftIcon={<AddIcon />}>
                เพิ่มชุดทำอาหาร
              </Button>
            </NextLink>
          </Box>
        ) : (
          <Box>
            {mealkits.mealkits.map((mealkit, index) => (
              <Box key={index}>
                <Flex overflowX="auto">
                  {mealkit.images?.map((url, index) => (
                    <Box key={index} m={1} minW="150px" width="200px">
                      <Img src={url} alt="image" borderRadius="10%" />
                    </Box>
                  ))}
                </Flex>
                <Heading fontSize="lg"> {mealkit.name} </Heading>
                <Text>สำหรับ: {mealkit.portion} คน</Text>
                <Text>ราคา: {mealkit.price} บาท</Text>
                <Box>
                  <Heading size="md">รายการ</Heading>
                  {mealkit.items?.map((item, itemIndex) => (
                    <Text key={itemIndex}>
                      {itemIndex + 1}. {item}
                    </Text>
                  ))}
                </Box>

                <Button
                  colorScheme="teal"
                  mt="20px"
                  width="100%"
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
                                return [...existingCartItems, newCartItemRef];
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
                    console.log({ cartItemLoading });
                    console.log({ cartItemData });
                    // router.push("/cart");
                  }}
                >
                  ใส่ตะกร้า
                </Button>
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
                            <CheckCircleIcon color="teal.300" m={2} />
                            <Box m={2}>
                              <Heading fontSize="lg">Added to Cart</Heading>
                              <Text color="blackAlpha.600">
                                {" "}
                                {mealkit.name} has been added to your cart.
                              </Text>

                              <Button
                                as={Link}
                                mr={2}
                                colorScheme="teal"
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
      </Wrapper>
    </Box>
  );
};
