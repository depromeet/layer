import { css } from "@emotion/react";

import { Tag } from "@/component/common/tag";
import { useTabs } from "@/hooks/useTabs";

export function SelectRecommended() {
  const { tabs, curTab, selectTab } = useTabs(["팀워크", "의사소통", "문제해결", "시간관리", "목표설정", "자기계발", "목표달성"] as const);
  return (
    <div
      css={css`
        display: flex;
        overflow-x: scroll;
        overflow: visible;
        gap: 0.8rem;
        margin-top: 2.3rem;
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
  );
}
