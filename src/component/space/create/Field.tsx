import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { Fragment, useState } from "react";

import { ButtonProvider, FieldButton } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { fieldArr, fieldMap } from "@/component/space/space.const";
import { spaceState } from "@/store/space/spaceAtom";
import { FieldType, SpaceValue } from "@/types/space";

export function Field({ onNext }: { onNext: (categoryValues: Pick<SpaceValue, "field">) => void }) {
  const { field } = useAtomValue(spaceState);

  const [checkedField, setCheckedField] = useState<Array<FieldType>>(field);

  const handleButtonClick = (fieldName: FieldType) => {
    if (checkedField.includes(fieldName)) {
      setCheckedField(checkedField.filter((field) => field !== fieldName));
    } else {
      if (checkedField.length <= 2) {
        setCheckedField((pre) => [...pre, fieldName]);
      }
    }
  };

  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`어떤 형태의\n프로젝트를 진행하나요?`} contents="최대 3개까지 선택 가능해요!" />
      <Spacing size={3.2} />
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        `}
      >
        {fieldArr.map((item) => (
          <FieldButton key={item} field={fieldMap[item]} onClick={() => handleButtonClick(item)} isChecked={checkedField.includes(item)} />
        ))}
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary
          disabled={checkedField.length === 0}
          onClick={() =>
            onNext({
              field: checkedField,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
