import { css } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@layer/shared";
import { TemplateListPageContext } from ".";
import { Typography } from "@/component/common/typography";
import { Tag } from "@/component/common/tag";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type DesktopTemplateListItemProps = {
  id: number;
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
};

export function DesktopTemplateListItem({ id, title, tag, imageUrl }: DesktopTemplateListItemProps) {
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
        padding: 1.6rem;
        border: 0.1rem solid ${DESIGN_SYSTEM_COLOR.grey100};
        border-radius: 0.8rem;
        cursor: pointer;
      `}
      onClick={handleClickDetail}
    >
      <div
        css={css`
          display: flex;
          margin-bottom: 1.6rem;
        `}
      >
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          {title.split("\n").map((title, index) => (
            <div key={index}>
              <Typography variant="subtitle14Bold">{title}</Typography>
            </div>
          ))}
          <Tag
            styles={css`
              margin-top: 4.3rem;
            `}
            size="small"
          >
            {tag}
          </Tag>
        </div>
        {imageUrl && (
          <div
            css={css`
              display: flex;
              width: 8.6rem;
              aspect-ratio: 1/1;
              margin-top: auto;
            `}
          >
            <TemplateLottiePicture templateId={id} />
          </div>
        )}
      </div>
      {!readOnly ? (
        <button
          css={css`
            width: 100%;
            text-align: center;
            padding: 0.8rem 2rem;
            border-radius: 0.8rem;
            border: 0.1rem solid #dfe3ea;
          `}
        >
          <Typography variant={"body12Bold"} color={"gray800"}>
            선택하기
          </Typography>
        </button>
      ) : (
        <button onClick={handleClickDetail}>
          <Typography variant={"body12Bold"} color={"gray800"}>
            더 알아보기
          </Typography>
        </button>
      )}
    </li>
  );
}
