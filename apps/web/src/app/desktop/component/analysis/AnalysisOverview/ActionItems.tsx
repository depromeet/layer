import { createContext, useContext, useState, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useApiOptionsGetTeamActionItemList } from "@/hooks/api/actionItem/useApiOptionsGetTeamActionItemList";
import ActionItemCard from "@/component/retrospect/space/actionItems/ActionItemCard";

type TabType = "진행중" | "지난";

const ACTION_ITEMS_TAB_NAMES = ["진행중", "지난"] as const;

const ActionItemsContext = createContext<{
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
} | null>(null);

const useActionItemsContext = () => {
  const context = useContext(ActionItemsContext);
  if (!context) throw new Error("ActionItems 컴포넌트 내부에서 사용해야 합니다.");
  return context;
};

function ActionItems({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<TabType>("진행중");

  return (
    <ActionItemsContext.Provider value={{ currentTab, setCurrentTab }}>
      <section
        css={css`
          width: 100%;
          height: 100%;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 1.2rem;
          display: flex;
          flex-direction: column;
          padding: 0 0.4rem;
        `}
      >
        {children}
      </section>
    </ActionItemsContext.Provider>
  );
}

// 탭 UI
function Tab() {
  const { currentTab, setCurrentTab } = useActionItemsContext();

  return (
    <div
      css={css`
        display: flex;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
      `}
    >
      {ACTION_ITEMS_TAB_NAMES.map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          css={css`
            position: relative;
            background: none;
            border: none;
            padding: 0.8rem 0rem;
            cursor: pointer;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 2px;
              background-color: ${DESIGN_TOKEN_COLOR.gray900};
              transform: scaleX(${tab === currentTab ? 1 : 0});
              transition: transform 0.3s ease-in-out;
              transform-origin: center;
            }
          `}
        >
          <Typography variant="subtitle14SemiBold" color={tab === currentTab ? "gray900" : "gray500"}>
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
}

// 탭 리스트 UI
function List() {
  const { currentTab } = useActionItemsContext();
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get("spaceId") as string;

  const { data } = useQuery(useApiOptionsGetTeamActionItemList(spaceId));

  const inProgressActionItems = data?.teamActionItemList.filter((goal) => goal.status === "PROCEEDING");
  const doneActionItems = data?.teamActionItemList.filter((goal) => goal.status === "DONE");
  const currentActionItems = currentTab === "진행중" ? inProgressActionItems : doneActionItems;

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
      `}
    >
      <section
        css={css`
          width: 100%;
        `}
      >
        {currentActionItems?.length === 0 ? (
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
              padding-bottom: 2rem;
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
    </div>
  );
}

ActionItems.Tab = Tab;
ActionItems.List = List;

export default ActionItems;
