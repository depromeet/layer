import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { categoryTagKoreanChange } from "@/utils/space/categoryTagKoreanChange";

type TagBoxProps = {
  tagName: string;
  isSubstitution?: boolean;
};

export function TagBox({ tagName, isSubstitution = true }: TagBoxProps) {
  return (
    <div
      css={css`
        width: auto;
        height: auto;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        padding: 0.4rem 0.8rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Typography variant="body12SemiBold" color="gray800">
        {isSubstitution ? categoryTagKoreanChange(tagName) : tagName}
      </Typography>
    </div>
  );
}
