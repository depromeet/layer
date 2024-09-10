import { useLocation } from "react-router-dom";

import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { CardCarousel } from "@/component/retrospect/template/card/CardCarousel";
import { TemplateKey } from "@/component/retrospect/template/card/template.const";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { createTemplateArr } from "@/utils/retrospect/createTemplateArr";

export function RecommendSearch() {
  const { templateId, spaceId } = useLocation().state as { templateId: string; spaceId: string };
  const TemplateArr = createTemplateArr(templateId as unknown as TemplateKey);

  return (
    <DefaultLayout theme="gray">
      <Header title={`디프만과 어울리는\n회고 템플릿을 찾는중...`} />
      <Spacing size={13} />
      <div>
        <CardCarousel templateId={templateId} spaceId={spaceId} templateArr={TemplateArr} />
      </div>
    </DefaultLayout>
  );
}