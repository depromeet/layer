export type Retrospect = {
  retrospectId: number;
  title: string;
  introduction: string;
  isWrite: boolean;
  retrospectStatus: "PROCEEDING" | "DONE";
  totalCount: number;
  writeCount: number;
  createdAt: string;
  deadline: string;
};
