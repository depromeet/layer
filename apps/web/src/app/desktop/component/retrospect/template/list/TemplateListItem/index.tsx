import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Tag } from "@/component/common/tag";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import TemplateListDetailItem from "../TemplateListDetailItem";
import { useSearchParams } from "react-router-dom";

type DesktopTemplateListItemProps = {
  id: number;
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
};

export function TemplateListItem({ id, title, tag, imageUrl }: DesktopTemplateListItemProps) {
  const [searchParams] = useSearchParams();
  const templateMode = searchParams.get("template_mode");

  const { openFunnelModal } = useFunnelModal();

  const handleClickDetail = () => {
    openFunnelModal({
      title,
      step: "listTemplateDetail",
      contents: <TemplateListDetailItem templateId={id} />,
      templateTag: tag,
      overlayIndex: 10002,
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
      {templateMode !== "readonly" ? (
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
        <button
          onClick={handleClickDetail}
          css={css`
            width: 100%;
            text-align: center;
            padding: 0.8rem 2rem;
          `}
        >
          <Typography variant={"body12Bold"} color={"gray800"}>
            더 알아보기
          </Typography>
        </button>
      )}
    </li>
  );
}
