import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useApiOptionsGetTeamActionItemList } from "@/hooks/api/actionItem/useApiOptionsGetTeamActionItemList";

import GoalCard from "./GoalCard";

interface GoalListProps {
  currentTab: "진행중" | "지난";
}

export default function GoalList({ currentTab }: GoalListProps) {
  const params = useParams();
  const spaceId = params.spaceId as string;

  // * 팀 실행목표 리스트 조회
  const { data } = useQuery(useApiOptionsGetTeamActionItemList(spaceId));

  // TODO: 실제 상태에 따라 필터링 로직 추가
  const inProgressGoals = data?.teamActionItemList.filter((goal) => goal.status === "PROCEEDING");
  const pastGoals = data?.teamActionItemList.filter((goal) => goal.status === "DONE");

  const currentGoals = currentTab === "진행중" ? inProgressGoals : pastGoals;

  return (
    <section
      css={css`
        width: 100%;
      `}
    >
      {currentGoals?.length === 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            text-align: center;
            gap: 1.2rem;
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
          {currentGoals?.map((goal, index) => (
            <div key={goal.retrospectId}>
              <GoalCard
                spaceId={spaceId}
                title={goal.retrospectTitle}
                todoList={goal.actionItemList.map((item) => item.content)}
                status={goal.status}
              />
              {index < currentGoals.length - 1 && (
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
