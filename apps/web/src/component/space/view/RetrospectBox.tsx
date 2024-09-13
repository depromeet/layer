import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ProceedingTextBox } from "./ProceedingTextBox";
import { RetrospectOptions } from "./RetrospectOptions";

import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Typography } from "@/component/common/typography";
import { RetrospectEditModal } from "@/component/space/view/RetrospectEditModal";
import { useApiCloseRetrospect } from "@/hooks/api/retrospect/close/useApiCloseRetrospect.ts";
import { useApiDeleteRetrospect } from "@/hooks/api/retrospect/useApiDeleteRetrospect";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Retrospect } from "@/types/retrospect";
import { formatDateAndTime } from "@/utils/date";

const statusStyles = {
  PROCEEDING: DESIGN_TOKEN_COLOR.blue50,
  DONE: DESIGN_TOKEN_COLOR.gray100,
};

export function RetrospectBox({
  spaceId,
  retrospect,
  onDelete,
  isLeader,
  refetchRestrospectData,
}: {
  spaceId: string;
  retrospect: Retrospect;
  onDelete: (retrospectId: number) => void;
  refetchRestrospectData?: () => void;
  isLeader: boolean;
}) {
  const navigate = useNavigate();
  const { open } = useModal();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { retrospectId, title, introduction, retrospectStatus, writeStatus, analysisStatus, writeCount, totalCount, deadline } = retrospect;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  const { mutate: retrospectDelete } = useApiDeleteRetrospect();
  const { mutate: retrospectClose, isPending } = useApiCloseRetrospect();

  const boxClickFun = () => {
    const { analysisStatus, retrospectStatus, writeStatus } = retrospect;

    const navigateToAnalysis = (defaultTab?: "분석" | "") =>
      navigate(PATHS.retrospectAnalysis(spaceId, retrospectId), { state: { title, ...(defaultTab && { defaultTab }) } });

    if (analysisStatus === "DONE") {
      navigateToAnalysis("분석");
      return;
    }

    if (retrospectStatus === "PROCEEDING") {
      if (analysisStatus === "NOT_STARTED" && (writeStatus === "NOT_STARTED" || writeStatus === "PROCEEDING")) {
        navigate(PATHS.write(), {
          state: {
            title,
            introduction,
            retrospectId,
            spaceId,
          },
        });
      } else {
        navigateToAnalysis();
      }
    } else {
      navigateToAnalysis("분석");
    }
  };

  const closeBtnClickFun = () => {
    open({
      title: "회고를 마감할까요?",
      contents: "회고를 마감하면\n 더 이상의 회고 수정이 불가해요",
      options: {
        buttonText: ["취소", "마감하기"],
      },
      onConfirm: () => {
        retrospectClose(
          { spaceId: spaceId, retrospectId: retrospectId },
          {
            onSuccess: () => refetchRestrospectData && refetchRestrospectData(),
            onError: () => toast.error("회고 마감을 실패하였습니다"),
          },
        );
      },
    });
  };

  const removeBtnClickFun = () => {
    open({
      title: "회고를 삭제하시겠어요?",
      contents: "삭제하면 다시 되돌릴 수 없어요",
      options: {
        buttonText: ["취소", "삭제"],
      },
      onConfirm: () => {
        retrospectDelete(
          { spaceId: spaceId, retrospectId: String(retrospectId) },
          {
            onSuccess: () => {
              setIsDeleted(true);
              onDelete(retrospectId);
            },
          },
        );
      },
    });
  };

  const modifyBtnClickFun = () => {
    setIsEditModalOpen(true);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setIsOptionsVisible(false);
    }
  };

  useEffect(() => {
    if (isOptionsVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionsVisible]);

  if (isDeleted) {
    return null;
  }

  return (
    <>
      {isPending && <LoadingModal purpose={"선택하신 회고를 마감하고있어요"} />}
      <div
        key={retrospectId}
        onClick={boxClickFun}
        css={css`
          width: 100%;
          height: auto;
          background-color: ${retrospect.retrospectStatus === "PROCEEDING" ? statusStyles.PROCEEDING : statusStyles.DONE};
          border-radius: 1rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          position: relative;
          transition: opacity 0.3s ease-out;
          opacity: ${isDeleted ? 0 : 1};
          cursor: pointer;
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
          `}
        >
          <ProceedingTextBox writeStatus={writeStatus} analysisStatus={analysisStatus} />
          {isLeader && (
            <RetrospectOptions
              retrospectStatus={retrospect.retrospectStatus}
              isOptionsVisible={isOptionsVisible}
              toggleOptionsVisibility={toggleOptionsVisibility}
              removeBtnClickFun={removeBtnClickFun}
              modifyBtnClickFun={modifyBtnClickFun}
              closeBtnClickFun={retrospectStatus === "PROCEEDING" ? closeBtnClickFun : undefined}
              optionsRef={optionsRef}
            />
          )}
        </div>
        <Typography
          variant="title16Bold"
          css={css`
            margin-top: 0.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          {title}
        </Typography>
        {introduction && (
          <Typography
            color="gray800"
            variant="body14Medium"
            css={css`
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {introduction}
          </Typography>
        )}
        <div
          css={css`
            margin-top: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.4rem;
            position: relative;
            left: -0.1rem;
          `}
        >
          <Typography color="gray500" variant="body14Medium">
            {retrospect.deadline == null ? (
              <>모든 인원 제출 시 마감</>
            ) : (
              <>
                {" "}
                {retrospect.retrospectStatus === "DONE" ? "마감일" : "마감 예정일"} | {formatDateAndTime(deadline)}
              </>
            )}
          </Typography>
          <div
            css={css`
              height: auto;
              display: flex;
              flex-wrap: nowrap;
              align-items: center;
              margin-top: 0.1rem;
            `}
          >
            <Icon
              icon={retrospectStatus === "PROCEEDING" ? "ic_person" : "ic_darkPerson"}
              size={2.4}
              css={css`
                margin-right: 0.2rem;
              `}
            />

            <Typography variant="subtitle14SemiBold" color={retrospectStatus === "PROCEEDING" ? "blue600" : "grey500"}>
              {writeCount}
            </Typography>
            <Typography
              variant="subtitle14SemiBold"
              color="gray500"
              css={css`
                margin: 0 0.2rem;
                white-space: nowrap;
              `}
            >
              / {totalCount}
            </Typography>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <RetrospectEditModal
          spaceId={spaceId}
          retrospectId={retrospectId.toString()}
          defaultValue={{ title, introduction, deadline }}
          close={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}
