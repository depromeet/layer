import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { Fragment, useState } from "react";

import { ButtonProvider, FieldButton } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { periodArr, periodMap } from "@/component/retrospect/template/recommend/recommend.const";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { PeriodType, RecommendTemplateType } from "@/types/retrospectCreate/recommend";

export function Period({ onNext }: { onNext: (periodicValues: Pick<RecommendTemplateType, "period">) => void }) {
  const { period } = useAtomValue(recommendTemplateState);

  const [checkedPeriod, setCheckedPeriod] = useState<PeriodType | null>(period);

  const handleButtonClick = (periodName: PeriodType) => {
    setCheckedPeriod(periodName);
  };

  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`어떤 형태의\n프로젝트를 진행하나요?`} contents="최대 3개까지 선택 가능해요!" />
      <Spacing size={3.2} />
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
      <ButtonProvider>
        <ButtonProvider.Primary
          disabled={checkedPeriod === null}
          onClick={() =>
            onNext({
              period: checkedPeriod,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
