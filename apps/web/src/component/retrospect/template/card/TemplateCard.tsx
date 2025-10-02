import { css } from "@emotion/react";

import { ButtonProvider } from "@/component/common/button";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { getDeviceType } from "@/utils/deviceUtils";

type TemplateCardProps = {
  name: string;
  tag: string;
  imgUrl: string;
  onClick?: () => void;
  scale?: number;
  size?: "small" | "default";
};

export function TemplateCard({ name, tag, imgUrl, size = "default", onClick }: TemplateCardProps) {
  const { isDesktop } = getDeviceType();

  return (
    <div
      css={css`
        width: ${size === "small" ? "24rem" : "32rem"};
        aspect-ratio: 1 / 1;
        background: ${DESIGN_TOKEN_COLOR.gray00};
        border: ${isDesktop && "1px solid #DFE3EA"};
        border-radius: 0.8rem;
        box-shadow: ${isDesktop && "0 2.866px 8.597px 0 rgba(0, 0, 0, 0.08)"};
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          background: ${DESIGN_TOKEN_COLOR.gray00};
          cursor: pointer;
          border-radius: 0.8rem;
          transform: ${size === "small" && "scale(0.8)"};
          transform-origin: top left;
        `}
        onClick={onClick}
      >
        <div
          css={css`
            padding: 2rem;
            width: ${size === "small" && "125%"};
            height: ${size === "small" && "125%"};
          `}
        >
          <Typography variant="title20Bold">{name}</Typography>
          <Spacing size={1.2} />
          <Tag>{tag}</Tag>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <img
              src={imgUrl}
              css={css`
                mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8));
                width: 60%;
                height: auto;
              `}
            />
            <ButtonProvider.White>
              <Typography color="grey800" variant="B1">
                더 알아보기
              </Typography>
            </ButtonProvider.White>
          </div>
        </div>
      </div>
    </div>
  );
}
