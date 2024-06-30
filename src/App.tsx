import "@/style/global.css";
import { QueryClientProvider } from "@tanstack/react-query";

import { Routers } from "./router";

import { queryClient } from "@/lib/tanstack-query/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
