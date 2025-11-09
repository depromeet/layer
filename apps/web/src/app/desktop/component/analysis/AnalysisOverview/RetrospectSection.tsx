import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import type { Retrospect } from "@/types/retrospect";
import RetrospectCard from "../../home/RetrospectCard";
import { Icon } from "@/component/common/Icon";
import { useQuery } from "@tanstack/react-query";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { useModal } from "@/hooks/useModal";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useActionModal } from "@/hooks/useActionModal";
import { RetrospectCreate } from "../../retrospectCreate";
import { TemplateChoice } from "../../retrospect/choice";

interface RetrospectSectionProps {
  title: string;
  isPending: boolean;
  retrospects: Retrospect[];
  emptyMessage: string;
  spaceId?: string | null;
  needRetrospectAddButton?: boolean;
  enableScroll?: boolean;
}

const determineStatus = (isPending: boolean, retrospects: Retrospect[]): "loading" | "empty" | "success" => {
  if (isPending) {
    return "loading";
  }
  if (retrospects.length === 0) {
    return "empty";
  }
  return "success";
};

export default function RetrospectSection({
  title,
  isPending,
  retrospects,
  emptyMessage,
  spaceId,
  needRetrospectAddButton = false,
  enableScroll = true,
}: RetrospectSectionProps) {
  const { open } = useModal();
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();

  const status = determineStatus(isPending, retrospects);

  const setRetrospectValue = useSetAtom(retrospectInitialState);

  const { data: spaceInfo } = useQuery(useApiOptionsGetSpaceInfo(spaceId || undefined));

  // *회고 추가 함수
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
          openActionModal({
            title: "",
            contents: <TemplateChoice />,
          });
        },
      });
    }
  };

  const contentMap = {
    // * Loading 상태인 경우
    loading: (
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 13.8rem;
          border-radius: 1.2rem;
          border: 1px dashed ${DESIGN_TOKEN_COLOR.gray500};
        `}
      >
        <LoadingSpinner />
      </div>
    ),

    // * 회고가 없는 경우
    empty: (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.6rem 2rem 4rem;
          text-align: center;
          gap: 2.4rem;
          width: 100%;
          height: 28rem;
        `}
      >
        <Icon icon="ic_new_clock" size={7.2} color={DESIGN_TOKEN_COLOR.gray500} />
        <Typography
          variant="body16Medium"
          color="gray500"
          css={css`
            white-space: pre-line;
          `}
        >
          {emptyMessage}
        </Typography>
        {needRetrospectAddButton && (
          <button
            css={css`
              padding: 0.8rem 1.2rem;
              border-radius: 0.8rem;
              border: 1px solid ${DESIGN_TOKEN_COLOR.gray400};
              color: ${DESIGN_TOKEN_COLOR.gray700};
            `}
            onClick={handleRetrospectCreate}
          >
            회고 추가하기
          </button>
        )}
      </div>
    ),

    // * 회고가 있는 경우
    success: retrospects.map((retrospect) => <RetrospectCard key={retrospect.retrospectId} retrospect={retrospect} spaceId={spaceId} />),
  };

  return (
    <>
      <section
        css={css`
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 0.6rem;
          margin-top: 3.2rem;
          max-height: ${enableScroll ? "100rem" : "none"};
          overflow-y: ${enableScroll ? "auto" : "hidden"};
        `}
      >
        {/* ---------- 제목 ---------- */}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.6rem;
          `}
        >
          <Typography variant="title16Strong" color="gray900">
            {title}
          </Typography>
          <Typography variant="title16Strong" color="gray600">
            {retrospects.length}
          </Typography>
        </div>

        {/* ---------- 회고 컨텐츠 ---------- */}
        <section
          css={css`
            margin-top: 1.6rem;
            display: flex;
            flex: 1;
            overflow-y: auto;
            flex-direction: column;
            gap: 1.2rem;
            width: 100%;
          `}
        >
          {contentMap[status]}
        </section>
      </section>
    </>
  );
}
