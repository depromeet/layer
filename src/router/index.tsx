import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AnalysisViewPage } from "@/app/home/AnalysisViewPage";
import { GoalViewPage } from "@/app/home/GoalViewPage";
import { HomePage } from "@/app/home/HomePage";
import { RetrospectViewPage } from "@/app/home/RetrospectViewPage";
import { LoginPage } from "@/app/login/LoginPage";
import MainPage from "@/app/MainPage.tsx"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
import { RetrospectCreate } from "@/app/retrospectCreate/RetrospectCreate";
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
    children: [
      {
        path: "analysis",
        element: <AnalysisViewPage />,
      },
      {
        path: "goals",
        element: <GoalViewPage />,
      },
      {
        path: "retrospect",
        element: <RetrospectViewPage />,
      },
    ],
  },
  {
    path: "retrospect",
    children: [{ path: "new", element: <RetrospectCreate /> }],
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
