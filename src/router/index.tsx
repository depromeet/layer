import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage } from "@/app/login/LoginPage";
import MainPage from "@/app/MainPage.tsx"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
import Staging from "@/app/test/Staging.tsx";
import GlobalLayout from "@/layout/GlobalLayout.tsx";
import { CreateSpacePage } from "@/app/space/CreateSpacePage";
import { CreateDonePage } from "@/app/space/CreateDonePage";

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
    path: "/space/create",
    element: <CreateSpacePage />,
  },
  {
    path: "/space/create/done",
    element: <CreateDonePage />,
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
