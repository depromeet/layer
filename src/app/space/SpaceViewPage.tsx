import { css } from "@emotion/react";
import { useQueries } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { MidModal } from "@/component/common/Modal/MidModal";
import { Spacing } from "@/component/common/Spacing";
import { Toast } from "@/component/common/Toast";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, ActionItemListView, CreateRetrospectiveSheet } from "@/component/space";
import { EmptyRetrospect } from "@/component/space/view/EmptyRetrospect";
import { SpaceAppBarRightComp } from "@/component/space/view/SpaceAppBarRightComp";
import { useApiGetTeamActionItemList } from "@/hooks/api/actionItem/useApiGetTeamActionItemList";
import { useGetSpaceAndRetrospect } from "@/hooks/api/retrospect/useSpaceRetrospects";
import { useApiDeleteSpace } from "@/hooks/api/space/useApiDeleteSpace";
import { useApiGetSpaceInfo } from "@/hooks/api/space/useApiGetSpaceInfo";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function SpaceViewPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { openBottomSheet } = useBottomSheet();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: deleteSpace } = useApiDeleteSpace();
  const [isVisiableBottomSheet, setIsVisiableBottomSheet] = useState<boolean>(false);

  const [{ data: restrospectArr }, { data: spaceInfo }, { data: teamActionList }] = useQueries({
    queries: [useGetSpaceAndRetrospect(spaceId), useApiGetSpaceInfo(spaceId), useApiGetTeamActionItemList(spaceId)],
  });

  const proceedingRetrospects = restrospectArr?.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING");
  const doneRetrospects = restrospectArr?.filter((retrospect) => retrospect.retrospectStatus === "DONE");

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

  const clickWrite = () => {
    setIsVisiableBottomSheet(true);
    openBottomSheet();
  };

  return (
    <DefaultLayout
      theme="dark"
      height="6.4rem"
      title={spaceInfo?.name}
      RightComp={<SpaceAppBarRightComp spaceId={spaceId} onDeleteClick={handleOpenModal} isTooltipVisible={restrospectArr?.length == 0} />}
    >
      <ActionItemListView teamActionList={teamActionList} />
      <Spacing size={1.1} />
      <SpaceCountView mainTemplate="" memberCount={spaceInfo?.memberCount} />
      <Spacing size={2.4} />
      <div
        css={css`
          width: calc(100% + 4rem);
          transform: translateX(-2rem);
          min-height: calc(100vh - 32rem);
          background-color: ${DESIGN_SYSTEM_COLOR.white};
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
        {!proceedingRetrospects?.length && !doneRetrospects?.length && <EmptyRetrospect />}

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          {proceedingRetrospects?.map((retrospect) => <RetrospectBox key={retrospect.retrospectId} spaceId={spaceId} retrospect={retrospect} />)}
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
          {doneRetrospects?.map((retrospect) => <RetrospectBox key={retrospect.retrospectId} retrospect={retrospect} spaceId={spaceId} />)}
        </div>
      </div>
      <button
        onClick={clickWrite}
        css={css`
          width: 11.6rem;
          height: 4.8rem;
          background-color: #212529;
          position: fixed;
          bottom: 1.2rem;
          right: 2.4rem;
          border-radius: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
        `}
      >
        <Icon icon="ic_writePen" />
        <Typography color="white" variant="B2_SEMIBOLD">
          회고 생성
        </Typography>
      </button>
      {isVisiableBottomSheet && (
        <BottomSheet
          contents={
            <Fragment>
              <CreateRetrospectiveSheet teamName={spaceInfo?.name} />
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
