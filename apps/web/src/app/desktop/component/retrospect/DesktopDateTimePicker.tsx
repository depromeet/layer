import { css } from "@emotion/react";
import { isPast } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import type { CalendarProps } from "react-calendar";

import { Calendar } from "@/component/common/dateTimePicker/Calendar";
import { TimePicker } from "@/component/common/dateTimePicker/TimePicker";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { useToast } from "@/hooks/useToast";
import { getTimeStringFromDate } from "@/utils/formatDate";
import { useDeviceType } from "@/hooks/useDeviceType";

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

export function DesktopDateTimePicker({ defaultValue, tileDisabled, onSave }: DateTimePickerProps) {
  const { toast } = useToast();
  const defaultDate = useMemo(() => (typeof defaultValue === "string" ? new Date(defaultValue) : defaultValue), [defaultValue]);
  const { onSelectDate, radioControl, date, dateTime } = useDateTimePicker(defaultDate, getTimeStringFromDate(defaultDate));
  const timePickerRef = useRef<HTMLDivElement>(null);
  const { deviceType } = useDeviceType();

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
    <div
      css={css`
        position: absolute;
        top: -15rem;
        right: 6rem;
        width: 26rem;
        height: 33.8rem;
        display: flex;
        flex-direction: column;
        padding: 1.6rem 1.2rem;
        border-radius: 1.2rem;
        background-color: #fff;
        box-shadow:
          0 4px 12px 0 rgba(6, 8, 12, 0.12),
          0 4px 8px 0 rgba(6, 8, 12, 0.08);
        z-index: 10;
        gap: ${deviceType === "desktop" ? "1.6rem" : "2.8rem"};
      `}
    >
      <div
        css={css`
          height: 23.3rem;
        `}
      >
        <Calendar defaultValue={defaultValue} onChange={onSelectDate} tileDisabled={tileDisabled} />
      </div>
      {/**
       * TODO 날짜 선택 저장 플로우를 여쭤본 상태입니다.
       * 앱에서의 완료 버튼 로직을 TimePicker에서 진행할 예정입니다.
       */}
      {date && <TimePicker ref={timePickerRef} radioControl={radioControl} />}
    </div>
  );
}
