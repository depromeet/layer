import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import ActionItemManageToggleMenu from "./ActionItemManageToggleMenu";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import ActionItemAddSection from "./ActionItemAddSection";
import { useAtomValue } from "jotai";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { isSpaceLeader } from "@/utils/userUtil";
import { trackEvent } from "@/lib/google-analytics";
import { GA_EVENTS } from "@/lib/google-analytics/events";
import { formatDateToString } from "@/utils/formatDate";

type ActionItemCardProps = {
  spaceId: number;
  retrospectId: number;
  title: string;
  deadline?: string;
  todoList: {
    actionItemId: number;
    content: string;
  }[];
  status: "PROCEEDING" | "DONE" | string;
  variant?: "team" | "personal";
};

const STATUS_CONFIG = {
  PROCEEDING: {
    backgroundColor: DESIGN_TOKEN_COLOR.blue100,
    textColor: "blue600" as const,
    borderColor: "transparent",
    label: "실행 중",
  },
  DONE: {
    backgroundColor: "rgba(33, 35, 41, 0.1)",
    textColor: "gray900" as const,
    borderColor: DESIGN_TOKEN_COLOR.gray500,
    label: "완료",
  },
  DEFAULT: {
    backgroundColor: DESIGN_TOKEN_COLOR.gray100,
    textColor: "gray600" as const,
    borderColor: "transparent",
    label: "미정",
  },
};

const getStatusConfig = (status: string) => {
  if (status === "PROCEEDING") return STATUS_CONFIG.PROCEEDING;
  if (status === "DONE") return STATUS_CONFIG.DONE;
  return STATUS_CONFIG.DEFAULT;
};

export default function ActionItemCard({ spaceId, retrospectId, title, deadline, todoList, status, variant = "team" }: ActionItemCardProps) {
  const currentSpace = useAtomValue(currentSpaceState);
  const { open: openDesktopModal, close } = useDesktopBasicModal();

  const { leader } = currentSpace || {};
  const isLeader = isSpaceLeader(leader?.id);
  // * 개인 실행목표는 본인 항목이므로 리더 여부와 무관하게 본인이 관리할 수 있다.
  const canManage = variant === "personal" ? true : isLeader;

  const statusStyle = getStatusConfig(status);

  const handleAddActionItem = () => {
    openDesktopModal({
      title: "실행목표 추가",
      contents: <ActionItemAddSection spaceId={spaceId} retrospectId={retrospectId} onClose={close} variant={variant} />,
      onClose: close,
      options: {
        enableFooter: false,
      },
    });

    trackEvent(GA_EVENTS.ACTION_ITEM.ADD);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 1.2rem;
        transition: all 0.2s ease;
      `}
    >
      {/* ---------- 상단 라벨 ---------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 2.2rem;
            padding: 0.3rem 0.6rem;
            background-color: ${statusStyle.backgroundColor};
            border: 1px solid ${statusStyle.borderColor};
            border-radius: 0.4rem;
          `}
        >
          <Typography variant="body11SemiBold" color={statusStyle.textColor}>
            {statusStyle.label}
          </Typography>
        </div>
        {canManage && (
          <div
            css={css`
              display: flex;
              gap: 0.6rem;
              align-items: center;
            `}
          >
            <button
              type="button"
              css={css`
                cursor: pointer;
              `}
              onClick={handleAddActionItem}
            >
              <Icon
                icon="ic_plus"
                size={1.4}
                css={css`
                  margin-top: 0.3rem;
                  color: ${DESIGN_TOKEN_COLOR.gray500};
                `}
              />
            </button>
            <ActionItemManageToggleMenu spaceId={spaceId} retrospectId={retrospectId} todoList={todoList} variant={variant} />
          </div>
        )}
      </div>

      {/* ---------- 제목 ---------- */}
      <Typography variant="body15Bold" color="gray900">
        {title}
      </Typography>

      {/* ---------- 날짜 ---------- */}
      {deadline && (
        <Typography
          variant="body14Medium"
          color="gray500"
          css={css`
            margin-top: 0.4rem;
          `}
        >
          {formatDateToString(new Date(deadline), ".")}
        </Typography>
      )}

      {/* ---------- 할 일 목록 ----------*/}
      <div
        css={css`
          margin-top: 0.8rem;
          flex: 1;
        `}
      >
        <Typography
          variant="body12SemiBold"
          color="gray800"
          css={css`
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `}
        >
          {todoList.length === 0 ? (
            canManage ? (
              <button
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.8rem;
                `}
                onClick={handleAddActionItem}
              >
                <div
                  css={css`
                    width: 1.2rem;
                    height: 1.2rem;
                    background-color: ${DESIGN_TOKEN_COLOR.gray100};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.4rem;
                  `}
                >
                  <Icon icon="ic_plus" size={0.8} color={DESIGN_TOKEN_COLOR.gray500} />
                </div>
                <Typography variant="body14Medium" color="gray500">
                  실행목표 추가하기
                </Typography>
              </button>
            ) : (
              <Typography variant="body14Medium" color="gray500">
                등록된 실행목표가 없어요
              </Typography>
            )
          ) : (
            todoList.map((todo) => (
              <div
                key={todo.actionItemId}
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.6rem;
                `}
              >
                <div
                  css={css`
                    width: 3.5px;
                    height: 3.5px;
                    border-radius: 50%;
                    background-color: ${DESIGN_TOKEN_COLOR.gray400};
                    flex-shrink: 0;
                  `}
                />
                <Typography variant="body14Medium" color="gray900">
                  {todo.content}
                </Typography>
              </div>
            ))
          )}
        </Typography>
      </div>
    </div>
  );
}
