import { css } from "@emotion/react";
import { HTMLAttributes, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

export type SelectBoxType = {
  data: {
    retrospectId: number;
    retrospectTitle: string;
    status: "PROCEEDING" | "DONE";
  }[];
  value: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  updateRetroSpectData: ({ retrospectId, retrospectTitle }: { retrospectId: number; retrospectTitle: string }) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "type">;

export function SelectBox({ data, onClick, value, updateRetroSpectData, ...props }: SelectBoxType) {
  const DEFAULT_WORD = "회고 선택";
  const [isOpen, setOpen] = useState(false);
  const isMultipleData = data?.length >= 1;

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
          cursor: ${isMultipleData && "pointer"};
        `}
        onClick={() => {
          if (isOpen) setOpen(false);
          else isMultipleData && setOpen(true);
        }}
      >
        <Typography color={!value ? "gray500" : "gray800"} variant={"body15Medium"}>
          {value || DEFAULT_WORD}
        </Typography>
        {isMultipleData && (
          <Icon
            icon={"ic_back"}
            css={css`
              color: ${DESIGN_TOKEN_COLOR.gray600};
              transform: rotate(-90deg);
              margin-left: auto;
            `}
          />
        )}
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          position: relative;
          display: ${!isOpen && `none`};
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
            display: flex;
            flex-direction: column;
            box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow300};
            border-radius: 1.2rem;
            padding: 0 2rem;
            max-height: 16.5rem;
            overflow-y: auto;
            animation: ${ANIMATION.FADE_IN} ease 0.4s;

            button {
              padding: 1.7rem 0;
              text-align: left;
            }
          `}
          {...props}
        >
          {data?.map((item) => {
            return (
              <button
                key={item.retrospectId}
                onClick={(e) => {
                  handleClick(e);
                  onClick(e);
                  updateRetroSpectData({ retrospectId: item.retrospectId, retrospectTitle: item.retrospectTitle });
                }}
              >
                <Typography variant={"subtitle14SemiBold"} color={"gray800"}>
                  {item.retrospectTitle}
                </Typography>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
