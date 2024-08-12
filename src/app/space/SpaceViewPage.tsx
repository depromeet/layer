import { css } from "@emotion/react";
import { useQueries } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { MidModal } from "@/component/common/Modal/MidModal";
import { Spacing } from "@/component/common/Spacing";
import { Toast } from "@/component/common/Toast";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, ActionItemListView, CreateRetrospectiveSheet } from "@/component/space";
import { EmptyRetrospect } from "@/component/space/view/EmptyRetrospect";
import { SpaceAppBarRightComp } from "@/component/space/view/SpaceAppBarRightComp";
import { useApiOptionsGetTeamActionItemList } from "@/hooks/api/actionItem/useApiOptionsGetTeamActionItemList";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useApiDeleteSpace } from "@/hooks/api/space/useApiDeleteSpace";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function SpaceViewPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { openBottomSheet } = useBottomSheet();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: deleteSpace } = useApiDeleteSpace();
  const [isVisiableBottomSheet, setIsVisiableBottomSheet] = useState<boolean>(false);

  const [
    { data: restrospectArr, isLoading: isLoadingRestrospects },
    { data: spaceInfo, isLoading: isLoadingSpaceInfo },
    { data: teamActionList, isLoading: isLoadingTeamActionList },
  ] = useQueries({
    queries: [useApiOptionsGetRetrospects(spaceId), useApiOptionsGetSpaceInfo(spaceId), useApiOptionsGetTeamActionItemList(spaceId)],
  });

  const [proceedingRetrospects, setProceedingRetrospects] = useState(
    restrospectArr?.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING") || [],
  );
  const [doneRetrospects, setDoneRetrospects] = useState(restrospectArr?.filter((retrospect) => retrospect.retrospectStatus === "DONE") || []);

  const isLoading = isLoadingRestrospects || isLoadingSpaceInfo || isLoadingTeamActionList;

  const handleDeleteRetrospect = (retrospectId: number) => {
    setProceedingRetrospects((prev) => prev.filter((item) => item.retrospectId !== retrospectId));
    setDoneRetrospects((prev) => prev.filter((item) => item.retrospectId !== retrospectId));
  };

  const handleDeleteFun = () => {
    deleteSpace(spaceId as string);
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenBottomSheet = () => {
    setIsVisiableBottomSheet(true);
    openBottomSheet();
  };

  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <DefaultLayout
      theme="dark"
      height="6.4rem"
      title={spaceInfo?.name}
      RightComp={
        <SpaceAppBarRightComp
          spaceId={spaceId}
          onDeleteClick={handleOpenModal}
          isTooltipVisible={restrospectArr?.length == 0}
          handleOpenBottomSheet={handleOpenBottomSheet}
        />
      }
    >
      <ActionItemListView teamActionList={teamActionList?.teamActionItemList || []} />
      <Spacing size={1.1} />
      <SpaceCountView mainTemplate="" memberCount={spaceInfo?.memberCount} />
      <Spacing size={2.4} />
      <div
        css={css`
          width: calc(100% + 4rem);
          transform: translateX(-2rem);
          min-height: calc(100vh - 32rem);
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          padding: 2.2rem 2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 0.6rem;
          `}
        >
          <Typography variant="B1_BOLD">진행중인 회고</Typography>
          <Typography variant="B1_BOLD" color="darkGray">
            {proceedingRetrospects?.length}
          </Typography>
        </div>
        <Spacing size={1.6} />
        {!proceedingRetrospects?.length && <EmptyRetrospect />}

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          {proceedingRetrospects?.map((retrospect) => (
            <RetrospectBox key={retrospect.retrospectId} spaceId={spaceId} retrospect={retrospect} onDelete={handleDeleteRetrospect} />
          ))}
        </div>

        <Spacing size={2} />

        {doneRetrospects?.length !== 0 && (
          <div
            css={css`
              display: flex;
              gap: 0.6rem;
            `}
          >
            <Typography variant="B1_BOLD">완료된 회고</Typography>
            <Typography variant="B1_BOLD" color="darkGray">
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
            <RetrospectBox key={retrospect.retrospectId} retrospect={retrospect} spaceId={spaceId} onDelete={handleDeleteRetrospect} />
          ))}
        </div>
      </div>
      {isVisiableBottomSheet && (
        <BottomSheet
          contents={
            <Fragment>
              <CreateRetrospectiveSheet spaceId={spaceId} teamName={spaceInfo?.name} />
            </Fragment>
          }
          handler={true}
        />
      )}

      {isModalVisible && (
        <MidModal
          title="스페이스를 삭제하시겠어요?"
          content="스페이스를 다시 되돌릴 수 없어요"
          leftFun={handleCloseModal}
          rightFun={handleDeleteFun}
        />
      )}
      <Toast />
    </DefaultLayout>
  );
}
