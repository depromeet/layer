import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type SpaceCountViewProps = {
  memberCount: number | undefined;
  mainTemplate: string | null | undefined;
};

export function SpaceCountView({ mainTemplate, memberCount }: SpaceCountViewProps) {
  const navigate = useNavigate();
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  return (
    <div
      css={css`
        width: 100%;
        height: 7.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <button
        css={css`
          display: flex;
          gap: 1.2rem;
          align-items: center;
          justify-content: space-between;
          flex-basis: 50%;
        `}
        onClick={() =>
          navigate(PATHS.template(spaceId), {
            state: {
              readOnly: true,
            },
          })
        }
      >
        <div
          css={css`
            display: flex;
            gap: 1rem;
          `}
        >
          <Icon icon="ic_template" size={2.8} color="blue600" />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 0.2rem;
            `}
          >
            <Typography variant="body12Medium" color="gray800">
              대표 템플릿
            </Typography>
            <Typography
              variant="subtitle14SemiBold"
              css={css`
                text-align: left;
              `}
            >
              {mainTemplate ?? "-"}
            </Typography>
          </div>
        </div>
        <Icon icon="ic_after" size={1.6} color={DESIGN_TOKEN_COLOR.gray400} />
      </button>
      <div
        css={css`
          width: 1px;
          height: 2.6rem;
          background-color: #dee2e6;
          margin: 0 2rem;
        `}
      />
      <button
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-basis: 50%;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 1rem;
          `}
        >
          <Icon icon="ic_twoMan" size={2.8} />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 0.2rem;
            `}
          >
            <Typography variant="body12Medium" color="gray800">
              팀원
            </Typography>
            <Typography variant="subtitle14SemiBold">{memberCount}명</Typography>
          </div>
        </div>
        <Icon icon="ic_after" size={1.6} color={DESIGN_TOKEN_COLOR.gray400} />
      </button>
    </div>
  );
}
