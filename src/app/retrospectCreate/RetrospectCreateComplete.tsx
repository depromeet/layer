import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { PATHS } from "@/config/paths";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function RetrospectCreateComplete() {
  const navigate = useNavigate();
  const locationState = useLocation().state as { spaceId: number; retrospectId: number };
  const { spaceId, retrospectId } = locationState;
  return (
    <DefaultLayout>
      <Spacing size={2.9} />
      <Header title={"회고가 완성되었어요!\n바로 회고를 작성해볼까요?"} contents="다음 회고에서도 해당 템플릿으로 제공해드릴게요!" />
      <div
        css={css`
          text-align: center;
          margin-top: 9.8rem;
        `}
      >
        {/**FIXME - lottie로 대체하기 */}
        <Icon icon={"ic_notebook_open"} size={27.8} />
      </div>
      <ButtonProvider sort="horizontal">
        <ButtonProvider.Gray onClick={() => navigate(PATHS.spaceDetail(spaceId.toString()))}>끝내기</ButtonProvider.Gray>
        <ButtonProvider.Primary
          onClick={() => {
            navigate("/write", {
              state: { spaceId, retrospectId },
            });
          }}
        >
          작성하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
