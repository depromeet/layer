import ReactCalendar from "react-calendar";
import type { CalendarProps as ReactCalendarProps } from "react-calendar";

import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type CalendarProps = ReactCalendarProps;

export function Calendar({ ...props }: CalendarProps) {
  return (
    <ReactCalendar
      calendarType={"gregory"}
      formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
      prevLabel={<Icon icon={"ic_prev_chevron"} color={DESIGN_TOKEN_COLOR.gray900} style={{ cursor: "inherit" }} />}
      nextLabel={<Icon icon={"ic_next_chevron"} color={DESIGN_TOKEN_COLOR.gray900} style={{ cursor: "inherit" }} />}
      {...props}
    />
  );
}
