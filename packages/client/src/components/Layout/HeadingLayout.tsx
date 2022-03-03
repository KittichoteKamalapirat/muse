import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface HeadingLayoutProps {
  heading: string;
  back?: boolean;
  mt?: string;
}

export const HeadingLayout: React.FC<HeadingLayoutProps> = ({
  children,
  heading,
  back = true,
  mt,
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
        {!back ? null : (
          <IconButton
            aria-label="Search database"
            icon={<ChevronLeftIcon />}
            onClick={() => {
              router.back();
            }}
            position="fixed"
            fontSize="x-large"
            color="dark.200"
            variant="transparent"
          />
        )}

        <Heading fontSize="xl" textAlign="center" mt={1}>
          {heading.substr(0, 30)}
          {heading.length > 30 && "..."}
        </Heading>
      </Box>
      <Box mt={mt || "40px"}>{children}</Box>
    </>
  );
};
