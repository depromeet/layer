import ReactCalendar from "react-calendar";
import type { CalendarProps as ReactCalendarProps } from "react-calendar";

import { Icon } from "@/component/common/Icon";

type CalendarProps = ReactCalendarProps;

export function Calendar({ ...props }: CalendarProps) {
  return (
    <ReactCalendar
      calendarType={"gregory"}
      formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
      prevLabel={<Icon icon={"ic_prev_chevron"} style={{ cursor: "inherit" }} />}
      nextLabel={<Icon icon={"ic_next_chevron"} style={{ cursor: "inherit" }} />}
      {...props}
    />
  );
}
