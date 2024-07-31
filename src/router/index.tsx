import { Fragment } from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";

import { AnalysisViewPage } from "@/app/home/AnalysisViewPage";
import { GoalViewPage } from "@/app/home/GoalViewPage";
import { HomePage } from "@/app/home/HomePage";
import { RetrospectViewPage } from "@/app/home/RetrospectViewPage";
import { KaKaoRedirection } from "@/app/login/KakaoLoginRedirection";
import { LoginPage } from "@/app/login/LoginPage";
import { SetNickNamePage } from "@/app/login/SetNicknamePage";
import MainPage from "@/app/MainPage.tsx"; /* FIXME - 실제 메인 페이지 작성 후 대체해주세요. */
import Staging from "@/app/test/Staging.tsx";
import { RetrospectWriteCompletePage } from "@/app/write/RetrospectWriteCompletePage.tsx";
import { RetrospectWritePage } from "@/app/write/RetrospectWritePage.tsx";
import GlobalLayout from "@/layout/GlobalLayout.tsx";
import { RequireLoginLayout } from "@/layout/RequireLoginLayout";

type RouteChildren = {
  auth: boolean;
} & RouteObject;

const routerChildren: RouteChildren[] = [
  {
    path: "/",
    element: <MainPage />,
    auth: false,
  },
  {
    path: "/write",
    element: <RetrospectWritePage />,
    auth: false,
  },
  {
    path: "/write/complete",
    element: <RetrospectWriteCompletePage />,
    auth: false,
  },
  {
    path: "/staging",
    element: <Staging />,
    auth: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    auth: false,
  },
  {
    path: "/setnickname",
    element: <SetNickNamePage />,
    auth: false,
  },
  {
    path: "/home",
    element: <HomePage />,
    auth: true,
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
  { path: "/api/auth/oauth2/kakao", element: <KaKaoRedirection />, auth: false },
];

const browserRouter = routerChildren.map(({ path, element, auth, children }) => {
  return {
    path,
    element: auth ? <RequireLoginLayout>{element}</RequireLoginLayout> : element,
    children: children?.map((child) => ({
      path: child.path,
      element: auth ? <RequireLoginLayout>{child.element}</RequireLoginLayout> : child.element,
    })),
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <Fragment />,
    children: browserRouter,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
