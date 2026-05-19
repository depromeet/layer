import { createBrowserRouter, RouterProvider, RouteObject, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { Error } from "@/app/mobile/error/404";

import MobileGlobalLayout from "@/layout/MobileGlobalLayout";
import { HomeLayout } from "@/layout/HomeLayout";
import { RequireLoginLayout } from "@/layout/RequireLoginLayout";
import ChannelService from "@/lib/channel-talk/service";
import DesktopGlobalLayout from "@/layout/DesktopGlobalLayout";
import DesktopHomeLayout from "@/layout/DesktopHomeLayout";
import { getDeviceType, markDeviceTypeOnHtml } from "@/utils/deviceUtils";
import { HomePage } from "@/app/desktop/home/HomePage";
import { RetrospectViewPage } from "@/app/mobile/home/RetrospectViewPage";

// 라우트 경로 단일 소스 — server/server.cjs와 공유
import { ROUTES, toChildPath } from "../../routes.cjs";

// 페이지 컴포넌트 lazy loading
const lazyNamed = <T extends Record<string, any>>(factory: () => Promise<T>, name: keyof T) =>
  lazy(() => factory().then((m) => ({ default: m[name] as React.ComponentType<any> })));

// 모바일 - 액션 아이템
const ActionItemEditPage = lazyNamed(() => import("@/app/mobile/actionItem/ActionItemEditPage"), "ActionItemEditPage");
const ActionItemMorePage = lazyNamed(() => import("@/app/mobile/actionItem/ActionItemMorePage"), "ActionItemMorePage");

// 모바일 - 홈
const AnalysisViewPage = lazyNamed(() => import("@/app/mobile/home/AnalysisViewPage"), "AnalysisViewPage");
const GoalViewPage = lazyNamed(() => import("@/app/mobile/home/GoalViewPage"), "GoalViewPage");

// 모바일 - 내 정보
const FeedbackPage = lazyNamed(() => import("@/app/mobile/info/FeedBackPage"), "FeedbackPage");
const HelpPage = lazyNamed(() => import("@/app/mobile/info/HelpPage"), "HelpPage");
const LicensePage = lazyNamed(() => import("@/app/mobile/info/LicensePage"), "LicensePage");
const ModifyMyInfo = lazyNamed(() => import("@/app/mobile/info/ModifyMyInfo"), "ModifyMyInfo");
const MyInfo = lazyNamed(() => import("@/app/mobile/info/MyInfo"), "MyInfo");
const NoticePage = lazyNamed(() => import("@/app/mobile/info/NoticePage"), "NoticePage");
const PrivacyPolicyPage = lazyNamed(() => import("@/app/mobile/info/PrivacyPolicyPage"), "PrivacyPolicyPage");
const TermsOfServicePage = lazyNamed(() => import("@/app/mobile/info/TermsOfServicePage"), "TermsOfServicePage");
const UserDeletion = lazyNamed(() => import("@/app/mobile/info/UserDeletion"), "UserDeletion");

// 모바일 - 로그인
const GoogleLoginRedirection = lazyNamed(() => import("@/app/mobile/login/GoogleLoginRedirection"), "GoogleLoginRedirection");
const KakaoLoginRedirection = lazyNamed(() => import("@/app/mobile/login/KakaoLoginRedirection"), "KakaoLoginRedirection");
const LoginPage = lazyNamed(() => import("@/app/mobile/login/LoginPage"), "LoginPage");
const SetNickNamePage = lazyNamed(() => import("@/app/mobile/login/SetNicknamePage"), "SetNickNamePage");

// 모바일 - 회고 분석/템플릿
const RetrospectAnalysisPage = lazyNamed(() => import("@/app/mobile/retrospect/analysis/RetrospectAnalysisPage"), "RetrospectAnalysisPage");
const TemplateListPage = lazyNamed(() => import("@/app/mobile/retrospect/template/list/TemplateListPage"), "TemplateListPage");
const RecommendDonePage = lazyNamed(() => import("@/app/mobile/retrospect/template/recommend/RecommendDonePage"), "RecommendDonePage");
const RecommendSearch = lazyNamed(() => import("@/app/mobile/retrospect/template/recommend/RecommendSearch"), "RecommendSearch");
const RecommendTemplatePage = lazyNamed(() => import("@/app/mobile/retrospect/template/recommend/RecommendTemplatePage"), "RecommendTemplatePage");

// 모바일 - 회고 생성
const RetrospectCreate = lazyNamed(() => import("@/app/mobile/retrospectCreate/RetrospectCreate"), "RetrospectCreate");
const RetrospectCreateComplete = lazyNamed(() => import("@/app/mobile/retrospectCreate/RetrospectCreateComplete"), "RetrospectCreateComplete");

// 모바일 - 스페이스
const CreateDonePage = lazyNamed(() => import("@/app/mobile/space/CreateDonePage"), "CreateDonePage");
const CreateNextPage = lazyNamed(() => import("@/app/mobile/space/CreateNextPage"), "CreateNextPage");
const CreateSpacePage = lazyNamed(() => import("@/app/mobile/space/CreateSpacePage"), "CreateSpacePage");
const SpaceEditPage = lazyNamed(() => import("@/app/mobile/space/edit/SpaceEditPage"), "SpaceEditPage");
const JoinMobileSpacePage = lazyNamed(() => import("@/app/mobile/space/JoinSpacePage"), "JoinSpacePage");
const MembersEditListPage = lazyNamed(() => import("@/app/mobile/space/members/MembersEditListPage"), "MembersEditListPage");
const MembersListPage = lazyNamed(() => import("@/app/mobile/space/members/MembersListPage"), "MembersListPage");
const SpaceViewPage = lazyNamed(() => import("@/app/mobile/space/SpaceViewPage"), "SpaceViewPage");
const TemplatePage = lazyNamed(() => import("@/app/mobile/template/TemplatePage"), "TemplatePage");

// 모바일 - 회고 작성
const RetrospectWriteCompletePage = lazyNamed(() => import("@/app/mobile/write/RetrospectWriteCompletePage"), "RetrospectWriteCompletePage");
const RetrospectWritePage = lazyNamed(() => import("@/app/mobile/write/RetrospectWritePage"), "RetrospectWritePage");

// 모바일 - 스테이징
const Staging = lazy(() => import("@/app/test/Staging.tsx"));

// 데스크탑 페이지
const DesktopLoginPage = lazy(() => import("@/app/desktop/login/DesktopLoginPage"));
const DesktopSetNickNamePage = lazy(() => import("@/app/desktop/login/DesktopSetNickNamePage"));
const RetroSpectSpacePage = lazy(() => import("@/app/desktop/retrospectSpace/RetroSpectSpacePage"));
const AnalysisPage = lazy(() => import("@/app/desktop/retrospect/AnalysisPage"));
const RetroSpectWritePage = lazy(() => import("@/app/desktop/retrospectWrite/RetrospectWritePage"));
const JoinDesktopSpacePage = lazyNamed(() => import("@/app/desktop/space/members/JoinSpacePage"), "JoinSpacePage");

type RouteChildren = {
  auth: boolean;
  deviceType?: "mobile" | "desktop";
} & RouteObject;

const { isDesktop } = getDeviceType();

const withSuspense = (element: React.ReactNode) => <Suspense fallback={null}>{element}</Suspense>;

// 공통 라우트 (모바일/데스크탑 구분 없음)
const commonRoutes: RouteChildren[] = [
  {
    path: toChildPath(ROUTES.OAUTH_KAKAO),
    element: withSuspense(<KakaoLoginRedirection />),
    auth: false,
  },
  {
    path: toChildPath(ROUTES.OAUTH_GOOGLE),
    element: withSuspense(<GoogleLoginRedirection />),
    auth: false,
  },
  {
    path: toChildPath(ROUTES.SPACE_JOIN),
    element: isDesktop ? withSuspense(<JoinDesktopSpacePage />) : withSuspense(<JoinMobileSpacePage />),
    auth: false,
  },
];

// 모바일/데스크탑별 라우트
const deviceSpecificRoutes: RouteChildren[] = [
  // 홈 관련 라우트 - 모바일
  {
    path: toChildPath(ROUTES.ROOT),
    element: <HomeLayout />,
    children: [
      {
        path: toChildPath(ROUTES.ROOT),
        element: <RetrospectViewPage />,
      },
      {
        path: toChildPath(ROUTES.ANALYSIS),
        element: withSuspense(<AnalysisViewPage />),
      },
      {
        path: toChildPath(ROUTES.GOALS),
        element: withSuspense(<GoalViewPage />),
      },
    ],
    auth: true,
    deviceType: "mobile",
  },
  // 홈 관련 라우트 - 데스크탑
  {
    path: toChildPath(ROUTES.ROOT),
    element: <DesktopHomeLayout />,
    children: [
      {
        path: toChildPath(ROUTES.ROOT),
        element: <HomePage />,
      },
      {
        path: toChildPath(ROUTES.GOALS),
        element: <div>Desktop Goals</div>,
      },
      {
        path: toChildPath(ROUTES.SPACE_VIEW),
        element: withSuspense(<RetroSpectSpacePage />),
      },
      {
        path: toChildPath(ROUTES.RETROSPECT_ANALYSIS),
        element: withSuspense(<AnalysisPage />),
      },
      {
        path: toChildPath(ROUTES.RETROSPECT_WRITE),
        element: withSuspense(<RetroSpectWritePage />),
      },
    ],
    auth: true,
    deviceType: "desktop",
  },
  // 로그인 관련
  {
    path: toChildPath(ROUTES.LOGIN),
    element: withSuspense(<LoginPage />),
    auth: false,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.LOGIN),
    element: withSuspense(<DesktopLoginPage />),
    auth: false,
    deviceType: "desktop",
  },
  // 회고 작성 - 모바일
  {
    path: toChildPath(ROUTES.WRITE),
    element: withSuspense(<RetrospectWritePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.WRITE_COMPLETE),
    element: withSuspense(<RetrospectWriteCompletePage />),
    auth: true,
    deviceType: "mobile",
  },

  // 템플릿 - 모바일
  {
    path: toChildPath(ROUTES.TEMPLATE),
    element: withSuspense(<TemplatePage />),
    auth: false,
    deviceType: "mobile",
  },

  // 스테이징 - 모바일
  {
    path: toChildPath(ROUTES.STAGING),
    element: withSuspense(<Staging />),
    auth: false,
    deviceType: "mobile",
  },
  // 닉네임 설정 - 모바일
  {
    path: toChildPath(ROUTES.SETNICKNAME),
    element: withSuspense(<SetNickNamePage />),
    auth: false,
    deviceType: "mobile",
  },
  // 닉네임 설정 - 데스크탑
  {
    path: toChildPath(ROUTES.SETNICKNAME),
    element: withSuspense(<DesktopSetNickNamePage />),
    auth: false,
    deviceType: "desktop",
  },

  // 스페이스 관련 - 모바일
  {
    path: toChildPath(ROUTES.SPACE_CREATE),
    element: withSuspense(<CreateSpacePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_CREATE_DONE),
    element: withSuspense(<CreateDonePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_CREATE_NEXT),
    element: withSuspense(<CreateNextPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_EDIT),
    element: withSuspense(<SpaceEditPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_VIEW),
    element: withSuspense(<SpaceViewPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_TEMPLATES),
    element: withSuspense(<TemplateListPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_MEMBERS),
    element: withSuspense(<MembersListPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.SPACE_MEMBERS_EDIT),
    element: withSuspense(<MembersEditListPage />),
    auth: true,
    deviceType: "mobile",
  },

  // 회고 생성 - 모바일
  {
    path: toChildPath(ROUTES.RETROSPECT_NEW),
    element: withSuspense(<RetrospectCreate />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.RETROSPECT_COMPLETE),
    element: withSuspense(<RetrospectCreateComplete />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.RETROSPECT_RECOMMEND),
    element: withSuspense(<RecommendTemplatePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.RETROSPECT_RECOMMEND_SEARCH),
    element: withSuspense(<RecommendSearch />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.RETROSPECT_RECOMMEND_DONE),
    element: withSuspense(<RecommendDonePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.RETROSPECT_ANALYSIS),
    element: withSuspense(<RetrospectAnalysisPage />),
    auth: true,
    deviceType: "mobile",
  },

  // 내 정보 - 모바일
  {
    path: toChildPath(ROUTES.MYINFO),
    element: withSuspense(<MyInfo />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_MODIFY),
    element: withSuspense(<ModifyMyInfo />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_USERDELETION),
    element: withSuspense(<UserDeletion />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_NOTICES),
    element: withSuspense(<NoticePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_HELP),
    element: withSuspense(<HelpPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_LICENSE),
    element: withSuspense(<LicensePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_TERMSOFSERVICE),
    element: withSuspense(<TermsOfServicePage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_PRIVACYPOLICY),
    element: withSuspense(<PrivacyPolicyPage />),
    auth: true,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.MYINFO_FEEDBACK),
    element: withSuspense(<FeedbackPage />),
    auth: true,
    deviceType: "mobile",
  },

  // 목표/액션 아이템 - 모바일
  {
    path: toChildPath(ROUTES.GOALS_MORE),
    element: withSuspense(<ActionItemMorePage />),
    auth: false,
    deviceType: "mobile",
  },
  {
    path: toChildPath(ROUTES.GOALS_EDIT),
    element: withSuspense(<ActionItemEditPage />),
    auth: false,
    deviceType: "mobile",
  },

  // 404 에러
  {
    path: "*",
    element: <Error />,
    auth: false,
    deviceType: "mobile",
  },
  {
    path: "*",
    element: <Error />,
    auth: false,
    deviceType: "desktop",
  },
];

// 디바이스 타입별로 라우트 필터링 + 공통 라우트 추가
const getRoutesByDeviceType = (deviceType: "mobile" | "desktop") => {
  const deviceRoutes = deviceSpecificRoutes.filter((route) => route.deviceType === deviceType);
  return [...deviceRoutes, ...commonRoutes];
};

// 라우트에 인증 레이아웃 적용
const createRouterChildren = (routes: RouteChildren[]) => {
  return routes.map(({ path, element, auth, children }) => ({
    path,
    element: auth ? <RequireLoginLayout>{element}</RequireLoginLayout> : element,
    children: children?.map((child) => ({
      path: child.path,
      element: auth ? <RequireLoginLayout>{child.element}</RequireLoginLayout> : child.element,
    })),
  }));
};

const router = ({ layoutType }: { layoutType: "mobile" | "desktop" }) => {
  const routes = getRoutesByDeviceType(layoutType);
  const routerChildren = createRouterChildren(routes);

  if (layoutType === "mobile") {
    return createBrowserRouter([
      {
        path: "/desktop/*",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/",
        element: <MobileGlobalLayout />,
        errorElement: <Error />,
        children: routerChildren,
      },
      {
        path: "*",
        element: <MobileGlobalLayout />,
        errorElement: <Error />,
        children: commonRoutes.map((route) => ({
          path: route.path,
          element: route.auth ? <RequireLoginLayout>{route.element}</RequireLoginLayout> : route.element,
        })),
      },
    ]);
  } else {
    return createBrowserRouter([
      {
        path: "/*",
        element: <Navigate to="/desktop" replace />,
      },
      {
        path: "/desktop",
        element: <DesktopGlobalLayout />,
        errorElement: <Error />,
        children: routerChildren,
      },
      {
        path: "*",
        element: <DesktopGlobalLayout />,
        errorElement: <Error />,
        children: commonRoutes.map((route) => ({
          path: route.path,
          element: route.auth ? <RequireLoginLayout>{route.element}</RequireLoginLayout> : route.element,
        })),
      },
    ]);
  }
};

export const Routers = () => {
  const { deviceType } = getDeviceType();
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: import.meta.env.VITE_CHANNELTALK_PLUGIN_KEY,
  });

  useEffect(() => {
    // html 태그에 현재 data-device 타입을 명시해줘요
    markDeviceTypeOnHtml();
  }, []);

  return <RouterProvider router={router({ layoutType: deviceType })} />;
};
