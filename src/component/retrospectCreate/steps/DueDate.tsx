import { css } from "@emotion/react";
import { useAtom } from "jotai";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DateTimePicker } from "@/component/retrospectCreate";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { dueDateAtom } from "@/store/retrospect/retrospectCreate";
import { formatDateToString } from "@/utils/formatDate";

const DATE_INPUT_ID = "due-date";

export function DueDate() {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { onSelectDate, radioControl, selectedDate, selectedTime } = useDateTimePicker();
  const [dueDate, setDueDate] = useAtom(dueDateAtom);

  const handleDateOpen = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    openBottomSheet();
  };

  const handleDateSave = () => {
    if (!selectedDate || !selectedTime) {
      throw new Error("Undefined DateTime");
    }
    setDueDate({ time: selectedTime, date: selectedDate as Date });
    closeBottomSheet();
  };

  return (
    <div>
      <Header title={"회고는\n언제까지 작성할까요?"} />
      <Spacing size={7.45} />
      <label
        htmlFor={DATE_INPUT_ID}
        css={css`
          width: 100%;
          border: 1px solid ${"#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem 1.4rem;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        `}
      >
        {!(dueDate.date && dueDate.time) ? (
          <Typography color="lightGrey5" variant="B1">
            회고 마감일을 선택해주세요
          </Typography>
        ) : (
          <Typography color="darkGrayText" variant="B1">
            {`${dueDate.date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })} ${dueDate.time}`}
          </Typography>
        )}
        <Icon icon="ic_chevron_down" color="#171719" size={2.4} />
        <input
          id={DATE_INPUT_ID}
          value={formatDateToString(dueDate.date)}
          type="date"
          onClick={handleDateOpen}
          css={css`
            display: none;
          `}
        />
      </label>
      <BottomSheet
        contents={
          <>
            <DateTimePicker value={selectedDate} onChange={onSelectDate} radioControl={radioControl} />
            <ButtonProvider>
              <ButtonProvider.Primary onClick={handleDateSave} disabled={!selectedDate || !selectedTime}>
                설정하기
              </ButtonProvider.Primary>
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
