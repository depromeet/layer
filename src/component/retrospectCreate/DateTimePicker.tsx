import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type DateTimePickerProps = {
  // selected: Date;
  // onChange: (newDate: Date) => void;
} & CalendarProps;

export function DateTimePicker({ ...props }: DateTimePickerProps) {
  return <Calendar {...props} />;
}
