import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export const loginTypeProvider = {
  apple: "애플",
  google: "구글",
  kakao: "카카오",
};

type loginProvider = keyof typeof loginTypeProvider;

export const backgroundColors: Record<loginProvider, string> = {
  kakao: "#ffe400",
  google: DESIGN_TOKEN_COLOR.gray00,
  apple: DESIGN_TOKEN_COLOR.gray100,
};

export type loginType = {
  type: loginProvider;
};

export type SocialLoginButtonProps = {
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

export type GoogleLoginResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token?: string;
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
  imageUrl: string;
} | null;

export type AuthApiReturn = {
  status: number;
  data: AuthResponse;
};
export type LoginKakaoResult = { status: number; response: AuthResponse | null };

export type MemberInfo = {
  memberId: string;
  name: string;
  email: string;
  memberRole: string;
  socialId: string;
  socialType: SocialLoginKind;
  imageUrl: string;
};

export type LoginKindType = {
  socialType: "kakao" | "google";
};

export type SocialLoginKind = "kakao" | "google" | "apple";
