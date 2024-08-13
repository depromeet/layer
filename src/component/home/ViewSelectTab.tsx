import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type UnderBarProps = {
  position: number;
};

type ViewState = {
  viewName: string;
  selected: boolean;
};

type ViewSelectTabProps = {
  viewState: ViewState[];
  setViewState: Dispatch<SetStateAction<ViewState[]>>;
};

function UnderBar({ position }: UnderBarProps) {
  return (
    <div
      css={css`
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray900};
        width: 3.8rem;
        position: absolute;
        bottom: 0;
        left: calc(${position * 5.13}rem + 0.08rem);
        transition: left 0.3s ease;
      `}
    />
  );
}

export function ViewSelectTab({ viewState, setViewState }: ViewSelectTabProps) {
  const clickViewTab = (viewIndex: number) => {
    setViewState((prevState) =>
      prevState.map((view, index) => ({
        ...view,
        selected: index === viewIndex,
      })),
    );
  };

  const selectedIndex = viewState.findIndex((view) => view.selected);

  return (
    <div
      css={css`
        width: 300px;
        position: fixed;
        background-color: ${DESIGN_TOKEN_COLOR.themeBackground.gray};
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 13.89rem;
          height: 4rem;
        `}
      >
        {viewState.map(({ viewName, selected }, i) => (
          <button
            key={i}
            onClick={() => clickViewTab(i)}
            css={css`
              width: 3.93rem;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              position: relative;
              white-space: nowrap;
              margin-right: ${i < viewState.length - 1 ? "1.2rem" : "0"};
            `}
          >
            <Typography variant="subtitle18SemiBold" color={selected ? "black" : "gray500"}>
              {viewName === "ALL" ? "전체" : viewName === "INDIVIDUAL" ? "개인" : "팀"}
            </Typography>
          </button>
        ))}
        <UnderBar position={selectedIndex} />
      </div>
    </div>
  );
}
