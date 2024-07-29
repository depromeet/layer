import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

import { Typography } from "@/component/common/typography";

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
        border: 1px solid #212529;
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
        display: flex;
        justify-content: space-between;
        position: relative;
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
          <Typography variant="S2" color={selected ? "black" : "grey500"}>
            {viewName === "ALL" ? "전체" : viewName === "INDIVIDUAL" ? "개인" : "팀"}
          </Typography>
        </button>
      ))}
      <UnderBar position={selectedIndex} />
    </div>
  );
}
