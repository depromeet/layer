import "@/style/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DevTools } from "jotai-devtools";

import { Routers } from "./router";

import { queryClient } from "@/lib/tanstack-query/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DevTools />
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
