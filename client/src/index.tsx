import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilExternalStatePortal } from "./RecoilExternalStatePortal";
import App from "./App";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilExternalStatePortal />
      <ChakraProvider>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
