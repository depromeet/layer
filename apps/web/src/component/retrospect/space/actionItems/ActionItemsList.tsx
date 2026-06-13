import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useApiOptionsGetTeamActionItemList } from "@/hooks/api/actionItem/useApiOptionsGetTeamActionItemList";
import { useApiOptionsGetPersonalActionItemListBySpace } from "@/hooks/api/actionItem/useApiOptionsGetPersonalActionItemListBySpace";
import { ExtendedActionItemType } from "@/types/actionItem";

import ActionItemCard from "./ActionItemCard";

type ActionItemsListProps = {
  currentTab: "팀" | "개인";
};

// * 진행 중(PROCEEDING) → 지난(DONE) 순으로 정렬한다. (status가 같으면 API 반환 순서 유지)
const STATUS_ORDER: Record<string, number> = { PROCEEDING: 0, DONE: 1 };
const sortByStatus = (list: ExtendedActionItemType[]) =>
  [...list].sort((a, b) => (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99));

export default function ActionItemsList({ currentTab }: ActionItemsListProps) {
  const params = useParams();
  const spaceId = Number(params.spaceId);
  const isTeam = currentTab === "팀";

  const { data: teamData, isLoading: isTeamLoading } = useQuery({
    ...useApiOptionsGetTeamActionItemList(spaceId),
    enabled: !!spaceId && isTeam,
  });
  const { data: personalData, isLoading: isPersonalLoading } = useQuery({
    ...useApiOptionsGetPersonalActionItemListBySpace(spaceId),
    enabled: !!spaceId && !isTeam,
  });

  // * 현재 탭의 쿼리만 로딩으로 본다. (비활성 쿼리는 isLoading=false)
  const isLoading = isTeam ? isTeamLoading : isPersonalLoading;
  const rawActionItems = isTeam ? teamData?.teamActionItemList : personalData?.personalActionItemList;
  const currentActionItems = rawActionItems ? sortByStatus(rawActionItems) : undefined;

  return (
    <section
      css={css`
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      {isLoading ? (
        <div
          css={css`
            position: relative;
            flex: 1;
            min-height: 22.8rem;
          `}
        >
          <LoadingSpinner />
        </div>
      ) : currentActionItems?.length === 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 14rem 2rem;
            text-align: center;
            gap: 1.2rem;
            flex: 1;
          `}
        >
          <Icon icon="ic_folder" size={4.8} color={DESIGN_TOKEN_COLOR.gray500} />
          <Typography variant="body15Medium" color="gray500">
            아직 실행목표가 없어요
          </Typography>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-top: 1.2rem;
          `}
        >
          {currentActionItems?.map((goal, index) => (
            <div key={goal.retrospectId}>
              <ActionItemCard
                spaceId={spaceId}
                retrospectId={goal.retrospectId}
                title={goal.retrospectTitle}
                deadline={goal.deadline}
                todoList={goal.actionItemList}
                status={goal.status}
                variant={isTeam ? "team" : "personal"}
              />
              {index < currentActionItems.length - 1 && (
                <div
                  css={css`
                    width: 100%;
                    height: 1px;
                    background-color: ${DESIGN_TOKEN_COLOR.gray100};
                    margin: 2rem 0;
                  `}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
