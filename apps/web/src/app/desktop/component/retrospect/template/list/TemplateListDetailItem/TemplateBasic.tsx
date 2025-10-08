import { css } from "@emotion/react";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface TemplateBasicProps {
  templateId: number;
  heading: string;
  description: string;
  imageUrl?: string;
}

export function TemplateBasic({ templateId, heading, description, imageUrl }: TemplateBasicProps) {
  return (
    <div
      css={css`
        display: flex;
        margin-top: 2rem;
      `}
    >
      {imageUrl && (
        <div
          css={css`
            display: flex;
            margin: auto 0;
            width: 8.6rem;
            height: 8.6rem;
          `}
        >
          <TemplateLottiePicture templateId={templateId} />
        </div>
      )}

      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: 2rem;
          color: ${DESIGN_TOKEN_COLOR.gray800};
        `}
      >
        <strong
          css={css`
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 150%;
          `}
        >
          {heading}
        </strong>
        <p
          css={css`
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 160%;
            word-wrap: break-word;
            word-break: keep-all;
          `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
