import { TemplateChoiceFormTag } from "@/types/template";

/**
 * 화면에 보여주는 템플릿 태그 문자열을 백엔드 통계 API의 enum 값으로 매핑합니다.
 * 매핑되지 않은 케이스는 커스텀 템플릿(CUSTOM)으로 간주합니다.
 */
const TEMPLATE_TAG_TO_FORM_TAG: Record<string, TemplateChoiceFormTag> = {
  KPT: "KPT",
  "5F": "FIVE_F",
  "Mad Sad Glad": "MAD_SAD_GLAD",
  SSC: "SSC",
  PMI: "PMI",
  무제: "UNTITLED",
};

export const resolveFormTag = (tag: string): TemplateChoiceFormTag => TEMPLATE_TAG_TO_FORM_TAG[tag] ?? "CUSTOM";
