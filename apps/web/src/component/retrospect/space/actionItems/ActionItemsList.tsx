import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useApiOptionsGetTeamActionItemList } from "@/hooks/api/actionItem/useApiOptionsGetTeamActionItemList";

import ActionItemCard from "./ActionItemCard";

type ActionItemsListProps = {
  currentTab: "진행중" | "지난";
};

export default function ActionItemsList({ currentTab }: ActionItemsListProps) {
  const params = useParams();
  const spaceId = params.spaceId as string;

  // * 팀 실행목표 리스트 조회
  const { data } = useQuery(useApiOptionsGetTeamActionItemList(spaceId));

  const inProgressActionItems = data?.teamActionItemList.filter((goal) => goal.status === "PROCEEDING");
  const doneActionItems = data?.teamActionItemList.filter((goal) => goal.status === "DONE");
  const currentActionItems = currentTab === "진행중" ? inProgressActionItems : doneActionItems;

  return (
    <section
      css={css`
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      {currentActionItems?.length === 0 ? (
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
            완료된 회고가 없어요
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
                todoList={goal.actionItemList}
                status={goal.status}
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
