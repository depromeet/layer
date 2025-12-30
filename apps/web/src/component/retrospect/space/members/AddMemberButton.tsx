import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

interface AddMemberButtonProps {
  onClick: () => void;
}

export function AddMemberButton({ onClick }: AddMemberButtonProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        margin-bottom: 1.2rem;
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
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            background-color: ${DESIGN_TOKEN_COLOR.blue100};
            margin-right: 1.2rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Icon icon="ic_plus" size={1.4} color={DESIGN_TOKEN_COLOR.blue600} />
        </div>
        <Typography variant="body15Medium" color="blue600">
          팀원 추가
        </Typography>
      </div>
    </div>
  );
}
