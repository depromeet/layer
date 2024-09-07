import { useSetAtom } from "jotai";
import { useContext, useState } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { DateTimeInput } from "@/component/common/input/DateTimeInput";
import { Spacing } from "@/component/common/Spacing";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";

export function DueDate() {
  const { goNext, isMutatePending } = useContext(RetrospectCreateContext);
  const setRetroCreateData = useSetAtom(retrospectCreateAtom);
  const [selectedDateTime, setSelectedDateTime] = useState<string>();

  const handleDataSave = () => {
    if (!selectedDateTime) {
      return;
    }
    setRetroCreateData((prev) => ({ ...prev, deadline: selectedDateTime }));
  };

  const onNext = () => {
    handleDataSave();
    goNext();
  };

  return (
    <>
      <Header title={"회고는\n언제까지 작성할까요?"} />
      <Spacing size={4} />
      <DateTimeInput
        onValueChange={(value) => {
          setSelectedDateTime(value);
        }}
      />
      <ButtonProvider isProgress={isMutatePending}>
        <ButtonProvider.Primary onClick={onNext} disabled={!selectedDateTime} type="submit">
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
