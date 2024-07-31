import { css } from "@emotion/react";

import * as icons from "@/assets/svgs";
import { Icon } from "@/component/common/Icon";
import { SATISTFACTION_COLOR } from "@/component/write/template/template.const.ts";
import { ANIMATION } from "@/style/common/animation.ts";

type IconType = keyof typeof icons;
type SatisfactionProps = {
  index: number;
  onClick: (index: number) => void;
};

export function WSatisfactionTemplate({ index: SatisfactionIdx, onClick, ...props }: SatisfactionProps) {
  const emotions: IconType[] = ["ic_very_poor", "ic_poor", "ic_commonly", "ic_good", "ic_very_good"];
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        column-gap: 0.8rem;
      `}
      {...props}
    >
      {emotions.map((item, index) => {
        return (
          <div onClick={() => onClick(index)} key={index}>
            <Icon
              icon={item}
              size={6.5}
              css={css`
                circle,
                ellipse {
                  fill: ${SatisfactionIdx === index && SATISTFACTION_COLOR[SatisfactionIdx]};
                  transition: 0.4s all;
                }

                &:hover {
                  transform: translateY(-1rem);
                }

                animation: ${ANIMATION.FADE_IN} 0.5s ease-in-out;
                transition: 0.4s all;
              `}
            />
          </div>
        );
      })}
    </div>
  );
}
