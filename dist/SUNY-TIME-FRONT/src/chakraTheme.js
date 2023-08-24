"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
const react_1 = require("@chakra-ui/react");
const accordion_1 = require("./chakra/accordion");
exports.theme = (0, react_1.extendTheme)({
    components: { Accordion: accordion_1.accordionTheme },
});
