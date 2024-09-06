import { useAtom } from "jotai";
import { Fragment } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { TipCard } from "@/component/common/tip/TipCard";
import { useInput } from "@/hooks/useInput";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

type InfoValues = Pick<SpaceValue, "name" | "introduction">;

export function Info({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [{ name, introduction }] = useAtom(spaceState);
  const { value: spaceName, handleInputChange: handleChangeName } = useInput(name);
  const { value: spaceIntroduction, handleInputChange: handleChangeIntroduction } = useInput(introduction);

  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`프로젝트의\n이름은 무엇인가요?`} />
      <Spacing size={6.5} />
      <InputLabelContainer id={"name"}>
        <Label>프로젝트 명</Label>
        <Input onChange={handleChangeName} value={spaceName} count={true} maxLength={10} placeholder="프로젝트 이름을 적어주세요" />
      </InputLabelContainer>
      <Spacing size={4} />
      <InputLabelContainer id={"introduction"}>
        <Label>한 줄 설명</Label>
        <TextArea
          onChange={handleChangeIntroduction}
          value={spaceIntroduction}
          count={true}
          maxLength={20}
          placeholder="프로젝트 한 줄 설명을 적어주세요"
        />
      </InputLabelContainer>
      <Spacing size={0.8} />
      <TipCard message="프로젝트 설명 또는 진행 목표에 대해 적어도 좋아요 :)" />
      <ButtonProvider>
        <ButtonProvider.Primary
          disabled={!spaceName}
          onClick={() =>
            onNext({
              name: spaceName,
              introduction: spaceIntroduction,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
