import { useNavigate } from "react-router-dom";

import { RecommendTemplate } from "@/component/retrospect/template/recommend/RecommendTemplate";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

export function RecommendTemplatePage() {
  const navigate = useNavigate();

  const onSubmit = (recommendValue: RecommendTemplateType & { spaceId: string }) => {
    navigate("/retrospect/recommend/done", { state: { ...recommendValue } });
  };

  return <RecommendTemplate onSubmit={onSubmit} />;
}
