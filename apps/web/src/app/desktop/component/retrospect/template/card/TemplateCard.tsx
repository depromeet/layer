import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import React from "react";

type TemplateCardProps = {
  name: string;
  tag: string;
  imgUrl: string;
  scale?: number;
  size?: "small" | "default";
} & React.HTMLAttributes<HTMLDivElement>;

export function TemplateCard({ name, tag, imgUrl, size = "default", ...props }: TemplateCardProps) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: ${size === "small" ? "24rem" : "42rem"};
        height: ${size === "small" ? "24rem" : "20rem"};
        padding: ${size === "small" ? "2rem" : "1.5rem 2rem"};
        border: 1px solid #dfe3df;
        border-radius: 0.8rem;
        cursor: pointer;
      `}
      {...props}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-content: start;
          padding: 0.9rem 0;
        `}
      >
        <Typography variant="title20Bold2">{tag}</Typography>
        <Tag styles={{ padding: "0.6rem 1.2rem" }}>{name}</Tag>
      </div>

      <img
        src={imgUrl}
        alt={`${name} 템플릿`}
        css={css`
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8));
          width: 16rem;
          height: auto;
        `}
      />
    </div>
  );
}
