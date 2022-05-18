import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Avatar, Center, Img, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import LinkButton from "./atoms/LinkButton";
import { CustomerVoiceSlider } from "./CustomerVoiceSlider";
import { Footer } from "./Footer";
import { Slider } from "./Slider";
import { Slider2 } from "./Slider2/Slider2";
import { Slider3 } from "./Slider3/Slider3";
import SvgSdg12 from "./svgComponents/Sdg12";
import SvgWhy1 from "./svgComponents/Why1";
import SvgWhy2 from "./svgComponents/Why2";
import SvgWhy3 from "./svgComponents/Why3";
import SvgWhy4 from "./svgComponents/Why4";
import { WelcomeNav } from "./WelcomeNav";
import { Wrapper } from "./Wrapper/Wrapper";

interface WelcomeProps {}

export const Welcome: React.FC<WelcomeProps> = ({}) => {
  const [isLargerThan30Em] = useMediaQuery("(min-width: 30em)");

  return (
    <>
      <WelcomeNav>
        <Flex
          flexDirection="column"
          alignItems="center"
          mt={["120px", "120px"]}
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
              <Heading color="brand">
                The Meal Kit {isLargerThan30Em ? null : <br />} Marketplace
              </Heading>
              <Box mt={4} fontSize="xl">
                <Text>มีวัตถุดิบ มีคลิปสอน </Text>
                <Text> พร้อมทำอาหาร</Text>
              </Box>
              <LinkButton
                href="/register"
                rightIcon={<ChevronRightIcon />}
                width="fit-content"
              >
                Create Account
              </LinkButton>
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
                  We provide ingredients to your door
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
                  new and exciting food
                </Text>{" "}
                such as Thai, Japanese, Korean, Italian, or even Indian dishes.
              </Text>
            </Wrapper>
          </Box>

          <Slider />
          {/* <Slider2 /> */}
          {/* <Slider3 /> */}
        </Box>

        {/* How it works section

*/}
        <Box mt={10} bgColor="gray.50" p={4}>
          {/* <Heading>Become a creator</Heading> */}
          <Wrapper>
            <Heading fontSize="xl">
              {/* ใครๆก็สามารถสมัครเพื่อขายสินค้ากับแพลตฟอร์มของเราได้ */}
              Anyone can be recipe&apos;s creators
            </Heading>

            <Text mt={2}>
              Join our creators&apos; program and learn how to create a meal kit
              for your recipe
            </Text>

            <LinkButton
              href="/register"
              rightIcon={<ChevronRightIcon />}
              width="fit-content"
            >
              Become a creator
            </LinkButton>
          </Wrapper>
        </Box>

        {/* client's voice */}
        <Box mt="40px" mb="80px">
          <Heading fontSize="2xl" mb={4} textAlign="center">
            Customer&apos;s Voice
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
              &quot;The ingredients were fresh and came in ready-to-use
              portions. It&apos;s super convenient when I&apos;m too lazy to
              think of a recipe and have to go shop for them.
              <Text fontWeight="600" as="mark">
                Would definitely recommend!&quot;
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
