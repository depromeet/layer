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

export type loginBtnProps = {
  type: loginProvider;
  handler: () => void;
};
