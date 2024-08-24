import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

type FormControlBoxProps = {
  contents?: string;
  curPage: number;
  lastPage: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};
export function ResultControlTab({ handleIncrement, handleDecrement, contents, curPage, lastPage }: FormControlBoxProps) {
  curPage += 1;
  const startYn = curPage === 1;
  const finishYn = curPage >= lastPage;

  return (
    <div
      css={css`
        width: 100%;
        border-radius: 0.8rem;
        padding: 1.3rem 1.6rem;
        background: white;
        display: flex;
        align-items: center;
        box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
      `}
    >
      <Typography variant={"body16Medium"} color={"gray900"}>
        {contents ?? `${curPage}번 질문`}
      </Typography>
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 1.4rem;
          margin-left: auto;

          svg > path {
            stroke: ${DESIGN_TOKEN_COLOR.gray500};
          }
        `}
      >
        <button onClick={handleDecrement} disabled={startYn}>
          <Icon
            icon={"ic_arrow"}
            css={css`
              transform: rotate(90deg);
              opacity: ${startYn && "30%"};
              transition: 0.4s all;
            `}
            size={1.3}
          />
        </button>

        <Typography color={"gray600"} variant={"body16Medium"}>
          {curPage} / {lastPage}
        </Typography>
        <button onClick={handleIncrement} disabled={finishYn}>
          <Icon
            icon={"ic_arrow"}
            css={css`
              transform: rotate(-90deg);
              opacity: ${finishYn && "30%"};
              transition: 0.4s all;
            `}
            size={1.3}
          />
        </button>
      </div>
    </div>
  );
}
