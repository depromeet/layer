import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { status } from "@/component/actionItem/actionItem.const.ts";
import ActionItemBox from "@/component/actionItem/ActionItemBox.tsx";
import { BottomSheet } from "@/component/BottomSheet";
import { Callout } from "@/component/common/callout/Callout.tsx";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useGetSpaceActionItemList } from "@/hooks/api/actionItem/useGetSpaceActionItemList.ts";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";

export function ActionItemMorePage() {
  const location = useLocation();
  const { spaceId, leaderId } = location.state as { spaceId: string; leaderId: number };
  const memberId = Cookies.get("memberId");
  const { openBottomSheet } = useBottomSheet();
  const { data, isLoading, refetch } = useGetSpaceActionItemList({ spaceId: spaceId });
  const scaledData = data?.teamActionItemList.map((item) => ({
    retrospectId: item.retrospectId,
    retrospectTitle: item.retrospectTitle,
    status: item.status,
    actionItemList: item.actionItemList,
  }));
  const SHEET_ID = "info";
  const isLeader = memberId === String(leaderId);
  return (
    <Fragment>
      {isLoading && <LoadingModal />}
      <BottomSheet
        id={"info"}
        title={"실행목표란?"}
        contents={
          <div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                padding-top: 3.5rem;

                span {
                  ${DESIGN_TOKEN_TEXT.body16Medium}
                  color: ${DESIGN_TOKEN_COLOR.gray600};
                }
              `}
            >
              <Typography>실행목표란 회고 완료 후 실제로 변화를 이루기 위해 필요한 구체적인 개선 작업이나 활동을 의미해요!</Typography>
            </div>
            <Spacing size={2.4} />
            <Callout
              title={"실행목표 설정은 대표자만 가능해요"}
              content={"회고 이후 팀원들과 심도있는 대화를 통해 공동의 실행 목표를 설정해보세요!"}
            />
          </div>
        }
      />
      <DefaultLayout
        theme={"gray"}
        title={"실행목표"}
        RightComp={
          <Icon
            icon={"ic_info_transparent"}
            size={2.5}
            onClick={() => {
              openBottomSheet({ id: SHEET_ID });
            }}
          />
        }
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
            padding: 1.5rem 0;
          `}
        >
          {data?.teamActionItemList?.map((item) => {
            return (
              <ActionItemBox
                key={item.retrospectId}
                id={item.retrospectId}
                inProgressYn={item.status === status[0]}
                title={item.retrospectTitle}
                contents={item.actionItemList}
                retrospectInfo={scaledData}
                emitDataRefetch={refetch}
                readonly={!isLeader}
              />
            );
          })}
        </div>
      </DefaultLayout>
    </Fragment>
  );
}
