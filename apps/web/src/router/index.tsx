import { createBrowserRouter, RouterProvider, RouteObject, Navigate } from "react-router-dom";

import { ActionItemEditPage } from "@/app/mobile/actionItem/ActionItemEditPage";
import { ActionItemMorePage } from "@/app/mobile/actionItem/ActionItemMorePage";
import { Error } from "@/app/mobile/error/404";
import { AnalysisViewPage } from "@/app/mobile/home/AnalysisViewPage";
import { GoalViewPage } from "@/app/mobile/home/GoalViewPage";
import { RetrospectViewPage } from "@/app/mobile/home/RetrospectViewPage";
import { FeedbackPage } from "@/app/mobile/info/FeedBackPage";
import { HelpPage } from "@/app/mobile/info/HelpPage";
import { LicensePage } from "@/app/mobile/info/LicensePage";
import { ModifyMyInfo } from "@/app/mobile/info/ModifyMyInfo";
import { MyInfo } from "@/app/mobile/info/MyInfo";
import { NoticePage } from "@/app/mobile/info/NoticePage";
import { PrivacyPolicyPage } from "@/app/mobile/info/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/app/mobile/info/TermsOfServicePage";
import { UserDeletion } from "@/app/mobile/info/UserDeletion";
import { GoogleLoginRedirection } from "@/app/mobile/login/GoogleLoginRedirection";
import { KakaoLoginRedirection } from "@/app/mobile/login/KakaoLoginRedirection";
import { LoginPage } from "@/app/mobile/login/LoginPage";
import { SetNickNamePage } from "@/app/mobile/login/SetNicknamePage";
import { RetrospectAnalysisPage } from "@/app/mobile/retrospect/analysis/RetrospectAnalysisPage";
import { TemplateListPage } from "@/app/mobile/retrospect/template/list/TemplateListPage";
import { RecommendDonePage } from "@/app/mobile/retrospect/template/recommend/RecommendDonePage";
import { RecommendSearch } from "@/app/mobile/retrospect/template/recommend/RecommendSearch";
import { RecommendTemplatePage } from "@/app/mobile/retrospect/template/recommend/RecommendTemplatePage";
import { RetrospectCreate } from "@/app/mobile/retrospectCreate/RetrospectCreate";
import { RetrospectCreateComplete } from "@/app/mobile/retrospectCreate/RetrospectCreateComplete";
import { CreateDonePage } from "@/app/mobile/space/CreateDonePage";
import { CreateNextPage } from "@/app/mobile/space/CreateNextPage";
import { CreateSpacePage } from "@/app/mobile/space/CreateSpacePage";
import { SpaceEditPage } from "@/app/mobile/space/edit/SpaceEditPage";
import { JoinSpacePage } from "@/app/mobile/space/JoinSpacePage";
import { MembersEditListPage } from "@/app/mobile/space/members/MembersEditListPage";
import { MembersListPage } from "@/app/mobile/space/members/MembersListPage";
import { SpaceViewPage } from "@/app/mobile/space/SpaceViewPage";
import { TemplatePage } from "@/app/mobile/template/TemplatePage";
import Staging from "@/app/test/Staging.tsx";
import { RetrospectWriteCompletePage } from "@/app/mobile/write/RetrospectWriteCompletePage";
import { RetrospectWritePage } from "@/app/mobile/write/RetrospectWritePage";
import MobileGlobalLayout from "@/layout/MobileGlobalLayout";
import { HomeLayout } from "@/layout/HomeLayout";
import { RequireLoginLayout } from "@/layout/RequireLoginLayout";
import ChannelService from "@/lib/channel-talk/service";
import { useDeviceType } from "@/hooks/useDeviceType";
import DesktopGlobalLayout from "@/layout/DesktopGlobalLayout";

type RouteChildren = {
  auth: boolean;
  deviceType?: "mobile" | "desktop";
} & RouteObject;

// 공통 라우트 (모바일/데스크탑 구분 없음)
const commonRoutes: RouteChildren[] = [
  {
    path: "api/auth/oauth2/kakao",
    element: <KakaoLoginRedirection />,
    auth: false,
  },
  {
    path: "api/auth/oauth2/google",
    element: <GoogleLoginRedirection />,
    auth: false,
  },
];

// 모바일/데스크탑별 라우트
const deviceSpecificRoutes: RouteChildren[] = [
  // 홈 관련 라우트 - 모바일
  {
    path: "",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <RetrospectViewPage />,
      },
      {
        path: "analysis",
        element: <AnalysisViewPage />,
      },
      {
        path: "goals",
        element: <GoalViewPage />,
      },
    ],
    auth: true,
    deviceType: "mobile",
  },
  // 홈 관련 라우트 - 데스크탑
  {
    path: "",
    element: <div>Desktop Home Layout</div>, // TODO: 데스크탑용 홈 레이아웃
    children: [
      {
        path: "",
        element: <div>Desktop Home</div>, // TODO: 데스크탑용 홈
      },
      {
        path: "analysis",
        element: <div>Desktop Analysis</div>, // TODO: 데스크탑용 분석
      },
      {
        path: "goals",
        element: <div>Desktop Goals</div>, // TODO: 데스크탑용 목표
      },
    ],
    auth: true,
    deviceType: "desktop",
  },

  // 로그인 관련
  {
    path: "login",
    element: <LoginPage />,
    auth: false,
    deviceType: "mobile",
  },
  {
    path: "login",
    element: <div>Desktop Login</div>, // TODO: 데스크탑용 로그인
    auth: false,
    deviceType: "desktop",
  },

  // 회고 작성 - 모바일
  {
    path: "write",
    element: <RetrospectWritePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "write/complete",
    element: <RetrospectWriteCompletePage />,
    auth: true,
    deviceType: "mobile",
  },

  // 템플릿 - 모바일
  {
    path: "template",
    element: <TemplatePage />,
    auth: false,
    deviceType: "mobile",
  },

  // 스테이징 - 모바일
  {
    path: "staging",
    element: <Staging />,
    auth: false,
    deviceType: "mobile",
  },

  // 닉네임 설정 - 모바일
  {
    path: "setnickname/:socialType",
    element: <SetNickNamePage />,
    auth: false,
    deviceType: "mobile",
  },

  // 스페이스 관련 - 모바일
  {
    path: "space/create",
    element: <CreateSpacePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/create/done",
    element: <CreateDonePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/create/next",
    element: <CreateNextPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/join/:id",
    element: <JoinSpacePage />,
    auth: false,
    deviceType: "mobile",
  },
  {
    path: "space/edit/:id",
    element: <SpaceEditPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/:spaceId",
    element: <SpaceViewPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/:spaceId/templates",
    element: <TemplateListPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/:spaceId/members",
    element: <MembersListPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "space/:spaceId/members/edit",
    element: <MembersEditListPage />,
    auth: true,
    deviceType: "mobile",
  },

  // 회고 생성 - 모바일
  {
    path: "retrospect/new",
    element: <RetrospectCreate />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "retrospect/complete",
    element: <RetrospectCreateComplete />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "retrospect/recommend",
    element: <RecommendTemplatePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "retrospect/recommend/search",
    element: <RecommendSearch />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "retrospect/recommend/done",
    element: <RecommendDonePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "retrospect/analysis",
    element: <RetrospectAnalysisPage />,
    auth: true,
    deviceType: "mobile",
  },

  // 내 정보 - 모바일
  {
    path: "myinfo",
    element: <MyInfo />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/modify",
    element: <ModifyMyInfo />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/userdeletion",
    element: <UserDeletion />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/notices",
    element: <NoticePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/help",
    element: <HelpPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/license",
    element: <LicensePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/termsofservice",
    element: <TermsOfServicePage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/privacypolicy",
    element: <PrivacyPolicyPage />,
    auth: true,
    deviceType: "mobile",
  },
  {
    path: "myinfo/feedback",
    element: <FeedbackPage />,
    auth: true,
    deviceType: "mobile",
  },

  // 목표/액션 아이템 - 모바일
  {
    path: "goals/more",
    element: <ActionItemMorePage />,
    auth: false,
    deviceType: "mobile",
  },
  {
    path: "goals/edit",
    element: <ActionItemEditPage />,
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
        path: "/",
        element: <Navigate to="/m" replace />,
      },
      {
        path: "/m",
        element: <MobileGlobalLayout />,
        errorElement: <Error />,
        children: routerChildren,
      },
      ...commonRoutes.map((route) => ({
        path: `/${route.path}`,
        element: route.auth ? <RequireLoginLayout>{route.element}</RequireLoginLayout> : route.element,
      })),
    ]);
  } else {
    return createBrowserRouter([
      {
        path: "/m/*",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/",
        element: <DesktopGlobalLayout />,
        errorElement: <Error />,
        children: routerChildren,
      },
      ...commonRoutes.map((route) => ({
        path: `/${route.path}`,
        element: route.auth ? <RequireLoginLayout>{route.element}</RequireLoginLayout> : route.element,
      })),
    ]);
  }
};

export const Routers = () => {
  const { deviceType } = useDeviceType();
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: import.meta.env.VITE_CHANNELTALK_PLUGIN_KEY,
  });
  return <RouterProvider router={router({ layoutType: deviceType })} />;
};
