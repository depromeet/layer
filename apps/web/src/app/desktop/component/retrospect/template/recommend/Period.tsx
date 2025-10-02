import { PeriodType, RecommendTemplateType } from "@/types/retrospectCreate/recommend";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { css } from "@emotion/react";
import { periodArr, periodMap } from "@/component/retrospect/template/recommend/recommend.const";
import { ButtonProvider, FieldButton } from "@/component/common/button";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";

interface PeriodProps {
  onNext: (periodiValue: Pick<RecommendTemplateType, "period">) => void;
  onPrev: () => void;
}

export function Period({ onNext, onPrev }: PeriodProps) {
  const { period } = useAtomValue(recommendTemplateState);
  const [checkedPeriod, setCheckedPeriod] = useState<PeriodType | null>(period);

  const handleButtonClick = (periodName: PeriodType) => {
    setCheckedPeriod(periodName);
  };

  return (
    <main
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={`어떤 주기로\n회고를 작성하시나요?`} />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        {periodArr.map((item) => (
          <FieldButton key={item} field={periodMap[item]} onClick={() => handleButtonClick(item)} isChecked={checkedPeriod === item} />
        ))}
      </div>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={onPrev}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary
          onClick={() =>
            onNext({
              period: checkedPeriod,
            })
          }
          disabled={checkedPeriod === null}
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </main>
  );
}
