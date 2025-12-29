import { css } from "@emotion/react";
import { useContext } from "react";
import { TemplateListPageContext } from "..";
import { Typography } from "@/component/common/typography";
import { Tag } from "@/component/common/tag";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import TemplateListDetailItem from "../TemplateListDetailItem";
import { useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { TemplateListConform } from "../TemplateListConform";

type DesktopTemplateListItemProps = {
  id: number;
  title: string;
  tag: string;
  imageUrl?: string;
  date?: string;
};

export function TemplateListItem({ id, title, tag, imageUrl }: DesktopTemplateListItemProps) {
  const { readOnly } = useContext(TemplateListPageContext);
  const { openFunnelModal } = useFunnelModal();
  const setRetrospectValue = useSetAtom(retrospectInitialState);

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
      {!readOnly ? (
        <button
          css={css`
            width: 100%;
            text-align: center;
            padding: 0.8rem 2rem;
            border-radius: 0.8rem;
            border: 0.1rem solid #dfe3ea;
          `}
          onClick={(event) => {
            // 선택하기 버튼 클릭 시, 상위로 이벤트를 전파하지 않고 바로 템플릿 확정 페이지로 이동합니다.
            event.stopPropagation();
            setRetrospectValue((prev) => ({
              ...prev,
              tempTemplateId: String(id),
              saveTemplateId: true,
            }));
            openFunnelModal({
              title: "",
              step: "recommendTemplate",
              contents: <TemplateListConform />,
            });
          }}
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
