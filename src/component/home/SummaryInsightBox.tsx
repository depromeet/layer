import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@/config/paths";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { authAtom } from "@/store/auth/authAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function SummaryInsightBox() {
  return (
    <div
      css={css`
        width: 100%;
        box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        padding: 2.2rem 2rem;
      `}
    >
      <SummaryInsightIntro insight={["회의 내용 문서화", "회의 내용 문서화", "회의 내용 문서화", "회의 내용 문서화"]} />
      <div
        css={css`
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <InsightBox />
        <InsightBox />
      </div>
    </div>
  );
}

function SummaryInsightIntro({ insight }: { insight: string[] }) {
  const [auth] = useAtom(authAtom);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      `}
    >
      <Typography variant="title18Bold">최근 회고에서 {auth.name}님은 </Typography>
      {insight.length == 1 && (
        <>
          <Typography variant="title18Bold">
            <BlueTextBox>{insight[0]}</BlueTextBox> 을 가장 잘 하고 있어요
          </Typography>
        </>
      )}

      {insight.length >= 2 && (
        <>
          <Typography variant="title18Bold">
            {insight.map((v, idx) => (
              <span
                key={idx}
                css={css`
                  line-height: 1.8;
                `}
              >
                <BlueTextBox>{v}</BlueTextBox>
                {idx < insight.length - 1 && idx === insight.length - 2 ? " 와 " : idx < insight.length - 2 ? " , " : " "}
              </span>
            ))}
            을
          </Typography>
          <Typography variant="title18Bold">가장 잘 하고 있어요</Typography>
        </>
      )}
    </div>
  );
}

function BlueTextBox({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="title16Bold"
      color="blue600"
      css={css`
        height: 3rem;
        border: 0.86px solid ${DESIGN_TOKEN_COLOR.blue400};
        border-radius: 0.5rem;
        padding: 0.4rem 0.6rem;
        white-space: nowrap;
      `}
    >
      {children}
    </Typography>
  );
}

function InsightBox() {
  const navigate = useNavigate();
  const goAnalysisPage = () => {
    navigate(PATHS.retrospectAnalysis("11", 11));
  };

  return (
    <div
      onClick={goAnalysisPage}
      css={css`
        width: 100%;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        padding: 1.2rem 1.6rem 1.2rem 2rem;
        border-radius: 1.2rem;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1.5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={css`
              background-color: ${DESIGN_TOKEN_COLOR.gray800};
              border-radius: 100%;
              width: 1.6rem;
              height: 1.6rem;
              display: flex;
              justify-content: center;
              align-content: center;
            `}
          >
            <Icon
              icon="ic_check"
              size={1.2}
              color={DESIGN_TOKEN_COLOR.gray00}
              css={css`
                padding-top: 0.1rem;
              `}
            />
          </div>
        </div>
        <div
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          `}
        >
          <Typography variant="subtitle16SemiBold" color="gray900">
            회의 내용 문서화
          </Typography>
          <Typography variant="body13Medium" color="gray500">
            중간발표 이후 회고 | 떡잎마을 방법대
          </Typography>
        </div>
      </div>
      <Icon icon="ic_after" size={1.6} color={DESIGN_TOKEN_COLOR.gray900} />
    </div>
  );
}
