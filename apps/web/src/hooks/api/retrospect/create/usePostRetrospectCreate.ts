import { useMutation } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@layer/shared";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { RetrospectCreateReq } from "@/types/retrospectCreate";
import { useToast } from "@/hooks/useToast";
import { getDeviceType } from "@/utils/deviceUtils";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { queryClient } from "@/lib/tanstack-query/queryClient";

type PostRetrospect = { spaceId: number; body: RetrospectCreateReq };

type RetrospectCreateRes = { retrospectId: number };

export const usePostRetrospectCreate = (spaceId: number) => {
  const { isDesktop } = getDeviceType();
  const { toast } = useToast();
  const resetRetroCreateData = useResetAtom(retrospectCreateAtom);
  const navigate = useNavigate();
  const { track } = useMixpanel();
  const { closeFunnelModal } = useFunnelModal();

  const postRetrospect = async ({ spaceId, body }: PostRetrospect): Promise<RetrospectCreateRes> => {
    const res = await api.post(`/space/${spaceId}/retrospect`, body);
    return res.data as RetrospectCreateRes;
  };

  return useMutation({
    mutationFn: postRetrospect,
    onSuccess: ({ retrospectId }, variables) => {
      track("RETROSPECT_CREATE_DONE", {
        templateId: variables.body.curFormId,
        title: variables.body.title,
        deadline: variables.body.deadline,
        spaceId,
      });

      navigate(isDesktop ? PATHS.DesktopcompleteRetrospectCreate(String(spaceId)) : PATHS.completeRetrospectCreate(), {
        state: { retrospectId, spaceId, title: variables?.body?.title, introduction: variables?.body?.introduction },
      });
      resetRetroCreateData();
      queryClient.invalidateQueries({
        queryKey: ["getRetrospects", String(spaceId)],
      });
      isDesktop && closeFunnelModal();
      isDesktop && toast.success("회고가 생성되었어요!");
    },
  });
};
