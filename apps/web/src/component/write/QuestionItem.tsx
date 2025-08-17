import { css } from "@emotion/react";

import { AdvanceQuestionsNum } from "@/app/mobile/write/RetrospectWritePage";
import { Icon } from "@/component/common/Icon";

type QuestionItemProps = {
  index: number;
  contents: string;
};
export function QuestionItem({ index, contents }: QuestionItemProps) {
  // FIXME: 추후 디자인 토큰에 따라 색상 및 폰트 크기 설정 진행
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 1.2rem;
      `}
    >
      <div
        css={css`
          border-radius: 100%;
          width: 2.4rem;
          height: 2.4rem;
          background-color: #73a2ff;
          color: white;

          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 500;
        `}
        id="questions-index"
      >
        {index <= AdvanceQuestionsNum ? <Icon icon={"ic_essential_star"} size={1.3} /> : index - 2}
      </div>
      <div
        css={css`
          color: #73a2ff;
          font-size: 1.6rem;
          font-weight: 300;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        `}
        id="questions-contents"
      >
        {contents}
      </div>
    </div>
  );
}
