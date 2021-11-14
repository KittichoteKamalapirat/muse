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
import { PaginatedPosts, Post } from "../generated/graphql";
import SvgThflag from "./svgComponents/Thflag";
import mealkitImg from "./Assets/mealkit.png";
import { WelcomeNav } from "./WelcomeNav";
import { Footer } from "./Footer";

interface WelcomeProps {
  posts: Post[] | undefined;
}

export const Welcome: React.FC<WelcomeProps> = ({ posts }) => {
  console.log({ posts });

  // const myLoader = ({ src, width, quality }) => {
  //   return `https://cookknow.com/${src}?w=${width}&q=${quality || 75}`;
  // };

  const Feature = ({ title, desc, ...rest }) => {
    return (
      <Box p={5} shadow="md" borderWidth="1px" {...rest}>
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    );
  };

  return (
    <>
      <WelcomeNav>
        <Flex
          flexDirection="column"
          alignItems="center"
          mt={["30px", "200px"]}
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
              <Heading>The Mealkit Marketplace</Heading>
              <Box
                // flexDirection={["column", "row"]}
                mt={4}
                fontSize="xl"
              >
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
            <Heading textAlign="center" mt={4} fontSize="xl">
              Why choose Cookknow
            </Heading>

            <Flex direction={["column", "row"]} alignItems="center">
              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy1 width="80%" height="80%" />
                <Text>ไม่ต้องออกไปซื้อวัตถุดิบเอง</Text>
              </Flex>

              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy2 width="80%" height="80%" />
                <Text>ทำอาหารที่ไม่เคยทำตามคลิปง่ายๆ</Text>
              </Flex>
            </Flex>

            <Flex direction={["column", "row"]} alignItems="center">
              {" "}
              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy3 width="80%" height="80%" />
                <Text>ไม่มีอาหาร เหลือทิ้ง</Text>
              </Flex>
              <Flex direction="column" alignItems="center" mt={8}>
                <SvgWhy4 width="80%" height="80%" />
                <Text>มีคนช่วยเลือกเมนู</Text>
              </Flex>
            </Flex>
          </Wrapper>
        </Box>

        <Box mt={[10, 10]}>
          <Heading fontSize="xl" mb={4}>
            Example of the recipe
          </Heading>
          <Flex overflowX="auto">
            {" "}
            {posts?.slice(0, 5).map((post, index) => (
              <Box key={index} m={1} minW="150px" width="200px">
                {/* <Image src={post.thumbnailUrl} alt="image" borderRadius="10%" /> */}

                <video
                  // width="320"
                  // height="320"
                  controls
                >
                  <source src={post.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ))}
          </Flex>
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
                pathname: "/register",
                query: { isCreator: true },
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
      </WelcomeNav>
      <Footer />
    </>
  );
};
