import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface ActionItemsTooltipProps {
  isVisible: boolean;
}

export default function ActionItemsTooltip({ isVisible }: ActionItemsTooltipProps) {
  if (!isVisible) return null;

  return (
    <div
      css={css`
        position: absolute;
        top: calc(100% + 1.2rem);
        right: -1.6rem;
        width: 28rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        border-radius: 1.6rem;
        padding: 1.6rem 1.8rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        z-index: 1002;

        /* 말풍선 화살표 */
        &::before {
          content: "";
          position: absolute;
          top: -0.6rem;
          right: 2rem;
          width: 1.2rem;
          height: 1.2rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
          border-bottom: none;
          border-right: none;
          transform: rotate(45deg);
        }

        /* 등장 애니메이션 */
        animation: tooltipFadeIn 0.2s ease-out;

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    >
      {/* ---------- 툴팁 제목 ---------- */}
      <div
        css={css`
          margin-bottom: 1.6rem;
        `}
      >
        <Typography variant="body15Bold" color="gray900">
          실행목표란?
        </Typography>
      </div>

      {/* ---------- 툴팁 설명 ---------- */}
      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <Typography variant="body14SemiBold" color="gray800">
          실행목표란 회고 완료 후 실제로 변화를 이루기 위해 필요한 구체적인 개선 작업이나 활동을 의미해요!
        </Typography>
      </div>

      {/* ---------- 파란색 안내 박스 ---------- */}
      <div
        css={css`
          background-color: ${DESIGN_TOKEN_COLOR.blue50};
          border-radius: 1.2rem;
          padding: 1.6rem 1.2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.4rem;
            margin-bottom: 0.8rem;
          `}
        >
          <Icon
            icon="ic_info_transparent"
            size={1.6}
            css={css`
              flex-shrink: 0;
              path {
                fill: ${DESIGN_TOKEN_COLOR.blue600};
              }
            `}
          />

          <Typography variant="body12Strong" color="blue600">
            실행목표 설정은 대표자만 가능해요
          </Typography>
        </div>
        <Typography variant="body12SemiBold" color="blue600">
          회고 이후 팀원들과 심도있는 대화를 통해 공동의 실행 목표를 설정해보세요!
        </Typography>
      </div>
    </div>
  );
}
