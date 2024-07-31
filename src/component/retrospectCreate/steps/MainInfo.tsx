import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { TipCard } from "@/component/common/tip/TipCard";
import { useInput } from "@/hooks/useInput";
import { mainInfoAtom } from "@/store/retrospect/retrospectCreate";

export function MainInfo() {
  const { goNext } = useContext(RetrospectCreateContext);
  const [mainInfo, setMainInfo] = useAtom(mainInfoAtom);
  const { value: title, handleInputChange: handleNameChange } = useInput(mainInfo.title);
  const { value: introduction, handleInputChange: handleDescriptionChange } = useInput(mainInfo.introduction);

  const handleDataSave = () => {
    setMainInfo({ title, introduction });
    goNext();
  };

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
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
          <Input value={title} onChange={handleNameChange} maxLength={10} count placeholder="회고 이름을 적어주세요" />
        </InputLabelContainer>

        <div>
          <InputLabelContainer id="name">
            <Label>한 줄 설명</Label>
            <TextArea
              value={introduction}
              onChange={handleDescriptionChange}
              maxLength={20}
              count
              placeholder="회고에 대한 한 줄 설명을 적어주세요"
            />
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
        <ButtonProvider.Primary onClick={handleDataSave} disabled={!title}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}
