import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// const fonts = { mono: `'Menlo', monospace` }
const fonts = { mono: `'Mulish', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button", "Badge"],
  }),
  {
    //global styles
    styles: {
      a: {
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: "20px",
          bgColor: "brand",
          color: "white",
        },
        variants: {
          transparent: (props: any) => ({
            bg: "transparent",
            color: "black",
          }),
        },
      },
    },
    colors: {
      black: "#16161D",
      brand: "#3dc795",
      brandHover: "#26d997",
      brandHoverPale: "#eaf9f4",
      action: "#3dc795",
      alert: "#EB5757",
      inputLabel: "#4f4c4d",
      gray: {
        50: "#f7fafc",
        100: "#EDF2F7",
        200: "#E2E8F0",
        300: "#CBD5E0",
        400: "#A0AEC0",
        500: "#718096",
        600: "#4A5568",
        700: "#2D3748",
        800: "#1A202C",
        900: "#171923",
      },
    },

    fonts,
    breakpoints,
    icons: {
      logo: {
        path: (
          <svg
            width="3000"
            height="3163"
            viewBox="0 0 3000 3163"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="3000" height="3162.95" fill="none" />
            <path
              d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
              fill="currentColor"
            />
          </svg>
        ),
        viewBox: "0 0 3000 3163",
      },
    },
  }
);

export default theme;
