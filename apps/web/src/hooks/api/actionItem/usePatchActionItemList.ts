import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

/**
 * retrospectId에 해당하는 실행목표 리스트를 수정하는 API
 *
 * @param retrospectId 회고 ID (새로 추가한 실행목표인 경우, id 없이 보냅니다.)
 * @param actionItems 실행목표 리스트
 */
export type retrospectIdProps = {
  retrospectId: number;
  actionItems: {
    id?: number;
    content: string;
  }[];
};

export const usePatchActionItemList = () => {
  const patchActionItemList = ({ retrospectId, actionItems }: retrospectIdProps) => {
    const res = api.patch(`/api/action-item/retrospect/${retrospectId}/update`, {
      actionItems: actionItems,
    });
    return res;
  };

  return useMutation({
    mutationFn: ({ retrospectId, actionItems }: retrospectIdProps) => patchActionItemList({ retrospectId, actionItems }),
  });
};
