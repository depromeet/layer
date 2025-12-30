import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { TabProps } from ".";

export function TemplateListTabButton<T extends string>({ tab, curTab, selectTab }: TabProps<T>) {
  const isActive = tab === curTab;
  const moveToQuestion = curTab === "질문구성";

  return (
    <a
      // TODO a태그의 내부링크로 이동시키지만 추가적인 작업에서 어떻게 대응할지 고민중입니다.
      href={moveToQuestion ? "#template_question" : undefined}
      onClick={() => selectTab(tab)}
      css={css`
        text-decoration: none;
        color: ${tab === curTab ? DESIGN_SYSTEM_COLOR.dark : DESIGN_SYSTEM_COLOR.lightGrey};
        padding: 0 0.4rem 0.8rem;
        position: relative;
      `}
    >
      <Typography
        variant="title16Bold"
        color={tab === curTab ? "dark" : "grey"}
        css={css`
          &::after {
            content: "";
            position: absolute;
            bottom: -0.2rem;
            left: 0.3rem;
            right: 0.3rem;
            height: 0.2rem;
            background-color: ${isActive ? DESIGN_SYSTEM_COLOR.dark : "transparent"};
          }
        `}
      >
        {tab}
      </Typography>
    </a>
  );
}
