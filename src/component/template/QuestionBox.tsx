import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/component/common/Icon";

type QuestionBoxType = {
  index: number;
  title: string;
  contents: string;
};
export function QuestionBox({ index, title, contents }: QuestionBoxType) {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      id="wrapper"
      css={css`
        padding: 2rem 2rem 2rem 2rem;
        background-color: #f2f4f8;
        border-radius: 0.8rem;
        display: flex;
        flex-direction: column;
        transition: 0.4s ease-in-out;
        row-gap: ${isOpen ? "1.8rem" : "0rem"};
      `}
    >
      <div
        id="toggle-container"
        css={css`
          width: 100%;
          overflow: hidden;
          transition: 0.4s all;
          height: 100%;
        `}
        ref={containerRef}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.8rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 1rem;
              cursor: pointer;
            `}
            onClick={() => setOpen(!isOpen)}
          >
            <div
              css={css`
                border-radius: 100%;
                background-color: #454952;

                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 1.2rem;
              `}
            >
              {index}
            </div>
            <div
              css={css`
                font-weight: 600;
                font-size: 1.6rem;
              `}
            >
              {title}
            </div>
            <Icon
              icon={"ic_chevron_down"}
              css={css`
                transform: ${isOpen ? `rotate(180deg)` : `rotate(0deg)`};
                transition: 0.4s all;
                margin-left: auto;
              `}
            />
          </div>
        </div>
      </div>
      <div
        id="content-container"
        ref={contentRef}
        css={css`
          display: flex;
          position: relative;
          flex-direction: column;
          row-gap: 1.2rem;
          transition: 0.4s all;
          overflow: hidden;
          height: ${isOpen ? `${contentHeight}px` : "0px"};
          opacity: ${isOpen ? "1" : "0"};
        `}
      >
        <hr
          css={css`
            border: solid 0.05rem #ced2da;
            width: 100%;
            margin: 0;
          `}
        />
        <div
          css={css`
            color: #666b75;
            font-size: 1.4rem;
            line-height: 1.5;
            transition: opacity 0.4s ease;
          `}
        >
          {contents}
        </div>
      </div>
    </div>
  );
}
