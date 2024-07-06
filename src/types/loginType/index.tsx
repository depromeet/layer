export type loginType = {
  type: "google" | "kakao";
};

export type loginBtnType = {
  type: "google" | "kakao";
  handler: () => void;
};
