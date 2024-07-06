import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "@/app/MainPage.tsx"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
import { DefaultLayout } from "@/layout/default.tsx";
import Staging from "@/app/test/Staging.tsx";

const routerChildren = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: '/staging',
    element: <Staging/>
  }
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
