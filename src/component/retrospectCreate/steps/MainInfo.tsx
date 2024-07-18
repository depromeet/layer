import { css } from "@emotion/react";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { TipCard } from "@/component/common/tip/TipCard";
import { useInput } from "@/hooks/useInput";

export function MainInfo() {
  const { goNext } = useContext(RetrospectCreateContext);
  const { value: retroName, handleInputChange: handleNameChange } = useInput();
  const { value: description, handleInputChange: handleDescriptionChange } = useInput();
  return (
    <>
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

        <div>
          <InputLabelContainer id="name">
            <Label>한 줄 설명</Label>
            <TextArea value={description} onChange={handleDescriptionChange} maxLength={20} count />
          </InputLabelContainer>
          <TipCard
            message="회고 설명 또는 진행 목표에 대해 적어도 좋아요 :)"
            styles={css`
              margin-top: 0.8rem;
            `}
          />
        </div>
      </div>

      <ButtonProvider>
        <ButtonProvider.Primary onClick={goNext} disabled={!retroName}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
