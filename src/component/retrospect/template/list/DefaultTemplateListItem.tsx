import { css } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TemplateListPageContext } from "@/app/retrospect/template/list/TemplateListPage";
import { Button } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";

type DefaultTemplateListItemProps = {
  id: number;
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
  readOnly?: boolean;
};

export function DefaultTemplateListItem({ id, title, tag, imageUrl, readOnly }: DefaultTemplateListItemProps) {
  const { spaceId, isCreateRetrospect } = useContext(TemplateListPageContext);
  const navigate = useNavigate();
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
        {isCreateRetrospect ? (
          <Button
            colorSchema={"outline"}
            onClick={() => {
              navigate(PATHS.retrospectCreate(), {
                state: { spaceId, templateId: id },
              });
            }}
          >
            선택하기
          </Button>
        ) : (
          <Button
            colorSchema={"white"}
            onClick={() =>
              navigate(PATHS.viewDetailTemplate(), {
                state: {
                  templateId: id,
                  readOnly: readOnly,
                },
              })
            }
          >
            <Typography variant={"subtitle16SemiBold"} color={"gray800"}>
              더 알아보기
            </Typography>
          </Button>
        )}
      </Card>
    </li>
  );
}
