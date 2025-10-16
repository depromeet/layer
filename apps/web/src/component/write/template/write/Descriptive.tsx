import { css } from "@emotion/react";
import { ChangeEventHandler, useState } from "react";

import { ToolTip } from "./ToolTip.tsx";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";
import { getDeviceType } from "@/utils/deviceUtils.ts";

type DescriptiveTemplateProps = {
  answer: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};
export function WDescriptiveTemplate({ answer, onChange }: DescriptiveTemplateProps) {
  const [isToolTip, setToolTip] = useState(false);
  const { isDesktop } = getDeviceType();
  const PLACEHOLDER =
    "자유롭게 회고를 작성해주세요 :)\n예시) 가장 어려운 점은 일정관리를 하는 것이다. 나만의 일정을 관리한다면 상관없지만, 셀 내 모든 인원들의 일정을 고려하며 관리를 하는 것이 처음에는 많이 어려운 점 중 하나였다. 기획과 개발을 하면서 많은 변수가 생기는데, 이를 유관부서가 이해할 수 있도록 일정을 잘 전달하는 것은 생각보다 어려운 일임을 하면서 깨닫기도 했다.";
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 2.3rem;
        height: 100%;
      `}
    >
      {/*  FIXME: SPACE 컴포넌트 넣기 */}
      <textarea
        placeholder={PLACEHOLDER}
        id="textfield"
        css={css`
          line-height: ${isDesktop ? "180%" : 2};
          font-size: 1.5rem;
          font-weight: ${isDesktop ? 500 : 300};
          height: 100%;
          overflow-y: auto;
          white-space: pre-line;

          &::placeholder {
            color: #a9afbb;
          }
        `}
        value={answer || ""}
        onChange={onChange}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
          position: relative;

          #totalAnswer {
            margin-left: auto;
          }
        `}
      >
        <ToolTip
          isVisible={isToolTip}
          handleClose={() => setToolTip(false)}
          title={"분석 결과를 높이려면?"}
          contents={"회고 내용을 자세하고 구체적으로 작성해 주세요. AI가 제공하는 분석 디테일이 높아져 유의미한 분석 결과를 받아 볼 수 있어요."}
        />
        <div
          css={css`
            display: flex;
            align-items: center;
            column-gap: 0.6rem;
            cursor: pointer;
          `}
          onClick={() => setToolTip(true)}
        >
          <Icon
            icon={"ic_info_transparent"}
            size={1.5}
            css={css`
              path {
                fill: ${DESIGN_TOKEN_COLOR.gray600};
              }
            `}
          />
          <Typography color={"gray500"} variant={"body12Medium"}>
            분석 결과를 높이려면?
          </Typography>
        </div>
        <Typography color={"gray500"} variant={"body12Medium"} id={"totalAnswer"}>
          {answer.length}자 작성
        </Typography>
      </div>
    </div>
  );
}
