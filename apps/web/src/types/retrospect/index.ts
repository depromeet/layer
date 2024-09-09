export type WriteStatus = "NOT_STARTED" | "PROCEEDING" | "DONE";
export type RetrospectStatus = "PROCEEDING" | "DONE";
export type AnalysisStatus = "NOT_STARTED" | "PROCEEDING" | "DONE";

export type Retrospect = {
  retrospectId: number;
  title: string;
  introduction: string;
  writeStatus: WriteStatus;
  retrospectStatus: RetrospectStatus;
  analysisStatus: AnalysisStatus;
  totalCount: number;
  writeCount: number;
  createdAt: string;
  deadline: string | null;
};

export type RetrospectProceed = {
  writeStatus: WriteStatus;
  analysisStatus: AnalysisStatus;
};
