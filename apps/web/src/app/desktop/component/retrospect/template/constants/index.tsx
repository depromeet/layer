import { TemplateList } from "@/app/desktop/component/retrospect/template/list";

export const FUNNEL_STEP_BACK_CONFIG = {
  listTemplateDetail: {
    title: "템플릿 리스트",
    step: "listTemplate",
    contents: <TemplateList />,
  },
} as const;

export const FUNNEL_STEPS_WITH_BACK = Object.keys(FUNNEL_STEP_BACK_CONFIG);
