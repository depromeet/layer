import { css } from "@emotion/react";
import { isPast } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import type { CalendarProps } from "react-calendar";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Calendar } from "@/component/common/dateTimePicker/Calendar";
import { TimePicker } from "@/component/common/dateTimePicker/TimePicker";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { useToast } from "@/hooks/useToast";
import { getTimeStringFromDate } from "@/utils/formatDate";

type DateTimePickerProps = {
  /**
   * Pass a function to determine if a certain day should be displayed as disabled.
   *
   * @example ({ activeStartDate, date, view }) => date.getDay() === 0
   */
  tileDisabled?: CalendarProps["tileDisabled"];
  defaultValue?: string | Date;
  onSave: (dateTime?: string) => void;
};

export function DateTimePicker({ defaultValue, tileDisabled, onSave }: DateTimePickerProps) {
  const { toast } = useToast();
  const defaultDate = useMemo(() => (typeof defaultValue === "string" ? new Date(defaultValue) : defaultValue), [defaultValue]);
  const { onSelectDate, radioControl, date, dateTime } = useDateTimePicker(defaultDate, getTimeStringFromDate(defaultDate));
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (date) {
      timePickerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [date]);

  const handleClickSave = () => {
    if (dateTime && isPast(dateTime)) {
      toast.error("과거는 선택할 수 없어요");
      return;
    }
    onSave(dateTime);
  };

  return (
    <BottomSheet
      id={"datePickerSheet"}
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
          <ButtonProvider gradient={false}>
            <ButtonProvider.Primary onClick={handleClickSave} disabled={!date}>
              완료
            </ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      }
      sheetHeight={670}
    />
  );
}
