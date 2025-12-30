import { Header } from "@/component/common/header";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { useGetSimpleTemplateInfo } from "@/hooks/api/template/useGetSimpleTemplateInfo";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { css } from "@emotion/react";
import { useAtomValue, useSetAtom } from "jotai";
import { Tooltip } from "@/component/common/tip";
import { ButtonProvider } from "@/component/common/button";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { chooseParticle } from "@/utils/retrospect/chooseParticle";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { TemplateCard } from "../card/TemplateCard";
import { useActionModal } from "@/hooks/useActionModal";
import { TemplateChoice } from "@/app/desktop/component/retrospect/choice";
import { RetrospectCreate } from "@/app/desktop/component/retrospectCreate";
import TemplateListDetailItem from "../list/TemplateListDetailItem";

function RecommendDone() {
  const setRetrospectValue = useSetAtom(retrospectInitialState);
  const { tempTemplateId, spaceId } = useAtomValue(retrospectInitialState);
  const { data } = useApiGetSpace(spaceId);
  const { data: templateData, isLoading } = useGetSimpleTemplateInfo(tempTemplateId);
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();

  if (isLoading) return <LoadingModal />;

  const particle = chooseParticle(data?.name ?? "");

  // TODO: 추후에 퍼널에 종속되지 않는 템플릿 조회 페이지로 개발하기
  const handleShowTemplateDetailInfo = () => {
    const moveToRecommendTemplate = () => {
      openFunnelModal({
        title: "",
        step: "recommendTemplate",
        contents: <RecommendDone />,
      });
    };

    openFunnelModal({
      title: templateData.templateName,
      step: "listTemplateDetail",
      contents: <TemplateListDetailItem templateId={Number(tempTemplateId)} />,
      templateTag: templateData.title,
      onPrevious: moveToRecommendTemplate,
    });
  };

  const handleMoveToChangeTemplate = () => {
    openActionModal({
      title: "",
      contents: <TemplateChoice />,
    });
  };

  const handleMoveToConfirmTemplate = () => {
    setRetrospectValue((prev) => ({
      ...prev,
      templateId: prev.tempTemplateId,
      saveTemplateId: true,
    }));

    openFunnelModal({
      title: "",
      step: "retrospectCreate",
      contents: <RetrospectCreate />,
    });
  };

  return (
    <main
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={`${data?.name}${particle} 어울리는\n회고 템플릿을 찾았어요!`} />
      <Spacing size={12} />
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
              onClick={handleShowTemplateDetailInfo}
            />
          </Tooltip.Trigger>
          <Tooltip.Content message="자세히 알고싶다면 카드를 클릭해보세요!" placement="top-start" offsetY={15} hideOnClick />
        </Tooltip>
      </div>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={handleMoveToChangeTemplate}>템플릿 변경</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={handleMoveToConfirmTemplate}>선택하기</ButtonProvider.Primary>
      </ButtonProvider>
    </main>
  );
}

export default RecommendDone;
