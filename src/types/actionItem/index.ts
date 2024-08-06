export type ActionItemType = {
  actionItemContent: string;
  actionItemId: number;
  retrospectId: number;
  retrospectName: string;
};

export type TeamActionItemType = {
  retrospectId: string;
  retrospectTitle: string;
  teamActionItemList: ActionItemType[];
};
