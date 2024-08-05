import { css } from "@emotion/react";
import { ChangeEventHandler } from "react";

type DescriptiveTemplateProps = {
  answer: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};
export function WDescriptiveTemplate({ answer, onChange }: DescriptiveTemplateProps) {
  const PLACEHOLDER =
    "자유롭게 회고를 작성해주세요 :)\n예시) 가장 어려운 점은 일정관리를 하는 것이다. 나만의 일정을 관리한다면 상관없지만, 셀 내 모든 인원들의 일정을 고려하며 관리를 하는 것이 처음에는 많이 어려운 점 중 하나였다. 기획과 개발을 하면서 많은 변수가 생기는데, 이를 유관부서가 이해할 수 있도록 일정을 잘 전달하는 것은 생각보다 어려운 일임을 하면서 깨닫기도 했다.";
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 2.3rem;
      `}
    >
      {/*  FIXME: SPACE 컴포넌트 넣기 */}
      <textarea
        placeholder={PLACEHOLDER}
        id="textfield"
        css={css`
          line-height: 2;
          font-size: 1.5rem;
          font-weight: 300;
          height: 41.8rem;
          overflow-y: auto;
          white-space: pre-line;

          &::placeholder {
            color: #a9afbb;
          }
        `}
        value={answer || ""}
        onChange={onChange}
      />
    </div>
  );
}
