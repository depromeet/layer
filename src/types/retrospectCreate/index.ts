export type MainInfo = {
  title: string;
  introduction?: string;
};

export type Questions = string[];

export type RetrospectCreateReq = MainInfo & Questions;
