import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { TemplateCard } from "@/component/retrospect/template/card/TemplateCard";
import { useApiRecommendTemplate } from "@/hooks/api/retrospect/recommend/useApiRecommendTemplate";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

export function RecommendDone() {
  const locationState = useLocation().state as RecommendTemplateType & { spaceId: string };
  const navigate = useNavigate();
  const { data: recommendData, isLoading } = useApiRecommendTemplate(locationState);

  if (!recommendData || isLoading) return <LoadingModal />;

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
          onClick={() => navigate(`/space/${locationState.spaceId}`)}
        />
      }
    >
      <Header title={`해당 템플릿으로\n회고를 진행할까요?`} contents="템플릿을 기반으로 질문을 커스텀 할 수 있어요" />
      <Spacing size={10} />
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <TemplateCard
          name={recommendData.formName}
          tag={recommendData.tag}
          imgUrl={recommendData.formImageUrl}
          onClick={() => navigate("/template", { state: { templateId: recommendData.formId } })}
        />
      </div>
      <ButtonProvider>
        <div
          css={css`
            display: flex;
            gap: 0.8rem;
          `}
        >
          <ButtonProvider.Gray onClick={() => {}}>템플릿 변경</ButtonProvider.Gray>
          <ButtonProvider.Primary onClick={() => {}}>진행하기</ButtonProvider.Primary>
        </div>
      </ButtonProvider>
    </DefaultLayout>
  );
}
