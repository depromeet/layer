import { PaginationRes } from "./pagination";
import { Questions } from "./retrospectCreate";

type TemplateTag = "KPT" | "5F" | "Mad Sad Glad" | "SSC" | "PMI" | "무제";

/**
 * @description 백오피스: 템플릿 리스트 보기 내에서 선택 이벤트의 통계 전송 시 사용하는 폼 태그입니다.
 */
export type TemplateChoiceFormTag = "KPT" | "FIVE_F" | "MAD_SAD_GLAD" | "SSC" | "PMI" | "UNTITLED" | "CUSTOM";

export type CustomTemplateRes = {
  title: string;
  tag: string;
  questions: Questions;
};

type AbbrDefaultTemplate = {
  id: number;
  title: string;
  templateName: TemplateTag;
  imageUrl: string;
};

export type TemplatesRes = AbbrDefaultTemplate[];

type AbbrCustomTemplate = {
  id: number;
  title: string;
  formTag: TemplateTag;
  createdAt: string;
};

export type CustomTemplateListRes = {
  customTemplateList: PaginationRes<AbbrCustomTemplate>;
};
