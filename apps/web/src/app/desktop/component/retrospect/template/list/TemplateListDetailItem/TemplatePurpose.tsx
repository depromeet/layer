import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { TemplatePurposeType } from "@/hooks/api/template/useGetTemplateInfo";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

interface TemplatePurposeProps {
  templatePurposeResponseList: TemplatePurposeType[];
}

export function TemplatePurpose({ templatePurposeResponseList }: TemplatePurposeProps) {
  if (templatePurposeResponseList.length === 0) return null;

  return (
    <div
      css={css`
        margin-top: 4rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon icon="ic_marketing_color" size={2.4} />
        <p
          css={css`
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 150%;
            margin-left: 0.4rem;
            color: ${DESIGN_TOKEN_COLOR.gray800};
          `}
        >
          이런 목적으로 사용하기 좋아요
        </p>
      </div>
      <div
        css={css`
          margin-top: 1.6rem;
        `}
      >
        {templatePurposeResponseList.map((item, index) => (
          <Typography
            variant="body14SemiBold"
            key={index}
            css={css`
              display: inline-block;
              padding: 1.2rem;
              border-radius: 0.8rem;
              background-color: #f1f6ff;
              margin: 0 0.8rem 0.8rem 0;
            `}
          >
            {item.purpose}
          </Typography>
        ))}
      </div>
    </div>
  );
}
