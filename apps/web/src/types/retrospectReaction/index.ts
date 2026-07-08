export const RETROSPECT_REACTIONS = {
  LEC01: { icon: "amazing", label: "대단해", color: "blue" },
  LEC02: { icon: "perfect", label: "완벽해", color: "blue" },
  LEC03: { icon: "best", label: "최고야", color: "blue" },
  LEC04: { icon: "asExpected", label: "역시", color: "blue" },
  LEC05: { icon: "appreciation", label: "고생했어", color: "purple" },
  LEC06: { icon: "anticipation", label: "기대중", color: "purple" },
  LEC07: { icon: "itsOkay", label: "괜찮아", color: "green" },
  LEC08: { icon: "growth", label: "성장했다", color: "green" },
  LEC09: { icon: "cheerUp", label: "화이팅", color: "red" },
  LEC10: { icon: "youCanDoIt", label: "할 수 있다", color: "red" },
} as const;

export type RetrospectReactionCode = keyof typeof RETROSPECT_REACTIONS;

export type RetrospectReaction = {
  retrospectReactionId: number;
  emojiCode: RetrospectReactionCode;
  description: string;
  memberId: number;
  memberName: string;
  memberProfileImgUrl: string | null;
};

export type RetrospectReactionMember = Pick<RetrospectReaction, "memberId" | "memberName" | "memberProfileImgUrl">;

export type AnswerReaction = {
  answerId: number;
  reactions: RetrospectReaction[];
};

export type RetrospectReactionResponse = {
  answerReactions: AnswerReaction[];
};
