import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

interface TemplateTipInfoProps {
  tipTitle: string;
  tipDescription: string;
}

function TemplateTipInfo({ tipTitle, tipDescription }: TemplateTipInfoProps) {
  return (
    <div
      css={css`
        margin-top: 4rem;
      `}
    >
      {/* ---------- 탭 UI ---------- */}
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon icon="ic_recommend_color" size={2.4} />
        <p
          css={css`
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 150%;
            margin-left: 0.4rem;
            color: ${DESIGN_TOKEN_COLOR.gray800};
          `}
        >
          회고 작성 Tip
        </p>
      </div>
      <div
        css={css`
          margin-top: 1.6rem;
          background-color: #f6f8fc;
          border-radius: 0.8rem;
          padding: 1.4rem 2rem;
          font-size: 1.4rem;
        `}
      >
        <p
          css={css`
            font-weight: 600;
            line-height: 140%;
            color: ${DESIGN_TOKEN_COLOR.gray800};
          `}
        >
          {tipTitle}
        </p>
        <p
          css={css`
            font-weight: 500;
            line-height: 160%;
            color: ${DESIGN_TOKEN_COLOR.gray700};
            margin-top: 0.8rem;
            word-wrap: break-word;
            word-break: keep-all;
          `}
        >
          {tipDescription}
        </p>
      </div>
    </div>
  );
}

export default TemplateTipInfo;
