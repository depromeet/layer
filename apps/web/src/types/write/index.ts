export type RetrospectType = "plain_text" | "range" | "number" | "combobox" | "card" | "markdown";

export interface QuestionData {
  isTemporarySaved: boolean;
  questions: {
    order: number;
    question: string;
    questionId: number;
    questionType: RetrospectType;
  }[];
}

export interface RetrospectWriteType {
  spaceId: number;
  retrospectId: number;
  title: string;
  introduction: string;
}
