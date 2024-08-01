import { RetrospectType } from "../write";

export type MainInfo = {
  title: string;
  introduction?: string;
};

export type Questions = { questionType: RetrospectType; questionContent: string }[];

export type RetrospectCreateReq = {
  title: string;
  introduction?: string;
  questions: Questions;
  deadline: string;
  isNewForm: boolean;
  formName: string;
  formIntroduction: string;
};
