import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
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
import { AddIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { inActiveGray, primaryColor } from "./Variables";
import { graphqlSync } from "graphql";
import router from "next/router";

interface MealkitInfoProps {
  postId: number;
}

export const MealkitInfo: React.FC<MealkitInfoProps> = ({ postId }) => {
  const [createCartItem] = useCreateCartItemMutation();
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
  return (
    <Box>
      <Heading size="lg">ชุดทำอาหาร</Heading>

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
        <Box
        // borderRadius="1%"
        // border={1}
        // borderStyle="solid"
        // borderColor="gray.200"
        >
          {mealkits.mealkits.map((mealkit, index) => (
            <Box key={index}>
              <Heading fontSize="lg" color={primaryColor}>
                {" "}
                {mealkit.name}{" "}
              </Heading>
              <Text>สำหรับ: {mealkit.portion} คน</Text>
              <Text>ราคา: {mealkit.price} บาท</Text>
              <Box>
                <Heading size="md">รายการ</Heading>
                {mealkit.items?.map((item, itemIndex) => (
                  <Text key={itemIndex}>
                    {index + 1}. {item}
                  </Text>
                ))}
              </Box>
              <Flex overflowX="auto">
                {" "}
                {mealkit.images?.map((url, index) => (
                  <Box key={index} m={1} minW="150px" width="200px">
                    <Image src={url} alt="image" borderRadius="10%" />
                  </Box>
                ))}
              </Flex>

              <Button
                colorScheme="teal"
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

                        console.log({ cached });
                        // case1: CartItem: xx already in the cache -> break
                        // case2: CartItem: xx not in the cache yet -> good
                        console.log({ data });
                        // cache.modify({
                        //   // id: `CartItem:${id}`,
                        //   fields: {
                        //     cartItems(existingCartItems = []) {
                        //       const newCartItemRef = cache.writeFragment({
                        //         data: data?.createCartItem.cartItem,
                        //         fragment: gql`
                        //           fragment NewCartItem on CartItem {
                        //             id
                        //             # type
                        //             meakitId
                        //           }
                        //         `,
                        //       });
                        //       console.log({ newCartItemRef });
                        //       // return [...existingCartItems, newCartItemRef];
                        //       return [...existingCartItems, newCartItemRef];
                        //     },
                        //   },
                        // });
                      }
                    },
                  });
                  setCartLoading(false);
                  router.push("/cart");
                }}
              >
                ใส่ตะกร้า
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
