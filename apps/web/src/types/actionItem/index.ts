export type ActionItemType = {
  content: string;
  actionItemId: number;
  retrospectId: number;
  retrospectName: string;
};

export type ExtendedActionItemType = {
  retrospectId: number;
  retrospectTitle: string;
  deadline: string;
  status: "PROCEEDING" | "DONE";
  actionItemList: {
    actionItemId: number;
    content: string;
  }[];
};

export type TeamActionItemType = {
  spaceId: string;
  spaceName: string;
  teamActionItemList: ExtendedActionItemType[];
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
