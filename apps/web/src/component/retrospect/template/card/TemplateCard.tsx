import { css } from "@emotion/react";

import { ButtonProvider } from "@/component/common/button";
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
        width: 36rem;
        cursor: pointer;
      `}
      onClick={onClick}
    >
      <Typography variant="S1">{name}</Typography>
      <Spacing size={1.2} />
      <Tag>{tag}</Tag>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          gap: 2rem;
        `}
      >
        <div css={css``}>
          <img
            src={imgUrl}
            css={css`
              mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8));
              width: 20rem;
              height: auto;
            `}
          />
        </div>
        {/* <ButtonProvider gradient={false}> */}
        <ButtonProvider.White>
          <Typography color="grey800" variant="B1">
            더 알아보기
          </Typography>
        </ButtonProvider.White>
        {/* </ButtonProvider> */}
      </div>
    </div>
  );
}
