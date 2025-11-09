import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import ActionItemManageToggleMenu from "./ActionItemManageToggleMenu";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import ActionItemAddSection from "./ActionItemAddSection";

type ActionItemCardProps = {
  spaceId: string;
  retrospectId: number;
  title: string;
  todoList: {
    actionItemId: number;
    content: string;
  }[];
  status: "PROCEEDING" | "DONE" | string;
};

const STATUS_CONFIG = {
  PROCEEDING: {
    backgroundColor: DESIGN_TOKEN_COLOR.blue100,
    textColor: "blue600" as const,
    label: "진행 중",
  },
  DONE: {
    backgroundColor: DESIGN_TOKEN_COLOR.green100,
    textColor: "green700" as const,
    label: "완료",
  },
  DEFAULT: {
    backgroundColor: DESIGN_TOKEN_COLOR.gray100,
    textColor: "gray600" as const,
    label: "미정",
  },
};

const getStatusConfig = (status: string) => {
  if (status === "PROCEEDING") return STATUS_CONFIG.PROCEEDING;
  if (status === "DONE") return STATUS_CONFIG.DONE;
  return STATUS_CONFIG.DEFAULT;
};

export default function ActionItemCard({ spaceId, retrospectId, title, todoList, status }: ActionItemCardProps) {
  const { open: openDesktopModal, close } = useDesktopBasicModal();

  const statusStyle = getStatusConfig(status);

  const handleAddActionItem = () => {
    openDesktopModal({
      title: "실행목표 추가",
      contents: <ActionItemAddSection spaceId={spaceId} onClose={close} />,
      onClose: close,
      options: {
        enableFooter: false,
      },
    });
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
            border-radius: 0.4rem;
          `}
        >
          <Typography variant="body11SemiBold" color={statusStyle.textColor}>
            {statusStyle.label}
          </Typography>
        </div>
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
          <ActionItemManageToggleMenu spaceId={spaceId} retrospectId={retrospectId} todoList={todoList} />
        </div>
      </div>

      {/* ---------- 제목 ---------- */}
      <Typography variant="body15Bold" color="gray900">
        {title}
      </Typography>

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
