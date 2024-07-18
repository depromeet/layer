import { css } from "@emotion/react";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";

export function Start() {
  const { goNext } = useContext(RetrospectCreateContext);
  return (
    <div
      css={css`
        flex-grow: 1;
      `}
    >
      <Header title={"회고를 만들어볼까요"} contents={"회고를 진행하기 위한 공간이 필요해요"} />
      <ButtonProvider>
        <ButtonProvider.White onClick={goNext}>시작하기</ButtonProvider.White>
      </ButtonProvider>
    </div>
  );
}
