import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Tooltip } from "@/component/common/tip";
import { TemplateCard } from "@/component/retrospect/template/card/TemplateCard";
import { PATHS } from "@layer/shared";
import { useGetSimpleTemplateInfo } from "@/hooks/api/template/useGetSimpleTemplateInfo";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function RecommendDone() {
  const { templateId, spaceId } = useLocation().state as { templateId: string; spaceId: string };

  const navigate = useNavigate();
  const { data: templateData, isLoading } = useGetSimpleTemplateInfo(templateId);

  if (isLoading) return <LoadingModal />;

  return (
    <DefaultLayout
      theme="gray"
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          color={"default"}
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate(PATHS.spaceDetail(spaceId))}
        />
      }
    >
      <Header title={`해당 템플릿으로\n회고를 진행할까요?`} contents="템플릿을 기반으로 질문을 커스텀 할 수 있어요" />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <TemplateCard
              name={templateData.templateName}
              tag={templateData.title}
              imgUrl={templateData.imageUrl}
              onClick={() => navigate(PATHS.viewDetailTemplate(), { state: { templateId: templateData.id, spaceId, readOnly: false } })}
            />
          </Tooltip.Trigger>
          <Tooltip.Content message="자세히 알고싶다면 카드를 클릭해보세요!" placement="bottom-start" offsetY={15} hideOnClick />
        </Tooltip>
      </div>
      <ButtonProvider>
        <div
          css={css`
            display: flex;
            gap: 0.8rem;
          `}
        >
          <ButtonProvider.Gray onClick={() => navigate(PATHS.template(spaceId), { state: { readOnly: false } })}>템플릿 변경</ButtonProvider.Gray>
          <ButtonProvider.Primary
            onClick={() =>
              navigate(PATHS.retrospectCreate(), {
                state: { spaceId: spaceId, templateId: templateData.id, saveTemplateId: true },
              })
            }
          >
            진행하기
          </ButtonProvider.Primary>
        </div>
      </ButtonProvider>
    </DefaultLayout>
  );
}
