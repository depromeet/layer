import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";

import { Icon } from "@/component/common/Icon";

type DateTimePickerProps = {
  // selected: Date;
  // onChange: (newDate: Date) => void;
} & CalendarProps;

export function DateTimePicker({ ...props }: DateTimePickerProps) {
  return (
    <div>
      <main>
        <Calendar
          {...props}
          calendarType={"gregory"}
          formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
          prevLabel={<Icon icon={"ic_prev_chevron"} style={{ cursor: "pointer" }} />}
          nextLabel={<Icon icon={"ic_next_chevron"} style={{ cursor: "pointer" }} />}
        />
      </main>
    </div>
  );
}
