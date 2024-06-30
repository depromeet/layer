import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "@/component/MainPage"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
import { DefaultLayout } from "@/layout/default.tsx";

const routerChildren = [
  {
    path: "/",
    element: <MainPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Fragment />,
    children: routerChildren,
  },
]);
export const Routers = () => {
  return <RouterProvider router={router} />;
};
