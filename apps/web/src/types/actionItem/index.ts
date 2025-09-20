export type ActionItemType = {
  content: string;
  actionItemId: number;
  retrospectId: number;
  retrospectName: string;
};

export type TeamActionItemType = {
  retrospectId: string;
  retrospectTitle: string;
  teamActionItemList: ActionItemType[];
};

export type PersonalActionItemType = {
  retrospectId: number;
  retrospectTitle: string;
  spaceId: number;
  spaceName: string;
  status: "PROCEEDING" | "DONE";
  deadline: string;
  actionItemList: {
    actionItemId: number;
    content: string;
  }[];
};

export type PersonalActionItemListType = {
  actionItems: PersonalActionItemType[];
};
