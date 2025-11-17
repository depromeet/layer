import { useParams } from "react-router-dom";
import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Icon } from "@/component/common/Icon";
import { useQuery } from "@tanstack/react-query";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useMemo } from "react";
import RetrospectCard from "@/app/desktop/component/home/RetrospectCard";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { useModal } from "@/hooks/useModal";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useActionModal } from "@/hooks/useActionModal";
import { RetrospectCreate } from "@/app/desktop/component/retrospectCreate";
import { TemplateChoice } from "@/app/desktop/component/retrospect/choice";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";

export default function InProgressRetrospects() {
  const { spaceId } = useParams();

  // * 스페이스 회고 목록 조회
  const { data: retrospects, isPending: isPendingRetrospects } = useQuery(useApiOptionsGetRetrospects(spaceId));

  // * 스페이스 정보 조회
  const { data: spaceInfo } = useQuery(useApiOptionsGetSpaceInfo(spaceId));

  const { open } = useModal();
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();

  const setRetrospectValue = useSetAtom(retrospectInitialState);

  const proceedingRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING") || [], [retrospects]);

  // 회고 추가 함수
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

  if (isPendingRetrospects) {
    return <LoadingSpinner />;
  }

  return (
    <section
      css={css`
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: 30rem;
      `}
    >
      <Typography variant="title16Bold">진행 중인 회고 {proceedingRetrospects.length}</Typography>

      {proceedingRetrospects.length === 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20rem 2rem;
            text-align: center;
            gap: 2.4rem;
            border: 1px dashed rgba(0, 0, 0, 0.12);
            border-radius: 1.2rem;
            margin-top: 1.6rem;
            margin-bottom: 1.6rem;
            flex: 1;
          `}
        >
          <Icon icon="ic_new_clock" size={7.2} color={DESIGN_TOKEN_COLOR.gray500} />
          <Typography variant="body16Medium" color="gray500">
            진행 중인 회고가 비어있어요 <br />
            회고를 작성해 보세요!
          </Typography>
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
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1.6rem;
            padding-top: 1.6rem;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 2rem;
          `}
        >
          {proceedingRetrospects.map((retrospect) => (
            <RetrospectCard key={retrospect.retrospectId} retrospect={retrospect} spaceId={spaceId} />
          ))}
        </div>
      )}
    </section>
  );
}
