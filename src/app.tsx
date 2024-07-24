import "@/style/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
//import { DevTools } from "jotai-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import { Routers } from "./router";

import { queryClient } from "@/lib/tanstack-query/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <DevTools /> */}
      <Routers />
    </QueryClientProvider>
  </React.StrictMode>,
);
