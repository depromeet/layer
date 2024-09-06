import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { InfoBox } from "./InfoBox";

import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function VersionBox() {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        width: 100%;
        height: auto;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        box-shadow: 0rem 0.4rem 1.2rem 0rem #06080c0a;
        padding: 2rem;
        padding-right: 2.2rem;
        padding-bottom: 1.2rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <Typography
        variant="subtitle14SemiBold"
        color="gray600"
        css={css`
          margin-bottom: 0.8rem;
        `}
      >
        버전
      </Typography>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <InfoBox
          content="공지사항"
          onClick={() => {
            navigate(PATHS.notices());
          }}
        />
        <InfoBox
          content="도움말"
          onClick={() => {
            navigate(PATHS.help());
          }}
        />
        <div
          css={css`
            width: 100%;
            height: 4.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Typography variant="body16Medium">현재버전</Typography>
          <Typography variant="body16Medium" color="gray600">
            {APP_VERSION.split("-")[0]}
          </Typography>
        </div>
        <InfoBox
          content="평가 및 피드백"
          onClick={() => {
            navigate(PATHS.feedback());
          }}
        />
      </div>
    </div>
  );
}
