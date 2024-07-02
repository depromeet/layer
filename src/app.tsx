import "@/style/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DevTools } from "jotai-devtools";

import { Routers } from "./router";

import { queryClient } from "@/lib/tanstack-query/queryClient";

import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <DevTools />
            <Routers />
        </QueryClientProvider>
    </React.StrictMode>,
);
