import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface HeadingLayoutProps {
  heading: string;
}

export const HeadingLayout: React.FC<HeadingLayoutProps> = ({
  children,
  heading,
}) => {
  const router = useRouter();
  return (
    <>
      <Box
        zIndex={1}
        position="fixed"
        width="100%"
        top={0}
        p={1}
        backgroundColor="white"
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        borderBottomColor="blackAlpha.200"
      >
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon />}
          onClick={() => router.back()}
          position="fixed"
          fontSize="x-large"
          color="dark.200"
          variant="none"
        />
        <Heading fontSize="xl" textAlign="center" mt={1}>
          {heading}
        </Heading>
      </Box>
      <Box mt={20}>{children}</Box>
    </>
  );
};
