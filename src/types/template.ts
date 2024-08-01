import { RetrospectType } from "./write";

export type CustomTemplateRes = {
  title: string;
  questions: { questionContent: string; questionType: RetrospectType }[];
};
