import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { PersonalActionItemType } from "@/types/actionItem";
import { formatOnlyDate } from "@/utils/date";
import { css } from "@emotion/react";

type ActionItemBoxProps = {
  actionItem: PersonalActionItemType;
};

export default function ActionItemBox({ actionItem }: ActionItemBoxProps) {
  const { retrospectTitle, spaceName, deadline, actionItemList } = actionItem;

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        width: 27.7rem;
      `}
    >
      {/* ---------- 회고 제목 ---------- */}
      <section
        css={css`
          display: flex;
          align-items: center;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          padding: 1.6rem;
          border-radius: 0.8rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            flex: 1;
            min-width: 0;
          `}
        >
          <Typography variant="title16Bold" color="gray900">
            {retrospectTitle}
          </Typography>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.6rem;
            `}
          >
            <Typography
              variant="body14Medium"
              color="gray500"
              css={css`
                white-space: nowrap;
              `}
            >
              {spaceName}
            </Typography>
            <div
              css={css`
                width: 0.1rem;
                height: 1.2rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray400};
                flex-shrink: 0;
              `}
            />
            <Typography
              variant="body14Medium"
              color="gray500"
              css={css`
                white-space: nowrap;
              `}
            >
              회고 마감일 {deadline ? formatOnlyDate(deadline) : "없음"}
            </Typography>
          </div>
        </div>
      </section>

      {/* ---------- 실행목표 리스트 ---------- */}
      {actionItemList && actionItemList.length > 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            padding: 0 0.4rem;
          `}
        >
          {actionItemList.slice(0, 3).map((item) => (
            <div
              key={item.actionItemId}
              css={css`
                display: flex;
                align-items: center;
                gap: 0.8rem;
                height: 4.6rem;
                padding: 0.8rem 0;
              `}
            >
              <span
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 1.4rem;
                  flex-shrink: 0;
                `}
              >
                <span
                  css={css`
                    width: 0.4rem;
                    height: 0.4rem;
                    border-radius: 50%;
                    background-color: ${DESIGN_TOKEN_COLOR.gray400};
                  `}
                />
              </span>
              <Typography variant="body16Medium" color="gray900">
                {item.content}
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <div
          css={css`
            margin-top: 4.8rem;
            padding: 1.2rem 2rem;
            text-align: center;
          `}
        >
          <Typography variant="body14Medium" color="gray500">
            아직 실행목표가 없어요
          </Typography>
        </div>
      )}
    </section>
  );
}
