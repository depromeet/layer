import { css } from "@emotion/react";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { ProgressBar } from "@/component/common/ProgressBar";
import { useInput } from "@/hooks/useInput";
import { DefaultLayout } from "@/layout/DefaultLayout";

type MainInfoProps = {
  curPage: number;
};

export function MainInfo({ curPage }: MainInfoProps) {
  const { goNext, goPrev, totalStepsCnt } = useContext(RetrospectCreateContext);
  const { value: retroName, handleInputChange: handleNameChange } = useInput();
  const { value: description, handleInputChange: handleDescriptionChange } = useInput();
  return (
    <DefaultLayout LeftComp={<Icon icon={"ic_arrow_back"} onClick={goPrev} />}>
      <ProgressBar curPage={curPage} lastPage={totalStepsCnt} />
      <Header title={"회고의\n이름은 무엇인가요?"} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4rem;
          margin-top: 7.5rem;
        `}
      >
        <InputLabelContainer id="name">
          <Label>회고 명</Label>
          <Input value={retroName} onChange={handleNameChange} maxLength={10} count />
        </InputLabelContainer>

        <InputLabelContainer id="name">
          <Label>한 줄 설명</Label>
          <TextArea value={description} onChange={handleDescriptionChange} maxLength={20} count />
        </InputLabelContainer>
      </div>

      <ButtonProvider>
        <ButtonProvider.Primary onClick={goNext} disabled={!retroName}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
