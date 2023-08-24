"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const recoil_1 = require("recoil");
const react_query_1 = require("react-query");
const react_2 = require("@chakra-ui/react");
const RecoilExternalStatePortal_1 = require("./RecoilExternalStatePortal");
const chakraTheme_1 = require("./chakraTheme");
const App_1 = __importDefault(require("./App"));
const client = new react_query_1.QueryClient();
react_dom_1.default.render(<react_1.default.StrictMode>
    <recoil_1.RecoilRoot>
      <RecoilExternalStatePortal_1.RecoilExternalStatePortal />
      <react_2.ChakraProvider theme={chakraTheme_1.theme}>
        <react_query_1.QueryClientProvider client={client}>
          <App_1.default />
        </react_query_1.QueryClientProvider>
      </react_2.ChakraProvider>
    </recoil_1.RecoilRoot>
  </react_1.default.StrictMode>, document.getElementById("root"));
