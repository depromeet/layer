type QueryId = number | null | undefined;

export const retrospectReactionQueryKeys = {
  all: ["retrospectReactions"] as const,
  list: (spaceId: QueryId, retrospectId: QueryId) => [...retrospectReactionQueryKeys.all, spaceId, retrospectId] as const,
};
