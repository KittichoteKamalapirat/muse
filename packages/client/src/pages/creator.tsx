import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Flex, Img } from "@chakra-ui/react";
import React from "react";
import LinkButton from "../components/atoms/LinkButton";
import { Footer } from "../components/Footer";
import SvgCreator1 from "../components/svgComponents/Creator1";
import SvgCreator2 from "../components/svgComponents/Creator2";
import SvgCreator3 from "../components/svgComponents/Creator3";
import SvgCreator4 from "../components/svgComponents/Creator4";
import { WelcomeNav } from "../components/WelcomeNav";
import { Wrapper } from "../components/Wrapper/Wrapper";

import { withApollo } from "../util/withApollo";

interface WelcomeCreatorProps {}

const WelcomeCreator: React.FC<WelcomeCreatorProps> = ({}) => {
  return (
    <>
      <WelcomeNav />

      <Flex
        flexDirection="column"
        alignItems="center"
        mt="100px"
        mb={["5px", "100px"]}
        pb={["10px"]}
      >
        <Flex
          flexDirection={["column", "row"]}
          alignItems="center"
          textAlign="center"
        >
          <Box>
            <Heading>Share your recipe</Heading>
            <Box
              // flexDirection={["column", "row"]}
              mt={4}
              fontSize="xl"
            >
              <Text>Film your recipe, Provide ingredients</Text>
              <Text>Generate Income</Text>
            </Box>
            <LinkButton
              href={{
                pathname: "/register",
                query: { isCreator: true },
              }}
              mt={10}
            >
              Sign up as Creator
            </LinkButton>
          </Box>

          <Img
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/creator.png"
            // boxSize={["150px", "300px"]}
            width={["150px", "250px"]}
            alt="mealkit image"
          />
        </Flex>
        <ChevronDownIcon mt={4} w={6} h={6} />
      </Flex>

      <Box bgColor="gray.50" p={4}>
        <Wrapper>
          <Heading textAlign="center" mt={4} fontSize="xl">
            How it works
          </Heading>

          <Flex direction={["column", "row"]} alignItems="center">
            <Flex direction="column" alignItems="center" mt={8}>
              <Text>1. Make a cooking video of your signature recipe</Text>

              <SvgCreator1 width="80%" height="80%" />
            </Flex>

            <Flex direction="column" alignItems="center" mt={8}>
              <Text>2. Provide ingredients (meal kit)for the recipe</Text>
              <SvgCreator2 width="80%" height="80%" />
            </Flex>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            {" "}
            <Flex direction="column" alignItems="center" mt={8}>
              <Text>3. Upload the video and meal kit images</Text>
              <SvgCreator3 width="80%" height="80%" />
            </Flex>
            <Flex direction="column" alignItems="center" mt={8}>
              <Text>4. Ship to your customers!</Text>
              <SvgCreator4 width="80%" height="80%" />
            </Flex>
          </Flex>
        </Wrapper>
      </Box>

      <Footer />
    </>
  );
};

export default withApollo({ ssr: false })(WelcomeCreator);
