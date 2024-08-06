import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import { RetrospectButton } from "./RetrospectButton";
import { RetrospectOptions } from "./RetrospectOptions";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useApiDeleteRetrospect } from "@/hooks/api/retrospect/useApiDeleteRetrospect";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RestrospectBoxType = {
  retrospectId: number;
  title: string;
  introduction: string;
  isWrite: boolean;
  retrospectStatus: "PROCEEDING" | "DONE";
  writeCount: number;
  totalCount: number;
};

const statusStyles = {
  PROCEEDING: {
    backgroundColor: DESIGN_SYSTEM_COLOR.blue50,
  },
  DONE: {
    backgroundColor: DESIGN_SYSTEM_COLOR.grey100,
  },
};

export function RetrospectBox({
  spaceId,
  retrospect,
  onDelete,
}: {
  spaceId: string | undefined;
  retrospect: RestrospectBoxType;
  onDelete: (retrospectId: number) => void;
}) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null); // optionsRef 선언
  const { retrospectId, title, introduction, retrospectStatus, isWrite, writeCount, totalCount } = retrospect;
  const { backgroundColor } = statusStyles[retrospectStatus];

  const { mutate: retrospectDelete } = useApiDeleteRetrospect();

  const removeBtnClickFun = () => {
    retrospectDelete(
      { spaceId: spaceId, retrospectId: String(retrospectId) },
      {
        onSuccess: () => {
          setIsDeleted(true);
          onDelete(retrospectId); // 삭제 후 부모 컴포넌트에 알림
        },
      },
    );
  };

  const modifyBtnClickFun = () => {
    console.log("준비중");
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
          variant="B1_BOLD"
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
                background-color: ${DESIGN_SYSTEM_COLOR.white};
                padding: 0.4rem 0.8rem;
                vertical-align: center;
                border-radius: 0.4rem;
              `}
              color="blue600"
              variant="B2_SEMIBOLD"
            >
              D-13
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
          color="grey800"
          variant="B2_SEMIBOLD"
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
        <Icon size={1.6} icon="ic_calendar" />
        <Typography color="grey500" variant="B2_SEMIBOLD">
          2024 07. 30 오전 10:00
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

          <Typography variant="B2_SEMIBOLD" color={retrospectStatus === "PROCEEDING" ? "blue700" : "grey500"}>
            {writeCount}
          </Typography>
          <Typography
            variant="B2_SEMIBOLD"
            color="grey500"
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
  );
}
