import { css } from "@emotion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
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

export function RetrospectBox({ spaceId, retrospect }: { spaceId: string; retrospect: RestrospectBoxType }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { retrospectId, title, introduction, retrospectStatus, isWrite, writeCount, totalCount } = retrospect;
  const { backgroundColor } = statusStyles[retrospectStatus];

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

          <div css={{ position: "relative" }}>
            <Icon icon="ic_more" onClick={toggleOptionsVisibility} />
            {isOptionsVisible && (
              <div
                ref={optionsRef}
                css={css`
                  position: absolute;
                  top: 100%;
                  right: 0;
                  background-color: white;
                  border-radius: 1.2rem;
                  z-index: 10;
                  width: 16.5rem;
                  height: 9.2rem;

                  box-shadow: 0px 4px 12px 0px rgba(6, 8, 12, 0.12);
                `}
              >
                <button
                  onClick={() => {
                    // 여기에 회고 삭제 로직을 추가
                  }}
                  css={css`
                    display: block;
                    height: 4.6rem;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                  `}
                >
                  <Typography
                    variant="B2_SEMIBOLD"
                    color="red500"
                    css={css`
                      margin-left: 2rem;
                    `}
                  >
                    회고 삭제
                  </Typography>
                </button>
                <button
                  onClick={() => {
                    // 여기에 회고 수정 로직을 추가
                  }}
                  css={css`
                    display: block;
                    width: 100%;
                    height: 4.6rem;
                    text-align: left;
                    cursor: pointer;
                  `}
                >
                  <Typography
                    variant="B2_SEMIBOLD"
                    color="grey800"
                    css={css`
                      margin-left: 2rem;
                    `}
                  >
                    회고 수정
                  </Typography>
                </button>
              </div>
            )}
          </div>
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

type RetrospectButtonProps = {
  status: "PROCEEDING" | "DONE" | "HAS_WRITING";
  retrospectId?: number;
  spaceId?: string;
};

function RetrospectButton({ status, retrospectId, spaceId }: RetrospectButtonProps) {
  const navigate = useNavigate();
  const { color, route, text } = useMemo<{ text: string; route: readonly [string, NavigateOptions]; color: string }>(() => {
    return {
      DONE: {
        text: "분석 확인",
        route: [
          "/분석",
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_SYSTEM_COLOR.grey900,
      },
      HAS_WRITING: {
        route: [
          `/write`,
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_SYSTEM_COLOR.blue600,
        text: "회고 작성",
      },
      PROCEEDING: {
        route: [
          `/edit`,
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_SYSTEM_COLOR.blue600,
        text: "회고 수정",
      },
    }[status];
  }, [retrospectId, spaceId, status]);
  const handleNavigate = () => {
    navigate(...route);
  };
  return (
    <button
      onClick={handleNavigate}
      css={css`
        width: auto;
        height: 4rem;
        background-color: ${color};
        border-radius: 0.8rem;
        padding: 1rem 2.4rem;
      `}
    >
      <Typography
        variant="B2_SEMIBOLD"
        color="white"
        style={css`
          white-space: nowrap;
        `}
      >
        {text}
      </Typography>
    </button>
  );
}
