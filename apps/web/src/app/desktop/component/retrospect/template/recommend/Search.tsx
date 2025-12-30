import { Header } from "@/component/common/header";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { CardCarousel } from "@/component/retrospect/template/card/CardCarousel";
import { TemplateKey } from "@/component/retrospect/template/card/template.const";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { chooseParticle } from "@/utils/retrospect/chooseParticle";
import { createTemplateArr } from "@/utils/retrospect/createTemplateArr";
import { useAtomValue } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";

export function RecommendSearch({ newTempTemplateId }: { newTempTemplateId: string }) {
  const { spaceId } = useAtomValue(retrospectInitialState);
  const TemplateArr = createTemplateArr(newTempTemplateId as unknown as TemplateKey);
  const { data, isLoading } = useApiGetSpace(spaceId);

  if (isLoading) return <LoadingModal />;

  const particle = chooseParticle(data?.name ?? "");

  return (
    <>
      <Header title={`${data?.name}${particle} 어울리는\n회고 템플릿을 찾는중...`} />
      <Spacing size={13} />
      <div>
        <CardCarousel templateId={newTempTemplateId} spaceId={spaceId} templateArr={TemplateArr} />
      </div>
    </>
  );
}
