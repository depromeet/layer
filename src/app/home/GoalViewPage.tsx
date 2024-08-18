import { css } from "@emotion/react";

import ActionItemBox from "@/component/actionItem/ActionItemBox.tsx";
import { Icon } from "@/component/common/Icon";
import { TabButton } from "@/component/common/tabs/TabButton.tsx";
import { Tabs } from "@/component/common/tabs/Tabs.tsx";
import { Typography } from "@/component/common/typography";
import { useTabs } from "@/hooks/useTabs.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export function GoalViewPage() {
  const { tabs, curTab, selectTab } = useTabs(["실행중", "지난"] as const);
  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="heading24Bold">
          실행목표
        </Typography>
      }
      RightComp={<Icon icon="basicProfile" size="3.2rem" />}
    >
      <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding-top: 1.6rem;
          row-gap: 1.2rem;
          padding-bottom: calc(var(--nav-bar-height) + 2rem);
        `}
      >
        <ActionItemBox
          inProgressYn={true}
          readonly={true}
          title={"스프린트 2회차 이후 회고"}
          contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          description={{
            team: "떡잎방범대",
            completeDate: "2024.06.30",
          }}
        />
        <ActionItemBox
          inProgressYn={false}
          readonly={true}
          title={"스프린트 2회차 이후 회고"}
          contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          description={{
            team: "떡잎방범대",
            completeDate: "2024.06.30",
          }}
        />
        <ActionItemBox
          inProgressYn={false}
          readonly={true}
          title={"스프린트 2회차 이후 회고"}
          contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          description={{
            team: "떡잎방범대",
            completeDate: "2024.06.30",
          }}
        />
        <ActionItemBox
          inProgressYn={false}
          readonly={true}
          title={"스프린트 2회차 이후 회고"}
          contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          description={{
            team: "떡잎방범대",
            completeDate: "2024.06.30",
          }}
        />
        <ActionItemBox
          inProgressYn={false}
          readonly={true}
          title={"스프린트 2회차 이후 회고"}
          contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          description={{
            team: "떡잎방범대",
            completeDate: "2024.06.30",
          }}
        />
      </div>
    </DefaultLayout>
  );
}
