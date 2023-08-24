"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accordionTheme = void 0;
const anatomy_1 = require("@chakra-ui/anatomy");
const react_1 = require("@chakra-ui/react");
const { definePartsStyle, defineMultiStyleConfig } = (0, react_1.createMultiStyleConfigHelpers)(anatomy_1.accordionAnatomy.keys);
let isDark = false;
try {
    const rp = JSON.parse(localStorage.getItem("recoil-persist"));
    isDark = rp.isDark;
}
catch (error) {
    // console.log(error);
}
// console.log(isDark);
const baseStyle = definePartsStyle({
    container: {
        bg: isDark ? "#2F2F2F" : "#fff",
        color: isDark ? "#fff" : "#2F2F2F",
        borderRadius: "10px",
    },
});
exports.accordionTheme = defineMultiStyleConfig({ baseStyle });
