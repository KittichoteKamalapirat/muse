import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import React from "react";
import "../components/App.css";

function MyApp({ Component, pageProps }: any) {
  console.log("NEXT JS on", process.env.NODE_ENV, "environment");
  console.log("API URL:", process.env.NEXT_PUBLIC_SERVER_URL);
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

// export default MyApp;
export default MyApp;
