import { css } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TemplateListPageContext } from "@/app/retrospect/template/list/TemplateListPage";
import { Button } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture.tsx";
import { PATHS } from "@layer/shared";

type DefaultTemplateListItemProps = {
  id: number;
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
};

export function DefaultTemplateListItem({ id, title, tag, imageUrl }: DefaultTemplateListItemProps) {
  const { spaceId, readOnly } = useContext(TemplateListPageContext);
  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(PATHS.viewDetailTemplate(), {
      state: {
        spaceId,
        templateId: id,
        readOnly,
      },
    });
  };

  return (
    <li
      css={css`
        cursor: pointer;
      `}
      onClick={handleClickDetail}
    >
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
              width: 23rem;
              height: auto;
              margin: 0 auto;
            `}
          >
            <TemplateLottiePicture templateId={id} />
          </div>
        )}
        {!readOnly ? (
          <Button
            colorSchema={"outline"}
            onClick={(e) => {
              e.stopPropagation();
              navigate(PATHS.retrospectRecommendDone(), {
                state: { spaceId, templateId: id },
              });
            }}
          >
            선택하기
          </Button>
        ) : (
          <Button colorSchema={"white"} onClick={handleClickDetail}>
            <Typography variant={"subtitle16SemiBold"} color={"gray800"}>
              더 알아보기
            </Typography>
          </Button>
        )}
      </Card>
    </li>
  );
}
