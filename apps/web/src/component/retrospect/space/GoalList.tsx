import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import GoalCard from "./GoalCard";
import { useState } from "react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Icon } from "@/component/common/Icon";

interface Goal {
  id: string;
  title: string;
  todoList: string[];
  status: "실행 중" | "완료";
}

interface GoalListProps {
  currentTab: "진행중" | "지난";
}

export default function GoalList({ currentTab }: GoalListProps) {
  const [inProgressGoals, setInProgressGoals] = useState<Goal[]>([
    // {
    //   id: "1",
    //   title: "스프린트 1회차 이후 회고",
    //   todoList: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린'분석 북 스터디 진행"],
    //   status: "실행 중",
    // },
    // {
    //   id: "2",
    //   title: "스프린트 2회차 이후 회고",
    //   todoList: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린'분석 북 스터디 진행"],
    //   status: "실행 중",
    // },
    // {
    //   id: "3",
    //   title: "스프린트 3회차 이후 회고",
    //   todoList: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린'분석 북 스터디 진행"],
    //   status: "실행 중",
    // },
  ]);

  const [pastGoals, setPastGoals] = useState<Goal[]>([
    {
      id: "4",
      title: "스프린트 3회차 이후 회고",
      todoList: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린'분석 북 스터디 진행"],
      status: "완료",
    },
    {
      id: "5",
      title: "스프린트 4회차 이후 회고",
      todoList: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린'분석 북 스터디 진행"],
      status: "완료",
    },
    {
      id: "6",
      title: "스프린트 5회차 이후 회고",
      todoList: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린'분석 북 스터디 진행"],
      status: "완료",
    },
  ]);

  const currentGoals = currentTab === "진행중" ? inProgressGoals : pastGoals;

  return (
    <section
      css={css`
        width: 100%;
      `}
    >
      {currentGoals.length === 0 ? (
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
          {currentGoals.map((goal, index) => (
            <div key={goal.id}>
              <GoalCard title={goal.title} todoList={goal.todoList} status={goal.status} />
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
