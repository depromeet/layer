export const loginTypeProvider = {
  apple: "애플",
  google: "구글",
  kakao: "카카오",
};

// FIXME : 버튼 색 수정 필요
export const backgroundColors: Record<keyof typeof loginTypeProvider, string> = {
  kakao: "#ffe400",
  google: "#FFFFFF",
  apple: "red",
};

type loginProvider = keyof typeof loginTypeProvider;

export type loginType = {
  type: loginProvider;
};

export type loginBtnProps = {
  type: loginProvider;
  handler: () => void;
};

export type KakaoLoginResponse = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

export type SignUpResponse = {
  memberId: number;
  name: string;
  email: string;
  memberRole: string;
  socialId: string;
  socialType: string;
} | null;

export type SignInReturn = {
  status: number;
  data: {
    memberId: number;
    accessToken: string;
    refreshToken: string;
    memberRole: "USER" | "ADMIN";
  } | null;
};

export type SignInResponse = {
  memberId: number;
  accessToken: string;
  refreshToken: string;
  memberRole: "USER" | "ADMIN";
} | null;

export type LoginKakaoResult =
  | { status: "loginSuccess"; response: SignInResponse | null }
  | { status: "signupSuccess"; response: SignUpResponse | null }
  | { status: "error"; response: null };
