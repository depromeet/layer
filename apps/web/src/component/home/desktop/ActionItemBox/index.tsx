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
        width: 27.7rem;
      `}
    >
      {/* ---------- 회고 제목 ---------- */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          padding: 1.6rem;
          border-radius: 0.8rem;
          flex: 1;
        `}
      >
        <Typography variant="title16Bold" color="gray900">
          {retrospectTitle}
        </Typography>
        <Typography variant="body14Medium" color="gray500">
          {spaceName} | 회고 마감일 {deadline ? formatOnlyDate(deadline) : "없음"}
        </Typography>
      </div>

      {/* ---------- 실행목표 리스트 ---------- */}
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 2.4rem;
          list-style: disc;
          padding-left: 2.6rem;
          margin-top: 2.4rem;
          gap: 2rem;

          li::marker {
            color: ${DESIGN_TOKEN_COLOR.gray400};
            font-size: 2rem;
          }
        `}
      >
        {actionItemList.map((actionItem) => (
          <li
            key={actionItem.actionItemId}
            css={css`
              padding-left: 0.8rem;
            `}
          >
            <Typography variant="body16Medium" color="gray900">
              {actionItem.content}
            </Typography>
          </li>
        ))}
      </ul>
    </section>
  );
}
