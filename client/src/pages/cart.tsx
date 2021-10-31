import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { HeadingLayout } from "../components/HeadingLayout";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import {
  useCartItemsQuery,
  useUpdateCartItemMutation,
} from "../generated/graphql";
import { createWithApollo } from "../util/createWithApollo";
import { withApollo } from "../util/withApollo";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IconButton } from "@chakra-ui/button";
import { AddIcon, MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Table, Tr, Th } from "@chakra-ui/react";

interface cartProps {}

const Cart: React.FC<cartProps> = ({}) => {
  // useupdate
  const { data: cartItems, loading, error } = useCartItemsQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [gross, setGross] = useState(0);

  //run everytime when re-render
  useEffect(() => {
    console.log("useEffect run");
    // cartItems chage -> but it woud't c hange often
    //if I don't use useEffect -> unlimit update state because
    //setGross
    //re-render
    // -> setGross again infinitely

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
  }, [cartItems]);

  if (!loading && !cartItems) {
    return (
      <div>
        <div>query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  console.log(cartItems);
  console.log(cartItems?.cartItems);

  return (
    <HeadingLayout heading="Cart">
      <Wrapper>
        <Heading>My cart</Heading>

        {cartItems?.cartItems.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          <Box>
            {cartItems?.cartItems.map((item) => (
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

                <Box flex={2} m={1} textAlign="left">
                  <Heading size="md">{item.mealkit?.name}</Heading>
                  <Text>
                    For {item.mealkit?.portion}{" "}
                    {item.mealkit!.portion > 1 ? "people" : "person"}
                  </Text>
                  <Box flex={1} m={1}>
                    <Text>฿{item.mealkit?.price}</Text>
                  </Box>

                  <Table variant="simple" size="sm" width="2rem">
                    <Tr>
                      <Th
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="gray.300"
                        p={1}
                      >
                        {" "}
                        <Box>
                          <IconButton
                            aria-label="add more item"
                            color="gray.700"
                            icon={<AddIcon />}
                            size="xs"
                            onClick={() => {
                              //the cache is automatically updated because there is id? Ben mentioend this I think
                              updateCartItem({
                                variables: {
                                  quantity: item.quantity + 1,
                                  id: item.id,
                                  mealkitId: item.mealkitId,
                                },
                              });
                            }}
                          />
                        </Box>
                      </Th>
                      <Th
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="gray.300"
                        px={4}
                      >
                        {" "}
                        <Box>
                          <Text
                            color="gray.700"
                            fontSize="md"
                            fontWeight="normal"
                          >
                            {item.quantity}
                          </Text>
                        </Box>
                      </Th>
                      <Th
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="gray.300"
                        p={1}
                      >
                        {" "}
                        <Box>
                          <IconButton
                            aria-label="add more item"
                            icon={<MinusIcon />}
                            size="xs"
                            color="gray.700"
                            onClick={() => {
                              //the cache is automatically updated because there is id? Ben mentioend this I think
                              updateCartItem({
                                variables: {
                                  quantity: item.quantity - 1,
                                  id: item.id,
                                  mealkitId: item.mealkitId,
                                },
                              }); //quantity is returned -> Apollo auto updated in the  cache
                              //if total is not rutnr 0> Apollo don't update -> so the total is still the same
                            }}
                          />
                        </Box>
                      </Th>
                    </Tr>
                  </Table>

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
          <Text>totle: ฿{gross}</Text>
        </Box>
        <Box p={3} bgColor="red.400" color="white">
          <NextLink href={{ pathname: "/checkout" }}>
            <Link>Checkout</Link>
          </NextLink>
        </Box>
      </Flex>
    </HeadingLayout>
  );
};

export default withApollo({ ssr: false })(Cart);
