import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage } from "@/app/login/LoginPage";
import { HomePage } from "@/app/home/HomePage";
import MainPage from "@/app/MainPage.tsx"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
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
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
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
