import { css } from "@emotion/react";
import React, { Fragment, PropsWithChildren } from "react";

import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { getDeviceType } from "@/utils/deviceUtils";

type ResultContainerProps = {
  question?: string;
  name?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export function ResultContainer({ name, question, children, ...props }: PropsWithChildren<ResultContainerProps>) {
  const { isDesktop } = getDeviceType();

  return (
    <div
      css={css`
        width: 100%;
        height: ${isDesktop ? "11rem" : "auto"};
        margin-top: 2.4rem;
        border-radius: 0.78rem;
        padding: ${isDesktop ? (name ? "1.2rem" : "1.6rem") : "1.9rem 2rem 1.7rem 2rem"};
        min-height: fit-content;
        box-shadow: 0 3.886px 11.657px 0 rgba(33, 37, 41, 0.04);
        font-size: 1.6rem;
        color: #212529;
        background: white;
      `}
      {...props}
    >
      {question ? (
        <Fragment>
          <span
            id="question"
            css={css`
              font-weight: 500;
              line-height: 1.5;
            `}
          >
            {question}
          </span>

          <div
            id="line"
            css={css`
              width: 100%;
              border: ${isDesktop ? "none" : "solid 0.01rem #eee"};
              background: transparent;
              border-radius: 5rem;
              margin: 1.3rem 0;
            `}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Tag>{name}</Tag>
          <Spacing id="space" size={1.2} />
        </Fragment>
      )}

      <div
        id="children"
        css={css`
          display: flex;
          justify-content: center;
          column-gap: ${isDesktop ? "0.3rem" : "0.8rem"};
        `}
      >
        {children}
      </div>
    </div>
  );
}
