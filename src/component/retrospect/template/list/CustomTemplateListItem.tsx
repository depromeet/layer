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
      <Card rounded={"md"}>
        <Typography variant="S2">{title}</Typography>
        <Tag
          styles={css`
            margin-top: 1.2rem;
          `}
        >
          {tag}
        </Tag>
        <Typography>{date}</Typography>
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
