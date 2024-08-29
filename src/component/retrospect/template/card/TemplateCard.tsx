import { css } from "@emotion/react";

import { Button } from "@/component/common/button";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type TemplateCardProps = {
  name: string;
  tag: string;
  imgUrl: string;
  onClick?: () => void;
};

export function TemplateCard({ name, tag, imgUrl, onClick }: TemplateCardProps) {
  return (
    <div
      css={css`
        padding: 3rem;
        aspect-ratio: 1 / 1;
        background: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 0.8rem;
        max-width: 36rem;
      `}
    >
      <Typography variant="S1">{name}</Typography>
      <Spacing size={1.2} />
      <Tag>{tag}</Tag>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <img
          src={imgUrl}
          css={css`
            width: 60%;
            aspect-ratio: 1 / 1;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8));
          `}
        />
        <Button
          css={css`
            background: ${DESIGN_TOKEN_COLOR.gray00};
          `}
          onClick={onClick}
        >
          <Typography color="grey800" variant="B1">
            더 알아보기
          </Typography>
        </Button>
      </div>
    </div>
  );
}
