import { gql } from "@apollo/client";
import { AddIcon, CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Avatar, IconButton, Img, useToast } from "@chakra-ui/react";
import router from "next/router";
import React, { useState } from "react";
import {
  useCreateCartItemMutation,
  useMealkitsQuery,
  useMeQuery,
} from "../generated/graphql";
import Button from "./atoms/Button";
import LinkButton from "./atoms/LinkButton";
import { EditDeleteMealkitButtons } from "./EditDeleteMealkitButtons copy";
import { FooterLayout } from "./Layout/FooterLayout";
import { Layout } from "./Layout/Layout";
import { Reviews } from "./Reviews";
import { ReviewStars } from "./ReviewStars";
import { Loading } from "./skeletons/Loading";
import { ContentWrapper } from "./Wrapper/ContentWrapper";

interface MealkitInfoProps {
  postId: number;
}

export const MealkitInfo: React.FC<MealkitInfoProps> = ({ postId }) => {
  const { data: meData } = useMeQuery();
  const toast = useToast();
  const [createCartItem, { data: cartItemData, loading: cartItemLoading }] =
    useCreateCartItemMutation();
  console.log("1");
  console.log(cartItemData);
  const [cartLoading, setCartLoading] = useState(false);
  const { data: mealkits, loading } = useMealkitsQuery({
    variables: { postId: postId },
  });

  console.log({ mealkits });

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
          <Text>There are no mealkits for this post</Text>
          <LinkButton pathname="/" leftIcon={<AddIcon />}>
            Add a mealkit
          </LinkButton>
        </Box>
      ) : (
        <Box>
          {mealkits.mealkits.map((mealkit, index) => (
            <Box key={index}>
              <Box overflowX="auto" width="90%" margin="auto">
                {mealkit.mealkitFiles.map((file, index) => (
                  <Center key={index} m={1} minW="150px">
                    <Img src={file.url} alt="image" borderRadius="10%" />
                  </Center>
                ))}
              </Box>

              <ContentWrapper>
                <Flex justifyContent="space-between" alignItems="baseline">
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

                  {meData?.me?.id === mealkit.creatorId && (
                    <EditDeleteMealkitButtons
                      id={mealkit.id}
                      postId={mealkit.postId}
                      // isPublished={data.post.isPublished}
                    />
                  )}
                </Flex>

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
                        <Avatar src={mealkit.thumbnail.url} size="sm" />
                        <Heading fontSize="lg" ml={2}>
                          {" "}
                          {mealkit.name}{" "}
                        </Heading>
                      </Flex>

                      <Text>฿{mealkit.price}</Text>
                    </Flex>
                    <Button
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
                      Add to cart
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
                    duration: 100000,
                    isClosable: true,
                    position: "top-right",
                    render: ({ id, onClose }) => (
                      <Box
                        key={id}
                        bgColor="white"
                        p={3}
                        boxShadow="lg"
                        borderRadius="lg"
                      >
                        <Flex alignItems="center">
                          <Box minWidth="-webkit-fill-available">
                            <Flex
                              justifyContent="space-between"
                              alignItems="flex-center"
                            >
                              <Flex alignItems="center">
                                <CheckCircleIcon color="brand" m={2} />
                                <Heading fontSize="lg">Added to Cart</Heading>
                              </Flex>

                              <IconButton
                                onClick={onClose}
                                aria-label="closeIcon"
                                backgroundColor="none"
                                width="1rem"
                                height="1rem"
                                icon={<SmallCloseIcon color="black" />}
                              />
                            </Flex>

                            <Text color="blackAlpha.600">
                              {mealkit.name} has been added to your cart.
                            </Text>

                            <Button
                              as={Link}
                              mr={2}
                              onClick={() => router.push("/cart")}
                              textAlign="center"
                              size="xs"
                              color="white"
                              width="min-content"
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
