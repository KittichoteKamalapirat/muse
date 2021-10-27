import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import {
  Mealkit,
  useCartItemsQuery,
  useCreateCartItemMutation,
  useMealkitsQuery,
} from "../generated/graphql";
import { Layout } from "./Layout";
import { Wrapper } from "./Wrapper";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { inActiveGray, primaryColor } from "./Variables";
import { graphqlSync } from "graphql";

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
              <Text>สำหรับ: {mealkit.portion} คน</Text>
              <Text>ราคา: {mealkit.price} บาท</Text>
              <Box>
                <Heading size="md">รายการ</Heading>
                {mealkit.items?.map((item, index) => (
                  <Text key={index}>
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
                  });
                  setCartLoading(false);
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
