import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";

import { RetrospectButton } from "./RetrospectButton";
import { RetrospectOptions } from "./RetrospectOptions";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { RetrospectEditModal } from "@/component/space/view/RetrospectEditModal";
import { useApiDeleteRetrospect } from "@/hooks/api/retrospect/useApiDeleteRetrospect";
import { useModal } from "@/hooks/useModal";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Retrospect } from "@/types/retrospect";
import { formatDateAndTime, calculateDeadlineRemaining } from "@/utils/date";

const statusStyles = {
  PROCEEDING: {
    backgroundColor: DESIGN_TOKEN_COLOR.blue50,
  },
  DONE: {
    backgroundColor: DESIGN_TOKEN_COLOR.gray100,
  },
};

export function RetrospectBox({
  spaceId,
  retrospect,
  onDelete,
}: {
  spaceId: string;
  retrospect: Retrospect;
  onDelete: (retrospectId: number) => void;
}) {
  const { open } = useModal();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { retrospectId, title, introduction, retrospectStatus, isWrite, writeCount, totalCount, deadline } = retrospect;
  const { backgroundColor } = statusStyles[retrospectStatus];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: retrospectDelete } = useApiDeleteRetrospect();

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
      <div
        key={retrospectId}
        css={css`
          width: 100%;
          height: auto;
          background-color: ${backgroundColor};
          border-radius: 1rem;
          padding: 2rem 2rem 1.8rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: opacity 0.3s ease-out;
          opacity: ${isDeleted ? 0 : 1};
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
          `}
        >
          <Typography
            variant="title16Bold"
            css={css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {title}
          </Typography>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            {retrospectStatus === "PROCEEDING" && (
              <Typography
                css={css`
                  background-color: ${DESIGN_TOKEN_COLOR.gray00};
                  padding: 0.4rem 0.8rem;
                  vertical-align: center;
                  border-radius: 0.4rem;
                `}
                color="blue600"
                variant="B2_SEMIBOLD"
              >
                {calculateDeadlineRemaining(deadline)}
              </Typography>
            )}

            <RetrospectOptions
              isOptionsVisible={isOptionsVisible}
              toggleOptionsVisibility={toggleOptionsVisibility}
              removeBtnClickFun={removeBtnClickFun}
              modifyBtnClickFun={modifyBtnClickFun}
              optionsRef={optionsRef}
            />
          </div>
        </div>
        {introduction && (
          <Typography
            color="gray800"
            variant="body14Medium"
            css={css`
              display: -webkit-box;
              -webkit-line-clamp: 2;
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
            gap: 0.4rem;
            position: relative;
            left: -0.1rem;
          `}
        >
          <Icon size={1.6} icon="ic_calendar" color={DESIGN_TOKEN_COLOR.gray500} />
          <Typography color="gray500" variant="body14Medium">
            {formatDateAndTime(deadline)}
          </Typography>
        </div>

        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 0.6rem;
          `}
        >
          <div
            css={css`
              width: 100%;
              height: 4rem;
              display: flex;
              align-items: flex-end;
              gap: 0.3rem;
            `}
          >
            <Icon
              icon={retrospectStatus === "PROCEEDING" ? "ic_person" : "ic_darkPerson"}
              size={2.4}
              css={css`
                position: relative;
                top: 0.2rem;
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
              `}
            >
              / {totalCount}
            </Typography>
          </div>
          <RetrospectButton
            status={retrospectStatus === "PROCEEDING" && isWrite ? "HAS_WRITING" : retrospectStatus}
            retrospectId={retrospectId}
            spaceId={spaceId}
          />
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
