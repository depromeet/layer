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

export type AuthResponse = {
  memberId: number;
  name: string;
  email: string;
  memberRole: "USER" | "ADMIN";
  socialId: string;
  socialType: string;
  accessToken: string;
  refreshToken: string;
} | null;

export type AuthApiReturn = {
  status: number;
  data: AuthResponse | null;
};

export type LoginKakaoResult = { status: number; response: AuthResponse | null };

export type MemberInfo = {
  memberId: string;
  name: string;
  email: string;
  memberRole: string;
  socialId: string;
  socialType: "KAKAO" | "Google";
};
