import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import type { CalendarProps } from "react-calendar";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Calendar } from "@/component/common/dateTimePicker/Calendar";
import { TimePicker } from "@/component/common/dateTimePicker/TimePicker";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";

type DateTimePickerProps = {
  /**
   * Pass a function to determine if a certain day should be displayed as disabled.
   *
   * @example ({ activeStartDate, date, view }) => date.getDay() === 0
   */
  tileDisabled?: CalendarProps["tileDisabled"];
  /**
   * Calendar value that shall be selected initially.
   *
   * @example new Date(2024, 0, 1)
   */
  defaultValue?: CalendarProps["defaultValue"];
  onSave: (dateTime?: string) => void;
};

export function DateTimePicker({ defaultValue, tileDisabled, onSave }: DateTimePickerProps) {
  const { onSelectDate, radioControl, date, dateTime } = useDateTimePicker();
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (date) {
      timePickerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [date]);

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
          <Calendar defaultValue={defaultValue} onChange={onSelectDate} tileDisabled={tileDisabled} />
          {date && <TimePicker ref={timePickerRef} radioControl={radioControl} />}
          <ButtonProvider>
            <ButtonProvider.Primary onClick={() => onSave(dateTime)} disabled={!date}>
              완료
            </ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      }
      sheetHeight={670}
    />
  );
}
