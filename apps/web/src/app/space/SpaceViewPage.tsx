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
      console.log(restrospectArr);
      //FIXME : 더미데이터 삽입
      //setProceedingRetrospects(restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING"));
      //setDoneRetrospects(restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "DONE"));
      setProceedingRetrospects(exampleRetrospects.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING"));
      setDoneRetrospects(exampleRetrospects.filter((retrospect) => retrospect.retrospectStatus === "DONE"));
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
            <Typography variant="title18Bold">마감된 회고</Typography>
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

const exampleRetrospects: Retrospect[] = [
  {
    retrospectId: 1,
    title: "1분기 회고",
    introduction: "2024년 1분기의 성과와 개선점을 돌아봅니다.",
    writeStatus: "NOT_STARTED",
    analysisStatus: "NOT_STARTED", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 10,
    writeCount: 3,
    createdAt: "2024-01-01",
    deadline: "2024-03-31",
  },
  {
    retrospectId: 2,
    title: "2분기 회고",
    introduction: "2024년 2분기의 업무 목표 달성 상황을 점검합니다.",
    writeStatus: "PROCEEDING",
    analysisStatus: "DONE", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 8,
    writeCount: 5,
    createdAt: "2024-04-01",
    deadline: "2024-06-30",
  },
  {
    retrospectId: 3,
    title: "상반기 회고",
    introduction: "2024년 상반기를 종합적으로 평가합니다.",
    writeStatus: "DONE",
    analysisStatus: "DONE", // 수정
    retrospectStatus: "DONE",
    totalCount: 6,
    writeCount: 6,
    createdAt: "2024-07-01",
    deadline: "2024-07-15",
  },
  {
    retrospectId: 4,
    title: "3분기 회고",
    introduction: "2024년 3분기의 성과를 공유하고 개선할 점을 논의합니다.",
    writeStatus: "PROCEEDING",
    analysisStatus: "NOT_STARTED", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 7,
    writeCount: 2,
    createdAt: "2024-08-01",
    deadline: null,
  },
  {
    retrospectId: 5,
    title: "팀 빌딩 회고",
    introduction: "팀의 협업과 커뮤니케이션 개선 방안을 도출합니다.",
    writeStatus: "DONE",
    analysisStatus: "NOT_STARTED", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 5,
    writeCount: 0,
    createdAt: "2024-09-01",
    deadline: "2024-09-30",
  },
  {
    retrospectId: 6,
    title: "연간 프로젝트 회고",
    introduction: "연간 프로젝트 목표와 성과를 정리합니다.",
    writeStatus: "DONE",
    analysisStatus: "DONE", // 수정
    retrospectStatus: "DONE",
    totalCount: 10,
    writeCount: 10,
    createdAt: "2024-01-01",
    deadline: "2024-12-31",
  },
  {
    retrospectId: 7,
    title: "고객 피드백 분석",
    introduction: "고객 피드백을 분석하여 서비스 개선 방향을 설정합니다.",
    writeStatus: "PROCEEDING",
    analysisStatus: "PROCEEDING", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 4,
    writeCount: 3,
    createdAt: "2024-08-15",
    deadline: "2024-09-15",
  },
  {
    retrospectId: 8,
    title: "개발 스프린트 회고",
    introduction: "개발 스프린트 동안의 작업을 돌아보고 다음 스프린트를 준비합니다.",
    writeStatus: "PROCEEDING",
    analysisStatus: "NOT_STARTED", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 6,
    writeCount: 1,
    createdAt: "2024-09-05",
    deadline: null,
  },
  {
    retrospectId: 9,
    title: "연말 회고",
    introduction: "2024년 한 해 동안의 성과를 돌아보고, 내년의 목표를 설정합니다.",
    writeStatus: "DONE",
    analysisStatus: "DONE", // 수정
    retrospectStatus: "DONE",
    totalCount: 12,
    writeCount: 12,
    createdAt: "2024-12-01",
    deadline: "2024-12-31",
  },
  {
    retrospectId: 10,
    title: "신규 프로젝트 회고",
    introduction: "신규 프로젝트의 진행 상황을 점검하고 팀의 의견을 수렴합니다.",
    writeStatus: "PROCEEDING",
    analysisStatus: "NOT_STARTED", // 수정
    retrospectStatus: "PROCEEDING",
    totalCount: 3,
    writeCount: 2,
    createdAt: "2024-10-01",
    deadline: null,
  },
];
