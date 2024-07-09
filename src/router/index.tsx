import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "@/app/MainPage.tsx"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
import Login from "@/app/login/Login";
import Staging from "@/app/test/Staging.tsx";
import GlobalLayout from "@/layout/GlobalLayout.tsx";

const routerChildren = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/staging",
    element: <Staging />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <Fragment />,
    children: routerChildren,
  },
]);
export const Routers = () => {
  return <RouterProvider router={router} />;
};
