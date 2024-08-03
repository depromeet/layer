import { useParams } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useApiJoinSpace } from "@/hooks/api/space/useApiJoinSpace";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function JoinSpace() {
  const { id } = useParams() as { id: string };
  const spaceId = window.atob(id);
  const { data } = useApiGetSpace(spaceId);
  const { mutate } = useApiJoinSpace();

  if (!data) return null; // FIXME: 로딩 화면

  return (
    <>
      <DefaultLayout theme="gray" LeftComp={null}>
        <Header title={`짱구님이\n디프만 팀에 초대했어요!`} contents={`디프만 팀에서 함께 회고를 진행해볼까요?`} />
        <ButtonProvider>
          <ButtonProvider.Primary onClick={() => mutate(Number(spaceId))}>수락하기</ButtonProvider.Primary>
        </ButtonProvider>
      </DefaultLayout>
    </>
  );
}
