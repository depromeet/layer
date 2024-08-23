import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { Fragment, useState } from "react";

import { ButtonProvider, FieldButton } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { purposeArr, purposeMap } from "@/component/retrospect/template/recommend/recommend.const";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { PurposeType, RecommendTemplateType } from "@/types/retrospectCreate/recommend";

export function Purpose({ onNext }: { onNext: (periodicValue: Pick<RecommendTemplateType, "purpose">) => void }) {
  const { purpose } = useAtomValue(recommendTemplateState);
  const [selectedPurpose, setSeletedPurpose] = useState(purpose);

  const handleButtonClick = (select: PurposeType) => {
    if (selectedPurpose && selectedPurpose.includes(select)) {
      setSeletedPurpose(selectedPurpose.filter((pre) => pre !== select));
    } else {
      if (selectedPurpose && selectedPurpose.length <= 2) {
        setSeletedPurpose((pre) => [...pre, select]);
      }
    }
  };

  return (
    <Fragment>
      <Header title={`회고를 하는\n목적이 무엇인가요?`} contents="최대 3개까지 선택가능해요" />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        `}
      >
        {purposeArr.map((item) => (
          <FieldButton key={item} field={purposeMap[item]} onClick={() => handleButtonClick(item)} isChecked={selectedPurpose.includes(item)} />
        ))}
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary
          disabled={selectedPurpose?.length === 0}
          onClick={() =>
            onNext({
              purpose: selectedPurpose,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
