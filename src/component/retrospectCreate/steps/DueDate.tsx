import { css } from "@emotion/react";
import { useAtom } from "jotai";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { DateTimePicker } from "@/component/retrospectCreate/DateTimePicker";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { dueDateAtom } from "@/store/retrospect/retrospectCreate";
import { formatDateToString } from "@/utils/formatDate";

export function DueDate() {
  const [dueDate, setDueDate] = useAtom(dueDateAtom);
  const { selectedDate, onSelectDate } = useDateTimePicker(dueDate.date);
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const handleDateOpen = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    openBottomSheet();
  };

  const handleDateSave = () => {
    setDueDate((prev) => ({ ...prev, date: selectedDate as Date }));
    closeBottomSheet();
  };

  return (
    <div>
      <Header title={"회고는\n언제까지 작성할까요?"} />
      <Spacing size={7.45} />
      <input
        css={css`
          width: 100%;
          border: 1px solid ${"#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem;
          display: flex;
        `}
        value={formatDateToString(dueDate.date)}
        type="date"
        onClick={handleDateOpen}
      />
      <BottomSheet
        contents={
          <>
            <DateTimePicker value={selectedDate} onChange={onSelectDate} />
            <ButtonProvider>
              <ButtonProvider.Primary onClick={handleDateSave}>설정하기</ButtonProvider.Primary>
            </ButtonProvider>
          </>
        }
        handler={false}
        title=" " /**FIXME - 클로즈 아이콘 노출을 위한 임시 title */
        sheetHeight={675}
      />
    </div>
  );
}
