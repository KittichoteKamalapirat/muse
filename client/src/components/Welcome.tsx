import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
// import { Image } from "@chakra-ui/image";
// import Image from "next/image";
import {
  Img,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Center,
  Avatar,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import React from "react";
import { HomeIcon } from "./Icons/HomeIcon";
import { primaryColor, inActiveGray } from "./Variables";
import { Wrapper } from "./Wrapper";
import NextLink from "next/link";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import SvgWhy1 from "./svgComponents/Why1";
import SvgWhy2 from "./svgComponents/Why2";
import SvgWhy3 from "./svgComponents/Why3";
import SvgWhy4 from "./svgComponents/Why4";
import {
  PaginatedPosts,
  Post,
  PostSnippetFragment,
} from "../generated/graphql";
import SvgThflag from "./svgComponents/Thflag";
import mealkitImg from "./Assets/mealkit.png";
import { WelcomeNav } from "./WelcomeNav";
import { Footer } from "./Footer";
import { Slider } from "./Slider";
import { CustomerVoiceSlider } from "./CustomerVoiceSlider";
import SvgSdg12 from "./svgComponents/Sdg12";

interface WelcomeProps {
  // posts?: Post[] | undefined;
  // posts?: Post[] | undefined;
  posts?: PostSnippetFragment[] | undefined;
}

export const Welcome: React.FC<WelcomeProps> = ({ posts }) => {
  console.log({ posts });

  // const myLoader = ({ src, width, quality }) => {
  //   return `https://cookknow.com/${src}?w=${width}&q=${quality || 75}`;
  // };

  // const Feature = ({ title, desc, ...rest }) => {
  //   return (
  //     <Box p={5} shadow="md" borderWidth="1px" {...rest}>
  //       <Heading fontSize="xl">{title}</Heading>
  //       <Text mt={4}>{desc}</Text>
  //     </Box>
  //   );
  // };

  return (
    <>
      <WelcomeNav>
        <Flex
          flexDirection="column"
          alignItems="center"
          mt={["30px", "120px"]}
          mb={["5px", "100px"]}
          pb={["40px"]}
        >
          <Flex
            flexDirection={["column", "row"]}
            alignItems="center"
            textAlign="center"
          >
            <Box>
              {" "}
              <Heading>The Meal kit Marketplace</Heading>
              <Box
                // flexDirection={["column", "row"]}
                mt={4}
                fontSize="xl"
              >
                {/* <Text>With the right ingredient</Text> */}
                {/* <Text>With the right recipe</Text> */}

                {/* <Text>Cooking</Text> */}

                <Text>มีวัตถุดิบ มีคลิปสอน </Text>
                <Text> พร้อมทำอาหาร</Text>
              </Box>
              <NextLink href="/register">
                <Link>
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    colorScheme="teal"
                    variant="solid"
                    my={8}
                  >
                    Create Account
                  </Button>
                </Link>
              </NextLink>
            </Box>

            <Img
              src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/mealkit.png"
              boxSize={["150px", "300px"]}
              alt="mealkit image"
            />
          </Flex>
          <ChevronDownIcon w={6} h={6} />
        </Flex>

        {/* why section */}
        <Box bgColor="gray.50" p={4}>
          <Wrapper>
            <Heading textAlign="center" mt={4} fontSize="2xl">
              Why choose Cookknow
            </Heading>

            <Flex direction={["column", "row"]} alignItems="center">
              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy1 width="80%" height="80%" />
                <Heading fontSize="lg" my={2}>
                  No grocery shopping
                </Heading>
                {/* <Text>ไม่ต้องออกไปซื้อวัตถุดิบเอง</Text> */}
                <Text textAlign="center">
                  We provide ingredients at yoru door
                </Text>
              </Flex>

              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy2 width="80%" height="80%" />
                <Heading fontSize="lg" my={2}>
                  No messing up{" "}
                </Heading>
                <Text textAlign="center">
                  Cook along the easy-to-follow video recipe
                </Text>
                {/* <Text>ทำอาหารใหม่ๆตามคลิปง่ายๆ</Text> */}
              </Flex>
            </Flex>

            <Flex direction={["column", "row"]} alignItems="center">
              {" "}
              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy3 width="80%" height="80%" />
                <Heading fontSize="lg" my={2}>
                  No Food Waste
                </Heading>
                {/* <Text>ไม่มีอาหารเหลือทิ้ง</Text> */}
                <Text textAlign="center">
                  The ingredients provided are well portioned
                </Text>
              </Flex>
              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy4 width="80%" height="80%" />
                <Heading fontSize="lg" my={2}>
                  No repeated menu
                </Heading>
                <Text textAlign="center">
                  Choose from a wide variety of menu
                </Text>
                {/* <Text>มีคนช่วยเลือกเมนู</Text> */}
              </Flex>
            </Flex>
          </Wrapper>
        </Box>

        <Box my="80px">
          <Box my={8}>
            <Heading fontSize="2xl" mb={4} textAlign="center">
              Example of the meal kits
            </Heading>

            <Wrapper mt={0}>
              <Text fontSize="lg">
                <Text fontWeight="600" as="mark">
                  A variety of cuisine{" "}
                </Text>
                is available on the platform. Learn to cook{" "}
                <Text fontWeight="600" as="mark">
                  new and exiting food
                </Text>{" "}
                such as Thai, Japanese, Korean, Italian, or even Indian dishes.
              </Text>
            </Wrapper>
          </Box>

          <Slider />
        </Box>

        {/* How it works section

*/}
        <Box mt={10} bgColor="gray.50" p={4}>
          {/* <Heading>Become a creator</Heading> */}
          <Wrapper>
            <Heading fontSize="xl">
              {/* ใครๆก็สามารถสมัครเพื่อขายสินค้ากับแพลตฟอร์มของเราได้ */}
              Anyone can be recipe's creators
            </Heading>

            <Text mt={2}>
              Join our creators' program and learn how to create a meal kit for
              your recipe
            </Text>

            <NextLink
              href={{
                pathname: "/creator",
                // query: { isCreator: true },
              }}
            >
              <Link>
                <Button
                  rightIcon={<ChevronRightIcon />}
                  colorScheme="teal"
                  variant="solid"
                  my={4}
                >
                  Become a creator
                </Button>
              </Link>
            </NextLink>
          </Wrapper>
        </Box>

        {/* client's voice */}
        <Box mt="40px" mb="80px">
          <Heading fontSize="2xl" mb={4} textAlign="center">
            Customer's Voice
          </Heading>

          <Wrapper>
            <Center my={6}>
              <Avatar
                name="Dan"
                src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/dan.png"
                size="2xl"
              />
            </Center>

            <Text fontStyle="italic" color="gray.600">
              "The ingredients were fresh and came in ready-to-use portions.
              It's super convenient when I'm too lazy to think of a recipe and
              have to go shop for them.
              <Text fontWeight="600" as="mark">
                Would definitely recommend!"
              </Text>
            </Text>
          </Wrapper>
          <CustomerVoiceSlider />
        </Box>

        {/* /no food waste */}

        <Box py="20px" bgColor="gray.50">
          <Wrapper>
            <Flex direction={["column", "row"]} textAlign="center">
              <Box mb={["20px", "none"]}>
                <Heading my={2}>No Food Waste</Heading>
                <Text>
                  Help reduce food waste by cooking the amount we can consume
                </Text>
              </Box>
              <Center mx={6}>
                <SvgSdg12 width="100px" height="100px" />
              </Center>
            </Flex>
          </Wrapper>
        </Box>
      </WelcomeNav>

      <Footer />
    </>
  );
};
