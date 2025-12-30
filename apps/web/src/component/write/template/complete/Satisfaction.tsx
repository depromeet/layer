import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";

import * as icons from "@/assets/svgs";
import { Icon } from "@/component/common/Icon";
import { ResultContainer } from "@/component/write/template/complete/ResultContainer.tsx";
import { SATISTFACTION_COLOR } from "@/component/write/template/template.const.ts";

type IconType = keyof typeof icons;

type BaseProps = {
  index: number;
  customCss?: SerializedStyles;
};

type WithName = { name: string; question?: never };
type WithQuestion = { question: string; name?: never };
type WithNone = { name?: never; question?: never };

export type SatisfactionProps = BaseProps & (WithName | WithQuestion | WithNone);

export function CSatisfactionTemplate({ name, question, index: SatisfactionIdx, customCss }: SatisfactionProps) {
  const emotions: IconType[] = ["ic_very_poor", "ic_poor", "ic_commonly", "ic_good", "ic_very_good"];

  return (
    <ResultContainer question={question} name={name} customCss={customCss}>
      {emotions.map((item, index) => {
        return (
          <div key={index}>
            <Icon
              icon={item}
              size={4}
              css={css`
                circle,
                ellipse {
                  fill: ${SatisfactionIdx === index && SATISTFACTION_COLOR[SatisfactionIdx]};
                  transition: 0.4s all;
                }
              `}
            />
          </div>
        );
      })}
    </ResultContainer>
  );
}
