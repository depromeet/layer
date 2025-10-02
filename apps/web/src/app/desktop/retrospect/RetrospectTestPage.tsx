import { useModal } from "@/hooks/useModal";
import { css } from "@emotion/react";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useQueries } from "@tanstack/react-query";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { RetrospectCreate } from "../retrospectCreate/RetrospectCreate";
import { useAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { useEffect } from "react";
import { RecommendTemplatePage } from "./template/RecommendTemplatePage";

/**
 * 회고 생성 모달을 위한 임시 페이지입니다.
 * 추후 analysis, template 폴더 생성 후 작업할 예정입니다.
 */
export function RetrospectTestPage() {
  const { open } = useModal();
  const { openFunnelModal } = useFunnelModal();
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  const [_, setRetrospectValue] = useAtom(retrospectInitialState);

  const [{ data: spaceInfo }] = useQueries({
    queries: [useApiOptionsGetSpaceInfo(spaceId)],
  });

  useEffect(() => {
    setRetrospectValue((prev) => ({
      ...prev,
      spaceId,
    }));
  }, [spaceId, setRetrospectValue]);

  const handleRetrospectCreate = () => {
    if (spaceInfo?.formId) {
      setRetrospectValue((prev) => ({
        ...prev,
        templateId: String(spaceInfo.formId),
      }));

      open({
        title: "전에 진행했던 템플릿이 있어요!\n계속 진행하시겠어요?",
        contents: "",
        options: {
          buttonText: ["재설정", "진행하기"],
        },
        onConfirm: () => {
          openFunnelModal({
            title: "",
            step: "retrospectCreate",
            contents: <RetrospectCreate />,
          });
        },
        onClose: () => {
          setRetrospectValue((prev) => ({
            ...prev,
            templateId: "",
          }));

          openFunnelModal({
            title: "",
            step: "template",
            contents: <RecommendTemplatePage />,
          });
        },
      });
    }
  };

  return (
    <div>
      <button
        css={css`
          border: 1px solid rgba(0, 0, 0, 0.3);
          padding: 5px 10px;
        `}
        onClick={handleRetrospectCreate}
      >
        회고 생성 버튼
      </button>
    </div>
  );
}
