import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useRef, useState } from "react";

import { AppBar } from "@/component/common/appBar";
import { ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Tooltip } from "@/component/common/tip";
import { useInput } from "@/hooks/useInput";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type QuestionsListProps = {
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
  goPrev: ReturnType<typeof useMultiStepForm>["goPrev"];
};

export function ConfirmEditTemplate({ goNext, goPrev }: QuestionsListProps) {
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  //FIXME - 유저 이름 가져오기
  const { value: title, handleInputChange: handleTitleChange } = useInput(retroCreateData.formName ?? `${"디프만"}님의 커스텀 템플릿${2}`);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleDataSave = () => {
    setRetroCreateData((prev) => ({ ...prev, formName: title }));
    goNext();
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
        padding: 0 2rem;
        background-color: ${DESIGN_SYSTEM_COLOR["themeBackground"]["gray"]};
      `}
    >
      <Spacing size={2.3} />
      <AppBar theme="gray" LeftComp={<Icon icon={"ic_arrow_back"} onClick={goPrev} />} />
      <Header title={"수정된 해당 템플릿으로\n진행하시겠어요?"} contents={"다음 회고에서도 해당 템플릿으로 제공해드릴게요!"} />
      <Spacing size={5.3} />
      <Card shadow>
        <div
          css={css`
            padding: 1rem;
            margin-bottom: 3rem;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <input
              ref={titleInputRef}
              value={title}
              onChange={handleTitleChange}
              css={css`
                font-size: 2rem;
                font-weight: bold;
                width: 100%;
              `}
            />
            <div
              css={css`
                position: relative;
                margin-left: 1rem;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  top: -6rem;
                  right: -2.5rem;
                `}
              >
                {showTooltip && <Tooltip message="커스텀된 회고의 이름을 수정할 수 있어요!" bounce />}
              </div>
              <Icon
                icon="ic_pencil"
                size={2.4}
                color="#d9d9d9"
                onClick={() => {
                  titleInputRef.current?.focus();
                  setShowTooltip(false);
                }}
              />
            </div>
          </div>
          <Spacing size={0.8} />
          <Tag>KPT회고</Tag>
        </div>
        <QuestionList>
          {retroCreateData.questions.map(({ questionContent }, index) => (
            <QuestionListItem key={index} order={index + 1}>
              {questionContent}
            </QuestionListItem>
          ))}
        </QuestionList>
        <Spacing size={3} />
      </Card>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={goPrev}>질문 수정</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={handleDataSave}>이대로 작성</ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}
