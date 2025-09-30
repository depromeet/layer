import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface GoalCardProps {
  title: string;
  todoList: string[];
  status: "실행 중" | "완료";
}

const STATUS_CONFIG = {
  "실행 중": {
    backgroundColor: DESIGN_TOKEN_COLOR.blue100,
    textColor: "blue600" as const,
  },
  완료: {
    backgroundColor: DESIGN_TOKEN_COLOR.green100,
    textColor: "green700" as const,
  },
};

export default function GoalCard({ title, todoList, status }: GoalCardProps) {
  const statusStyle = STATUS_CONFIG[status];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 1.2rem;
        transition: all 0.2s ease;
        cursor: pointer;
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
            {status}
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            gap: 0.6rem;
            align-items: center;
          `}
        >
          <Icon icon="ic_plus" size={1.2} color={DESIGN_TOKEN_COLOR.gray500} />
          <Icon icon="ic_more" size={2.0} color={DESIGN_TOKEN_COLOR.gray500} />
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
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 0.8rem;
              `}
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
            </div>
          ) : (
            todoList.map((todo) => (
              <div
                key={todo}
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
                  {todo}
                </Typography>
              </div>
            ))
          )}
        </Typography>
      </div>
    </div>
  );
}
