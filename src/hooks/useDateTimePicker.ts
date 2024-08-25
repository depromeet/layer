import { formatISO } from "date-fns";
import { useMemo, useState } from "react";

import { useRadioButton } from "./useRadioButton";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useDateTimePicker = (defaultDate?: Value, defaultTime?: string) => {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(defaultDate);
  const { isChecked: isTimeChecked, onChange: onTimeChange, selectedValue: selectedTime } = useRadioButton(defaultTime);

  const dateString = useMemo(() => {
    return selectedDate instanceof Date ? formatISO(selectedDate).split("+")[0] : undefined;
  }, [selectedDate]);

  const dateTimeString = useMemo(() => {
    if (!selectedTime) {
      return dateString;
    }
    if (dateString) {
      const [h, m] = selectedTime.split(":");
      const isoTimeString = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
      return formatISO(new Date(`${dateString.split("T")[0]}T${isoTimeString ?? "00:00"}`)).split("+")[0];
    }
    return undefined;
  }, [dateString, selectedTime, selectedDate]);

  return useMemo(
    () => ({
      date: dateString,
      time: selectedTime,
      dateTime: dateTimeString,
      onSelectDate: setSelectedDate,
      radioControl: { isTimeChecked, onTimeChange },
    }),
    [dateString, dateTimeString, setSelectedDate, isTimeChecked, onTimeChange, selectedTime],
  );
};
