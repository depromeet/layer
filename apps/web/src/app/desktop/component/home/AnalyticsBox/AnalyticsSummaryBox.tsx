import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

type AnalyticsSummaryBoxProps = {
  type: "good" | "bad" | "improvement";
};

export default function AnalyticsSummaryBox({ type }: AnalyticsSummaryBoxProps) {
  return (
    <section
      css={css`
        display: flex;
        align-items: center;
        gap: 1.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        padding: 1.6rem;
        border-radius: 1.2rem;
      `}
    >
      <Icon icon="ic_success" color={DESIGN_TOKEN_COLOR.gray800} />
      <section
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          min-width: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
          `}
        >
          <Typography variant="subtitle14SemiBold" color="gray800">
            회의 내용 문서화
          </Typography>
          <Typography
            variant="body12SemiBold"
            color="gray600"
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            중간발표 이후 회고 | {"떡잎방범대"}
          </Typography>
        </div>

        {/* TODO: IconButton 컴포넌트 생성 */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            cursor: pointer;

            transition: background-color 0.2s ease-in-out;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray300};
            }
          `}
        >
          <Icon icon="ic_after" size={1.2} color={DESIGN_TOKEN_COLOR.gray800} />
        </div>
      </section>
    </section>
  );
}
