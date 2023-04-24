import { extendTheme } from "@chakra-ui/react";
import { accordionTheme } from "./chakra/accordion";

export const theme = extendTheme({
  components: { Accordion: accordionTheme },
});
