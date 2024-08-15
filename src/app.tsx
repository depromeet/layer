import "@/style/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
// import { DevTools } from "jotai-devtools";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { LoadingModal } from "./component/common/Modal/LoadingModal";
import { Routers } from "./router";

import { Modal } from "@/component/common/Modal";
import { Toast } from "@/component/common/Toast";
import { queryClient } from "@/lib/tanstack-query/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingModal purpose={"데이터를 가져오고 있어요"} />}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* <DevTools /> */}
        <Routers />
        <Toast />
        <Modal />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
);
