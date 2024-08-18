import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { categoryTagChange } from "@/utils/space/categoryTagChange";

type SpaceCountViewProps = {
  memberCount: number | undefined;
  mainTemplate: string | undefined;
};

export function SpaceCountView({ mainTemplate, memberCount }: SpaceCountViewProps) {
  return (
    <div
      css={css`
        width: 100%;
        height: 7.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1.2rem;
          align-items: center;
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
          <Typography variant="subtitle14SemiBold">{mainTemplate ? categoryTagChange(mainTemplate) : "_"}</Typography>
        </div>
      </div>

      <div
        css={css`
          width: 1px;
          height: 2.6rem;
          background-color: #dee2e6;
        `}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon icon="ic_twoMan" size={2.8} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            margin-left: 1.5rem;
            margin-right: 1rem;
          `}
        >
          <Typography variant="body12Medium" color="gray800">
            팀원
          </Typography>
          <Typography variant="subtitle14SemiBold">{memberCount}명</Typography>
        </div>
        <Icon icon="ic_after" size={1.6} />
      </div>
    </div>
  );
}
