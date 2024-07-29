import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { Fragment } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { TypeButton } from "@/component/space/TypeButton";
import { spaceState } from "@/store/space/spaceAtom";
import { ProjectType, SpaceValue } from "@/types/space";

export function Category({ onNext }: { onNext: (typeValues: Pick<SpaceValue, "category">) => void }) {
  const [{ category }, setSpaceValue] = useAtom(spaceState);

  const handleButtonClick = (category: ProjectType) => {
    setSpaceValue((preValue) => ({
      ...preValue,
      category,
    }));
  };

  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`어떤 형태의\n프로젝트를 진행하나요?`} />
      <Spacing size={6.5} />
      <div
        css={css`
          display: flex;
        `}
      >
        <TypeButton label="개인 프로젝트" onClick={() => handleButtonClick(ProjectType.Individual)} isClicked={category === ProjectType.Individual} />
        <Spacing size={0.8} direction="horizontal" />
        <TypeButton label="팀 프로젝트" onClick={() => handleButtonClick(ProjectType.Team)} isClicked={category === ProjectType.Team} />
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary
          disabled={category === undefined}
          onClick={() =>
            onNext({
              category: category,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
