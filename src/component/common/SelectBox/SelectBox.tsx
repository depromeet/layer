import { css } from "@emotion/react";
import { HTMLAttributes, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

export type SelectBoxType = {
  data: string[];
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "type">;

export function SelectBox({ data = ["data1", "data2", "data3"], onClick, value, ...props }: SelectBoxType) {
  const DEFAULT_WORD = "회고 선택";
  const [isOpen, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div id="select">
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 1.6rem 1.4rem;
          border: 0.1rem solid ${DESIGN_TOKEN_COLOR.gray300};
          border-radius: 1.2rem;
          cursor: pointer;
        `}
        onClick={() => setOpen(true)}
      >
        <Typography color={!value ? "gray500" : "gray800"} variant={"body15Medium"}>
          {value || DEFAULT_WORD}
        </Typography>
        <Icon
          icon={"ic_back"}
          css={css`
            color: ${DESIGN_TOKEN_COLOR.gray600};
            transform: rotate(-90deg);
            margin-left: auto;
          `}
        />
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          position: relative;
        `}
      >
        <div
          id="item"
          css={css`
            width: 100%;
            position: absolute;
            background: white;
            left: 50%;
            transform: translate(-50%, 0);
            display: ${isOpen ? `flex` : `none`};
            flex-direction: column;
            box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow300};
            border-radius: 1.2rem;
            padding: 0 2rem;

            button {
              padding: 1.5rem 0;
              text-align: left;
            }
          `}
          {...props}
        >
          {data.map((item) => {
            return (
              <button
                onClick={(e) => {
                  handleClick(e);
                  onClick(e);
                }}
              >
                <Typography variant={"subtitle14SemiBold"} color={"gray800"}>
                  {item}
                </Typography>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
