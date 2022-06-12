import { Container, Divider, Stack, Text } from "@chakra-ui/react";
import Script from "next/script";
import * as React from "react";
import Button from "./atoms/Button";
import LinkButton from "./atoms/LinkButton";
import Logo from "./Icons/Logo";

export const Footer = () => (
  <Container as="footer" role="contentinfo" maxWidth="95%">
    <Script src="//embed.typeform.com/next/embed.js" />;
    <Stack
      spacing="8"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      py={{ base: "12", md: "8" }}
    >
      <Stack spacing={{ base: "6", md: "8" }} align="start">
        <Logo />
        <Text color="muted">Cook your favorite menu faster and easier.</Text>
      </Stack>
      <Stack
        direction={{ base: "column-reverse", md: "column", lg: "row" }}
        spacing={{ base: "12", md: "8" }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <LinkButton
                pathname="https://kittishane.notion.site/Cookknow-01e3d3b599c448908aa2b7e50b88e5af"
                variant="unstyled"
                isExternal={true}
              >
                How it works
              </LinkButton>
              <LinkButton
                pathname="https://kittishane.notion.site/Cookknow-01e3d3b599c448908aa2b7e50b88e5af"
                variant="unstyled"
                isExternal={true}
              >
                Support
              </LinkButton>

              <Button
                variant="unstyled"
                data-tf-popup="BGp4g61k"
                data-tf-iframe-props="title=Cookknow: subscribe"
                data-tf-medium="snippet"
              >
                Contact us
              </Button>

              <LinkButton
                pathname="https://kittishane.notion.site/Cookknow-01e3d3b599c448908aa2b7e50b88e5af"
                variant="unstyled"
                isExternal={true}
              >
                FAQs
              </LinkButton>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              Legal
            </Text>

            <Stack spacing="3" shouldWrapChildren>
              <LinkButton
                pathname="https://kittishane.notion.site/Cookknow-Privacy-Policy-29b39fedf4e541588ecfa7e15cd24f61"
                variant="unstyled"
                isExternal={true}
              >
                Privacy
              </LinkButton>

              <LinkButton
                pathname="https://kittishane.notion.site/Cookknow-Terms-and-Conditions-1051c45d5a4546179296cc19fa521356"
                variant="unstyled"
                isExternal={true}
              >
                Terms
              </LinkButton>

              {/* <Button variant="unstyled">License</Button> */}
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            Stay up to date
          </Text>
          <Stack
            spacing="4"
            direction={{ base: "column", sm: "row" }}
            maxW={{ lg: "360px" }}
          >
            <Button
              data-tf-popup="uJchTjFZ"
              data-tf-iframe-props="title=Cookknow: subscribe"
              data-tf-medium="snippet"
            >
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider />
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      align="center"
    >
      <Text fontSize="sm" color="gray.500">
        &copy; {new Date().getFullYear()} Cookknow, Inc. All rights reserved.
      </Text>

      {/* <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="#"
          aria-label="LinkedIn"
          icon={<BellIcon fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="GitHub"
          icon={<BellIcon fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Twitter"
          icon={<BellIcon fontSize="1.25rem" />}
        />
      </ButtonGroup> */}
    </Stack>
  </Container>
);
