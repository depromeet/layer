export type MainInfo = {
  title: string;
  introduction?: string;
};

export type Questions = string[];

export type DueDate = string;

export type RetrospectCreateReq = MainInfo & {
  questions: Questions;
  dueDate: DueDate;
  templateTitle: string;
};
