import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: "#fff", // change the backgroundColor of the container
    borderRadius: "10px",
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });
