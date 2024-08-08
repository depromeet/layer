export const patterns = {
  NO_SPECIAL_CHARS: {
    pattern: /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/,
    errorMsg: "특수문자는 입력이 불가해요",
  },
  ONLY_KO: {
    pattern: /^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/,
    errorMsg: "한글만 입력이 가능해요",
  },
};
