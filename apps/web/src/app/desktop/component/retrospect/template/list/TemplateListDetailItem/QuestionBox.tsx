import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

type QuestionBoxType = {
  index: number;
  title: string;
  contents: string;
  isProvidedTemplateSet: boolean;
};
export function QuestionBox({ index, title, contents, isProvidedTemplateSet }: QuestionBoxType) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <li
      onClick={() => isProvidedTemplateSet && setIsOpen(!isOpen)}
      css={css`
        list-style: none;
        padding: 1.4rem 2rem;
        background-color: #f6f8fc;
        border-radius: 0.8rem;

        & + & {
          margin-top: 1.2rem;
        }
      `}
    >
      {/* ---------- 질문 타이틀  ---------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <p
          css={css`
            display: flex;
            align-items: center;
            gap: 1.2rem;
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 140%;
            color: #454952;

            &::before {
              content: "${index}";
              display: flex;
              justify-content: center;
              align-items: center;
              width: 2rem;
              height: 2rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray800};
              border-radius: 50%;
              color: #fff;
              font-size: 1.2rem;
              font-weight: 700;
              flex-shrink: 0;
            }
          `}
        >
          {title}
        </p>

        {isProvidedTemplateSet && (
          <Icon
            icon="ic_chevron_down"
            size={1.8}
            color={DESIGN_TOKEN_COLOR.gray600}
            css={css`
              transform: rotate(${isOpen ? "180deg" : "0deg"});
              transition: transform 0.4s ease-in-out;
            `}
          />
        )}
      </div>

      {/* ---------- 질문 콘텐츠  ---------- */}
      <div
        ref={contentRef}
        css={css`
          overflow: hidden;
          transition: all 0.4s ease-in-out;
          height: ${isOpen ? `${contentHeight}px` : "0px"};
          opacity: ${isOpen ? 1 : 0};
        `}
      >
        <hr
          css={css`
            border: solid 0.05rem rgba(197, 213, 243, 0.4);
            width: 100%;
            margin: 1.2rem 0;
          `}
        />
        <p
          css={css`
            color: #666b75;
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 160%;
          `}
        >
          {contents}
        </p>
      </div>
    </li>
  );
}
