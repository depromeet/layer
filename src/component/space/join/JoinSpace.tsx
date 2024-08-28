import { css } from "@emotion/react";
import { useLocation, useParams } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { JoinLetter } from "@/component/space/join/JoinLetter.tsx";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useApiJoinSpace } from "@/hooks/api/space/useApiJoinSpace";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { decryptId } from "@/utils/space/cryptoKey";

export function JoinSpace() {
  const { id } = useParams() as { id: string };
  const spaceId = decryptId(id);
  const { data, isLoading } = useApiGetSpace(spaceId, true);
  const { mutate } = useApiJoinSpace();

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <DefaultLayout theme="gray" LeftComp={null}>
        <span
          id="essential_data"
          css={css`
            display: none;
          `}
        >
          <span id="name">{data?.leader.name}</span>
          <span id="team">{data?.name}</span>
        </span>
        <Header title={`${data?.leader.name}님이\n${data?.name} 팀에 초대했어요!`} contents={`${data?.name} 팀에서 함께 회고를 진행해볼까요?`} />
        <JoinLetter space={data!.name} description={data!.introduction} imgUrl={data!.bannerUrl} />
        <ButtonProvider>
          <ButtonProvider.Primary onClick={() => mutate(Number(spaceId))}>수락하기</ButtonProvider.Primary>
        </ButtonProvider>
      </DefaultLayout>
    </>
  );
}
