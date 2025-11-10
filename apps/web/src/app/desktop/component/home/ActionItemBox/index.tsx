import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { PersonalActionItemType } from "@/types/actionItem";
import { formatOnlyDate } from "@/utils/date";
import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useNavigate } from "react-router-dom";

type ActionItemBoxProps = {
  actionItem: PersonalActionItemType;
};

export default function ActionItemBox({ actionItem }: ActionItemBoxProps) {
  const navigate = useNavigate();

  const { retrospectTitle, spaceName, deadline, actionItemList, spaceId, retrospectId } = actionItem;

  const handleRetrospectClick = () => {
    navigate(PATHS.retrospectAnalysis(String(spaceId), retrospectId, retrospectTitle));
  };

  return (
    <section
      css={css`
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
          <Typography
            variant="body14Medium"
            color="gray500"
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {spaceName} | 회고 마감일 {deadline ? formatOnlyDate(deadline) : "없음"}
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            cursor: pointer;
            flex-shrink: 0;

            transition: background-color 0.2s ease-in-out;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray300};
            }
          `}
          onClick={handleRetrospectClick}
        >
          <Icon icon="ic_after" size={1.2} color={DESIGN_TOKEN_COLOR.gray800} />
        </div>
      </section>

      {/* ---------- 실행목표 리스트 ---------- */}
      {actionItemList && actionItemList.length > 0 ? (
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
          {actionItemList.slice(0, 3).map((actionItem) => (
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
      ) : (
        <div
          css={css`
            margin-top: 4.8rem;
            padding: 2rem;
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
