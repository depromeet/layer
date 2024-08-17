import ReactCalendar from "react-calendar";
import type { CalendarProps as ReactCalendarProps } from "react-calendar";

import { Icon } from "@/component/common/Icon";
import { isBeforeToday } from "@/utils/formatDate";

type CalendarProps = { disablePast?: boolean } & ReactCalendarProps;

export function Calendar({ value, disablePast, ...props }: CalendarProps) {
  return (
    <ReactCalendar
      value={value}
      calendarType={"gregory"}
      formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
      prevLabel={<Icon icon={"ic_prev_chevron"} style={{ cursor: "inherit" }} />}
      nextLabel={<Icon icon={"ic_next_chevron"} style={{ cursor: "inherit" }} />}
      tileDisabled={({ date }) => (disablePast ? isBeforeToday(date) : false)}
      {...props}
    />
  );
}
