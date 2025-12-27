import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useActionModal } from "@/hooks/useActionModal";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { TemplateList } from "../template/list";
import { TemplateRecommend } from "../template/recommend";
import useHoverToggle from "@/hooks/useHoverToggle";

export function TemplateChoice() {
  const { openFunnelModal } = useFunnelModal();
  const { closeActionModal } = useActionModal();
  const recommendHover = useHoverToggle();
  const listHover = useHoverToggle();

  const handleMoveToRecommendTemplate = () => {
    openFunnelModal({
      title: "",
      step: "recommendTemplate",
      contents: <TemplateRecommend />,
    });
    closeActionModal();
  };

  const handleMoveToListTemplate = () => {
    openFunnelModal({
      title: "템플릿 리스트",
      step: "listTemplate",
      contents: <TemplateList />,
    });
    closeActionModal();
  };

  return (
    <div
      css={css`
        padding: 0 2rem 2rem;
      `}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        <Typography variant="title20Bold2">변경 방식을 선택해주세요</Typography>
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.3rem;
        `}
      >
        <button
          onClick={handleMoveToRecommendTemplate}
          onMouseEnter={recommendHover.handleMouseHover}
          onMouseLeave={recommendHover.handleMouseLeave}
          css={css`
            width: 16.3rem;
            background-color: #f6f8fa;
            border-radius: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;
            padding: 3.65rem 0;
            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.blue600};
              span {
                color: ${DESIGN_TOKEN_COLOR.gray00};
              }
            }
          `}
        >
          <Icon icon={`${recommendHover.isHovered ? "ic_stars_white" : "ic_stars"}`} size={4.8} />
          <Typography as="span" variant="body16Medium" color="black">
            추천받기
          </Typography>
        </button>
        <button
          onClick={handleMoveToListTemplate}
          onMouseEnter={listHover.handleMouseHover}
          onMouseLeave={listHover.handleMouseLeave}
          css={css`
            width: 16.3rem;
            background-color: #f6f8fa;
            border-radius: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;
            padding: 3.65rem 0;
            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.blue600};
              span {
                color: ${DESIGN_TOKEN_COLOR.gray00};
              }
            }
          `}
        >
          <Icon icon={`${listHover.isHovered ? "ic_list_white" : "ic_list"}`} size={4.8} />{" "}
          <Typography variant="body16Medium">리스트 보기</Typography>
        </button>
      </div>
    </div>
  );
}
