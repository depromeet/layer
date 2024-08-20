import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { Fragment, useState } from "react";

import { ButtonProvider, CategoryButton } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { PeriodicType, RecommendTemplateType } from "@/types/retrospectCreate/recommend";

export function Periodic({ onNext }: { onNext: (periodicValue: Pick<RecommendTemplateType, "periodic">) => void }) {
  const { periodic } = useAtomValue(recommendTemplateState);
  const [selectedPeriodic, setSeletedPeriodic] = useState(periodic);

  const handleButtonClick = (select: PeriodicType) => {
    setSeletedPeriodic(select);
  };
  return (
    <Fragment>
      <Header title={`어떤 패턴으로\n회고를 작성하시나요?`} />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
        `}
      >
        <CategoryButton
          category={{ name: "주기적 작성", icon_color: "ic_regular_color", icon_white: "ic_regular_white" }}
          onClick={() => handleButtonClick("REGULAR")}
          isClicked={selectedPeriodic === "REGULAR"}
        />
        <Spacing size={0.8} direction="horizontal" />
        <CategoryButton
          category={{ name: "불규칙적 작성", icon_color: "ic_irRegular_color", icon_white: "ic_irRegular_white" }}
          onClick={() => handleButtonClick("IRREGULAR")}
          isClicked={selectedPeriodic === "IRREGULAR"}
        />
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary
          disabled={selectedPeriodic === null}
          onClick={() =>
            onNext({
              periodic: selectedPeriodic,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
