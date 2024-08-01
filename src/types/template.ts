import { QuestionType } from "./retrospectCreate";

export type CustomTemplateRes = {
  title: string;
  questions: { questionContent: string; questionType: QuestionType }[];
};
