import { css } from "@emotion/react";
import Lottie from "lottie-react";
import { Fragment } from "react";

import create_start from "@/assets/lottie/space/create_start.json";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";

export function Home({ onNext }: { onNext: () => void }) {
  return (
    <Fragment>
      <Spacing size={2.9} />
      <Header title={`회고 스페이스를\n만들어볼까요?`} contents="회고를 진행하기 위한 공간이 필요해요" theme="white" />
      <Lottie
        animationData={create_start}
        css={css`
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85%;
          height: auto;
        `}
      />
      <ButtonProvider>
        <ButtonProvider.Gray onClick={onNext}>
          <Typography variant="B1">시작하기</Typography>
        </ButtonProvider.Gray>
      </ButtonProvider>
    </Fragment>
  );
}
