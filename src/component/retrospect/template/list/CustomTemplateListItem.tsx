import { css } from "@emotion/react";

import { Button } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";

type CustomTemplateListItem = {
  title: string;
  tag: string;
  date: string;
  createRetrospect?: () => void;
};

export function CustomTemplateListItem({ title, tag, date, createRetrospect }: CustomTemplateListItem) {
  return (
    <li>
      <Card
        rounded={"md"}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Typography variant="S2">{title}</Typography>
          </div>
          <Tag>{tag}</Tag>
          <div
            css={
              !createRetrospect &&
              css`
                align-self: flex-end;
                margin-top: -0.6rem;
              `
            }
          >
            <Typography variant={"body14Medium"} color={"gray600"}>
              {date}
            </Typography>
          </div>
        </div>
        {createRetrospect && (
          <Button colorSchema={"outline"} onClick={() => createRetrospect()}>
            선택하기
          </Button>
        )}
      </Card>
    </li>
  );
}
