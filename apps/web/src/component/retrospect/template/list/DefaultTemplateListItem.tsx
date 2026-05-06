import { css } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TemplateListPageContext } from "@/app/mobile/retrospect/template/list/TemplateListPage";
import { Button } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture.tsx";
import { useApiPostTemplateChoiceListView } from "@/hooks/api/backoffice/useApiPostTemplateChoiceListView";
import { TemplateChoiceFormTag } from "@/types/template";
import { PATHS } from "@layer/shared";

type DefaultTemplateListItemProps = {
  id: number;
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
};

/**
 * 화면에 보여주는 템플릿 태그 문자열을 백엔드 통계 API의 enum 값으로 매핑합니다.
 * 매핑되지 않은 케이스는 커스텀 템플릿(CUSTOM)으로 간주합니다.
 */
const TEMPLATE_TAG_TO_FORM_TAG: Record<string, TemplateChoiceFormTag> = {
  KPT: "KPT",
  "5F": "FIVE_F",
  "Mad Sad Glad": "MAD_SAD_GLAD",
  SSC: "SSC",
  PMI: "PMI",
  무제: "UNTITLED",
};

export const resolveFormTag = (tag: string): TemplateChoiceFormTag => TEMPLATE_TAG_TO_FORM_TAG[tag] ?? "CUSTOM";

export function DefaultTemplateListItem({ id, title, tag, imageUrl }: DefaultTemplateListItemProps) {
  const { spaceId, readOnly } = useContext(TemplateListPageContext);
  const navigate = useNavigate();
  const { mutate: templateChoiceClickMutation } = useApiPostTemplateChoiceListView();

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
              templateChoiceClickMutation(resolveFormTag(tag));
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
