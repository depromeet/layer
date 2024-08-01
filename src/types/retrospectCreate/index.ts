export type QuestionType = "plain_text" | "range" | "number" | "combobox" | "card" | "markdown";

export type MainInfo = {
  title: string;
  introduction?: string;
};

export type Questions = { questionType: QuestionType; questionContent: string }[];

export type RetrospectCreateReq = {
  title: string;
  introduction?: string;
  questions: Questions;
  deadline: string;
  isNewForm: boolean;
  formName: string;
  formIntroduction: string;
};
