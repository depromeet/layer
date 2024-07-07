export const loginTypeProvider = {
  apple: "애플",
  google: "구글",
  kakao: "카카오",
};

type loginProvider = keyof typeof loginTypeProvider;

export type loginType = {
  type: loginProvider;
};

export type loginBtnType = {
  type: loginProvider;
  handler: () => void;
};
