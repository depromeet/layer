import { css } from "@emotion/react";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";

type StartProps = {
  onQuitPage: () => void;
};

export function Start({ onQuitPage }: StartProps) {
  const { goNext } = useContext(RetrospectCreateContext);
  return (
    <>
      <Header title={"회고를 만들어볼까요"} contents={"회고를 진행하기 위한 공간이 필요해요"} theme="white" />
      <div
        css={css`
          text-align: center;
          margin-top: 9.8rem;
        `}
      >
        {/**FIXME - lottie로 대체하기 */}
        <Icon icon={"ic_notebook"} size={20.4} />
      </div>
      <ButtonProvider>
        <ButtonProvider.White onClick={goNext}>시작하기</ButtonProvider.White>
        <ButtonProvider.Primary onClick={onQuitPage}>나중에 하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
