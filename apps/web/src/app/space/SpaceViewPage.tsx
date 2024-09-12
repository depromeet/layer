import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useQueries } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Toast } from "@/component/common/Toast";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, ActionItemListView, CreateRetrospectiveSheet } from "@/component/space";
import { EmptyRetrospect } from "@/component/space/view/EmptyRetrospect";
import { SpaceAppBarRightComp } from "@/component/space/view/SpaceAppBarRightComp";
import { useAPiOptionsRecentTeamActionList } from "@/hooks/api/actionItem/useAPiOptionsRecentTeamActionList";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useApiDeleteSpace } from "@/hooks/api/space/useApiDeleteSpace";
import { useApiLeaveSpace } from "@/hooks/api/space/useApiLeaveSpace";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useModal } from "@/hooks/useModal";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { DualToneLayout } from "@/layout/DualToneLayout";
import { useTestNatigate } from "@/lib/test-natigate";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Retrospect } from "@/types/retrospect";

export function SpaceViewPage() {
  const navigate = useNavigate();
  const appNavigate = useTestNatigate();
  const memberId = Cookies.get("memberId");
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { open } = useModal();
  const SHEET_ID = "createSpaceSheet";

  const { mutate: deleteSpace } = useApiDeleteSpace();
  const { mutate: leaveSpace } = useApiLeaveSpace();

  const [
    { data: restrospectArr, isLoading: isLoadingRestrospects, refetch: refetchRestrospectData },
    { data: spaceInfo, isLoading: isLoadingSpaceInfo },
    { data: teamActionList, isLoading: isLoadingTeamActionList },
  ] = useQueries({
    queries: [useApiOptionsGetRetrospects(spaceId), useApiOptionsGetSpaceInfo(spaceId), useAPiOptionsRecentTeamActionList(spaceId)],
  });

  const [proceedingRetrospects, setProceedingRetrospects] = useState<Retrospect[]>([]);
  const [doneRetrospects, setDoneRetrospects] = useState<Retrospect[]>([]);

  useEffect(() => {
    if (restrospectArr) {
      setProceedingRetrospects(restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING"));
      setDoneRetrospects(restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "DONE"));
    }
  }, [restrospectArr]);

  const isLoading = isLoadingRestrospects || isLoadingSpaceInfo || isLoadingTeamActionList;
  const isLeader = memberId === String(spaceInfo?.leader.id);

  const handleDeleteRetrospect = (retrospectId: number) => {
    setProceedingRetrospects((prev) => prev.filter((item) => item.retrospectId !== retrospectId));
    setDoneRetrospects((prev) => prev.filter((item) => item.retrospectId !== retrospectId));
  };

  const SpaceDeleteFun = () => {
    deleteSpace(spaceId);
  };
  const SpaceLeaveFun = () => {
    leaveSpace(spaceId);
  };

  const handleCreateSpace = () => {
    if (spaceInfo?.formId) {
      open({
        title: "전에 진행했던 템플릿이 있어요!\n계속 진행하시겠어요?",
        contents: "",
        options: {
          buttonText: ["다시 하기", "진행하기"],
        },
        onClose: () => {
          openBottomSheet({ id: SHEET_ID });
        },
        onConfirm: () => {
          void navigate(PATHS.retrospectCreate(), {
            state: { spaceId, templateId: spaceInfo.formId },
          });
        },
      });
      return;
    }
    openBottomSheet({ id: SHEET_ID });
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <DualToneLayout
      topTheme="dark"
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          css={css`
            cursor: pointer;
          `}
          onClick={() => appNavigate(PATHS.home())}
          color={DESIGN_TOKEN_COLOR.gray00}
        />
      }
      TopComp={
        <>
          <ActionItemListView
            restrospectArr={restrospectArr ? restrospectArr : []}
            isPossibleMake={doneRetrospects.length === 0}
            spaceId={spaceInfo?.id}
            teamActionList={teamActionList?.teamActionItemList || []}
            leaderId={spaceInfo?.leader.id}
          />
          <Spacing size={1.1} />
          <SpaceCountView mainTemplate={spaceInfo?.formTag} memberCount={spaceInfo?.memberCount} isLeader={isLeader} />
          <Spacing size={2.4} />
        </>
      }
      title={spaceInfo?.name}
      RightComp={
        <SpaceAppBarRightComp
          spaceId={spaceId}
          onDeleteClick={() => {
            if (isLeader) {
              open({
                title: "스페이스를 삭제하시겠어요?",
                contents: "스페이스를 다시 되돌릴 수 없어요",
                onConfirm: SpaceDeleteFun,
              });
            } else {
              open({
                title: "해당 스페이스를 떠나시겠어요?",
                contents: "내 리스트에서 스페이스가 사라져요",
                onConfirm: SpaceLeaveFun,
                options: {
                  buttonText: ["아니요", "네"],
                },
              });
            }
          }}
          isTooltipVisible={restrospectArr?.length === 0}
          onClickPlus={handleCreateSpace}
          isLeader={isLeader}
        />
      }
    >
      <div
        css={css`
          width: calc(100% + 4rem);
          transform: translateX(-2rem);
          height: calc(100vh - 33rem);
          overflow-y: scroll;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          padding: 2.2rem 2rem;
        `}
      >
        <>
          <div
            css={css`
              display: flex;
              gap: 0.6rem;
            `}
          >
            <Typography variant="title18Bold">진행중인 회고</Typography>
            <Typography variant="title16Bold" color="gray600">
              {proceedingRetrospects?.length}
            </Typography>
          </div>
          {proceedingRetrospects?.length > 0 ? (
            <div
              css={css`
                margin-top: 1.6rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
              `}
            >
              {proceedingRetrospects?.map((retrospect) => (
                <RetrospectBox
                  key={retrospect.retrospectId}
                  spaceId={spaceId}
                  retrospect={retrospect}
                  onDelete={handleDeleteRetrospect}
                  refetchRestrospectData={refetchRestrospectData}
                  isLeader={isLeader}
                />
              ))}
            </div>
          ) : (
            <EmptyRetrospect />
          )}
        </>

        <Spacing size={2} />

        {doneRetrospects?.length !== 0 && (
          <div
            css={css`
              display: flex;
              gap: 0.6rem;
            `}
          >
            <Typography variant="title18Bold">완료된 회고</Typography>
            <Typography variant="title16Bold" color="gray600">
              {doneRetrospects?.length}
            </Typography>
          </div>
        )}
        <Spacing size={1.6} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          {doneRetrospects?.map((retrospect) => (
            <RetrospectBox
              key={retrospect.retrospectId}
              retrospect={retrospect}
              spaceId={spaceId}
              onDelete={handleDeleteRetrospect}
              isLeader={isLeader}
            />
          ))}
        </div>
      </div>
      <BottomSheet
        id={SHEET_ID}
        contents={
          <Fragment>
            <CreateRetrospectiveSheet spaceId={spaceId} teamName={spaceInfo?.name} closeBottomSheet={closeBottomSheet} />
          </Fragment>
        }
        handler={true}
      />
      <Toast />
    </DualToneLayout>
  );
}
