import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import type { CalendarProps } from "react-calendar";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Calendar } from "@/component/common/dateTimePicker/Calendar";
import { TimePicker } from "@/component/common/dateTimePicker/TimePicker";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";

type DateTimePickerProps = {
  defaultValue?: CalendarProps["defaultValue"];
  onSave: ({ date, time }: { date: Date; time?: string }) => void;
};

export function DateTimePicker({ defaultValue, onSave }: DateTimePickerProps) {
  const { onSelectDate, radioControl, selectedDate, selectedTime } = useDateTimePicker();
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) {
      timePickerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedDate]);

  return (
    <BottomSheet
      contents={
        <div
          css={css`
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 2.8rem;
          `}
        >
          <Calendar defaultValue={defaultValue} onChange={onSelectDate} />
          {selectedDate && <TimePicker ref={timePickerRef} radioControl={radioControl} />}
          <ButtonProvider>
            <ButtonProvider.Primary onClick={() => onSave({ date: selectedDate as Date, time: selectedTime })} disabled={!selectedDate}>
              설정하기
            </ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      }
      sheetHeight={670}
    />
  );
}
