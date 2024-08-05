import { PaginationRes } from "./pagination";
import { Questions } from "./retrospectCreate";

type TemplateTag = "KPT" | "5F" | "Mad Sad Glad" | "SSC" | "PMI" | "무제";

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
  customTemplateList: {
    content: AbbrCustomTemplate[];
  };
} & PaginationRes;
