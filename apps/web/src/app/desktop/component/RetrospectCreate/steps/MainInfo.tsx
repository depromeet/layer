import { RetrospectCreateContext } from "@/app/desktop/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { TipCard } from "@/component/common/tip";
import { useInput } from "@/hooks/useInput";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useContext } from "react";

function MainInfo() {
  const { goNext, goPrev } = useContext(RetrospectCreateContext);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const { value: title, handleInputChange: handleNameChange } = useInput(retroCreateData.title);
  const { value: introduction, handleInputChange: handleDescriptionChange } = useInput(retroCreateData.introduction);

  const handleDataSave = () => {
    setRetroCreateData((prev) => ({ ...prev, title, introduction }));
    goNext();
  };

  return (
    <>
      <Header title={"회고의\n 이름은 무엇인가요?"} />

      <Spacing size={4} />

      <InputLabelContainer id="name">
        <Label>회고 이름</Label>
        <Input value={title} onChange={handleNameChange} maxLength={10} count placeholder="회고 이름을 적어주세요" />
      </InputLabelContainer>

      <Spacing size={4} />

      <InputLabelContainer id="name">
        <Label>한 줄 설명</Label>
        <TextArea value={introduction} onChange={handleDescriptionChange} maxLength={20} count placeholder="회고에 대한 한 줄 설명을 적어주세요" />
      </InputLabelContainer>

      <TipCard
        message="회고 설명 또는 진행 목표에 대해 적어도 좋아요 :)"
        css={css`
          margin-top: 0.8rem;
        `}
      />

      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={goPrev}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={handleDataSave} disabled={!title}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}

export default MainInfo;
