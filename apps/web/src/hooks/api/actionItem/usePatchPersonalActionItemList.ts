import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

/**
 * spaceId/retrospectId에 해당하는 "개인" 실행목표 리스트를 수정하는 API
 *
 * @param spaceId 스페이스 ID
 * @param retrospectId 회고 ID (새로 추가한 실행목표인 경우, id 없이 보냅니다.)
 * @param actionItems 실행목표 리스트
 */
export type PatchPersonalActionItemListProps = {
  spaceId: number;
  retrospectId: number;
  actionItems: {
    id?: number;
    content: string;
  }[];
};

export const usePatchPersonalActionItemList = () => {
  const patchPersonalActionItemList = ({ spaceId, retrospectId, actionItems }: PatchPersonalActionItemListProps) => {
    const res = api.patch(`/api/action-item/personal/space/${spaceId}/retrospect/${retrospectId}/update`, {
      actionItems,
    });
    return res;
  };

  return useMutation({
    mutationFn: patchPersonalActionItemList,
  });
};
