import { css } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { spaceRestrospectFetch, spaceInfoFetch } from "@/api/Retrospect";
import { retrospectDelete } from "@/api/space";
import { BottomSheet } from "@/component/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { MidModal } from "@/component/common/Modal/MidModal";
import { Spacing } from "@/component/common/Spacing";
import { Toast } from "@/component/common/Toast";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, TeamGoalView, CreateRetrospectiveSheet } from "@/component/space";
import { EmptyRetrospect } from "@/component/space/view/EmptyRetrospect";
import { SpaceAppBarRightComp } from "@/component/space/view/SpaceAppBarRightComp";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useToast } from "@/hooks/useToast";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { Space } from "@/types/spaceType";

type RestrospectType = {
  retrospectId: number;
  title: string;
  introduction: string;
  isWrite: boolean;
  retrospectStatus: "PROCEEDING" | "DONE";
  writeCount: number;
  totalCount: number;
};

export function SpaceViewPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { openBottomSheet } = useBottomSheet();
  const navigate = useNavigate();
  const [layerCount, setLayerCount] = useState<number>(0);
  const [spaceInfo, setSpaceInfo] = useState<Space>();
  const [restrospectArr, setRestrospectArr] = useState<RestrospectType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (spaceId) {
      spaceInfoFetch(Number(spaceId))
        .then((response) => {
          setSpaceInfo(response);
        })
        .catch((error) => {
          console.error(error);
          navigate(-1);
        });

      spaceRestrospectFetch(Number(spaceId))
        .then(({ layerCount, retrospects }) => {
          setLayerCount(layerCount);
          setRestrospectArr(retrospects);
        })
        .catch((error) => {
          console.error(error);
          navigate(-1);
        });
    }
  }, [spaceId]);

  const proceedingRetrospects = restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING");
  const doneRetrospects = restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "DONE");

  // 스페이스 삭제 버튼 함수
  const handleDeleteFun = async () => {
    await retrospectDelete(spaceId)
      .then(() => {
        navigate("/home/retrospect");
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        //FIXME: 팀장은 삭제하는가? 정책 논의 필요
        toast.error("스페이스 삭제에 실패하였습니다");
      })
      .finally(() => {
        setIsModalVisible(false);
      });
  };

  //모달 오픈 함수
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  //모든 클로스 함수
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <DefaultLayout
      theme="dark"
      height="6.4rem"
      title={spaceInfo?.name}
      RightComp={<SpaceAppBarRightComp spaceId={spaceId} onDeleteClick={handleOpenModal} />}
    >
      <Toast />

      <TeamGoalView />
      <Spacing size={1.1} />
      <SpaceCountView memberCount={spaceInfo?.memberCount} layerCount={layerCount} />
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
            {proceedingRetrospects.length}
          </Typography>
        </div>
        <Spacing size={1.6} />
        {!proceedingRetrospects.length && !doneRetrospects.length && <EmptyRetrospect />}

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          {proceedingRetrospects.map((retrospect) => (
            <RetrospectBox key={retrospect.retrospectId} retrospect={retrospect} />
          ))}
        </div>

        <Spacing size={2} />

        {doneRetrospects.length !== 0 && (
          <div
            css={css`
              display: flex;
              gap: 0.6rem;
            `}
          >
            <Typography variant="B1_BOLD">완료된 회고</Typography>
            <Typography variant="B1_BOLD" color="darkGray">
              {doneRetrospects.length}
            </Typography>
            <Spacing size={1.6} />
          </div>
        )}

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          {doneRetrospects.map((retrospect) => (
            <RetrospectBox key={retrospect.retrospectId} retrospect={retrospect} />
          ))}
        </div>
      </div>
      <button
        onClick={openBottomSheet}
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
      <BottomSheet
        contents={
          <Fragment>
            <CreateRetrospectiveSheet teamName={spaceInfo?.name} />
          </Fragment>
        }
        handler={true}
      />
      {isModalVisible && (
        <MidModal
          title="스페이스를 삭제하시겠어요?"
          content="스페이스를 다시 되돌릴 수 없어요"
          leftFun={handleCloseModal}
          rightFun={handleDeleteFun}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
      )}
    </DefaultLayout>
  );
}
