import { css } from "@emotion/react";
import { RetrospectProceed } from "@/types/retrospect";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function ProceedingTextBox({ writeStatus, analysisStatus }: RetrospectProceed) {
  // 상태에 따라 스타일 및 텍스트 설정
  let proceedStyle;

  switch (true) {
    case analysisStatus === "DONE":
      proceedStyle = proceedStyles.ANALYZED;
      break;
    case analysisStatus === "PROCEEDING":
      proceedStyle = proceedStyles.ANALYZING;
      break;
    case writeStatus === "NOT_STARTED":
      proceedStyle = proceedStyles.NOT_STARTED;
      break;
    case writeStatus === "PROCEEDING":
      proceedStyle = proceedStyles.WRITING;
      break;
    case writeStatus === "DONE":
      proceedStyle = proceedStyles.COMPLETED;
      break;
    default:
      proceedStyle = proceedStyles.NOT_STARTED;
  }

  const { borderColor, backgroundColor, textColor, text } = proceedStyle;

  return (
    <Typography
      variant="body12SemiBold"
      css={css`
        width: fit-content;
        border-radius: 0.4rem;
        padding: 0.3rem 0.6rem;
        border: 1px solid ${borderColor};
        background-color: ${backgroundColor};
        color: ${textColor};
      `}
    >
      {text}
    </Typography>
  );
}

const proceedStyles = {
  NOT_STARTED: {
    borderColor: DESIGN_TOKEN_COLOR.gray400,
    backgroundColor: DESIGN_TOKEN_COLOR.gray200,
    textColor: DESIGN_TOKEN_COLOR.gray600,
    text: "작성 전",
  },
  WRITING: {
    borderColor: DESIGN_TOKEN_COLOR.blue300,
    backgroundColor: DESIGN_TOKEN_COLOR.blue200,
    textColor: DESIGN_TOKEN_COLOR.blue700,
    text: "작성 중",
  },
  COMPLETED: {
    borderColor: "#D3E1D3",
    backgroundColor: "#E7F6E6",
    textColor: "#034C0C",
    text: "제출 완료",
  },
  ANALYZING: {
    borderColor: DESIGN_TOKEN_COLOR.gray500,
    backgroundColor: "#2123291A",
    textColor: DESIGN_TOKEN_COLOR.gray900,
    text: "분석 중",
  },
  ANALYZED: {
    borderColor: DESIGN_TOKEN_COLOR.gray500,
    backgroundColor: "#2123291A",
    textColor: DESIGN_TOKEN_COLOR.gray900,
    text: "분석 완료",
  },
};
