import { css } from "@emotion/react";

import { CheckBox, CheckBoxGroup } from "@/component/common/checkBox";
import { Tag } from "@/component/common/tag";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useTabs } from "@/hooks/useTabs";

type SelectRecommendedProps = {
  //FIXME - hard coded types
  checkBoxHandlers: {
    isChecked: (value: string) => boolean;
    toggle: (value: string) => void;
  };
};
export function SelectRecommended({ checkBoxHandlers }: SelectRecommendedProps) {
  const { tabs, curTab, selectTab } = useTabs(["팀워크", "의사소통", "문제해결", "시간관리", "목표설정", "자기계발", "목표달성"] as const);
  const DUMMY = [
    "팀원 간의 소통은 원활했나요?",
    "팀 내에서의 역할 분담은 적절했나요?",
    "팀워크 강화를 위해 어떤 노력이 필요했나요?",
    "팀 내 지원이 잘 이루어졌나요?",
  ];
  return (
    <>
      <div
        css={css`
          display: flex;
          overflow-x: scroll;
          overflow: visible;
          gap: 0.8rem;
          margin: 2.3rem 0;
        `}
      >
        {tabs.map((tag, index) => (
          <button
            key={index}
            css={css`
              flex-shrink: 0;
            `}
            onClick={() => selectTab(tag)}
          >
            <Tag size="md" variant={tag === curTab ? "dark" : "default"}>
              {tag}
            </Tag>
          </button>
        ))}
      </div>
      <div>
        <CheckBoxGroup isChecked={checkBoxHandlers.isChecked} onChange={checkBoxHandlers.toggle}>
          {DUMMY.map((question, index) => {
            return (
              <CheckBox value={question} key={index}>
                {question}
              </CheckBox>
            );
          })}
        </CheckBoxGroup>
      </div>
    </>
  );
}
