import { css } from "@emotion/react";

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
        {index}
      </div>
      <div
        css={css`
          color: #73a2ff;
          font-size: 1.6rem;
          font-weight: 300;
        `}
        id="questions-contents"
      >
        {contents}
      </div>
    </div>
  );
}
