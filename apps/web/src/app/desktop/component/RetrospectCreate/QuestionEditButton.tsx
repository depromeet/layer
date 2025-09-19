import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

function QuestionEditButton() {
  return (
    <button
      type="button"
      css={css`
        position: absolute;
        top: 2rem;
        right: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dfe3ea;
        border-radius: 3rem;
        padding: 1.2rem 1.6rem 1.2rem 1.2rem;
        font-size: 1.4rem;
        line-height: 140%;
        color: ${DESIGN_TOKEN_COLOR.gray700};
        font-weight: 600;
      `}
    >
      <Icon
        icon="ic_write"
        size={2}
        css={css`
          margin-right: 0.8rem;
        `}
      />
      질문 수정
    </button>
  );
}

export default QuestionEditButton;
