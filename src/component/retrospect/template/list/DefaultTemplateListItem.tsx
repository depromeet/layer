import { css } from "@emotion/react";

import { Button } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";

type DefaultTemplateListItemProps = {
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
  createRetrospect?: () => void;
};
export function DefaultTemplateListItem({ title, tag, imageUrl, createRetrospect }: DefaultTemplateListItemProps) {
  return (
    <li>
      <Card rounded={"md"}>
        <Typography variant="S2">{title}</Typography>
        <Tag
          styles={css`
            margin-top: 1.2rem;
          `}
        >
          {tag}
        </Tag>
        {imageUrl && (
          <div
            css={css`
              text-align: center;
            `}
          >
            <img src={imageUrl} width={180} height={180} />
          </div>
        )}
        {createRetrospect ? (
          <Button colorSchema={"outline"} onClick={() => createRetrospect()}>
            선택하기
          </Button>
        ) : (
          <button>
            <Typography>더 알아보기</Typography>
          </button>
        )}
      </Card>
    </li>
  );
}
