import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import ActionButton from "@/component/common/ActionButton";
import { css } from "@emotion/react";

type MainQuestionsHeaderProps = {
  isDeleteMode: boolean;
  handleDeleteModeToggle: () => void;
};

export default function MainQuestionsHeader({ isDeleteMode, handleDeleteModeToggle }: MainQuestionsHeaderProps) {
  return (
    <section>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography variant="title16Bold">메인 질문</Typography>
        {isDeleteMode ? (
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.8rem;
            `}
          >
            <ActionButton label="취소" variant="body14SemiBold" color="gray500" onClick={handleDeleteModeToggle} />
            <ActionButton label="완료" variant="body14SemiBold" color="gray900" onClick={handleDeleteModeToggle} />
          </div>
        ) : (
          <ActionButton label="삭제" variant="body14SemiBold" color="gray500" onClick={handleDeleteModeToggle} />
        )}
      </div>
      <Spacing size={0.8} />
      <Typography variant="body14SemiBold" color="gray500">
        최대 10개까지 구성 가능해요
      </Typography>
    </section>
  );
}
