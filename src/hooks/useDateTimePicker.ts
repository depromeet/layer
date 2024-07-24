import { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useDateTimePicker = (defaultDate?: Value) => {
  const [selectedDate, setSelectedDate] = useState<Value>(defaultDate ?? new Date());

  return { selectedDate, onSelectDate: setSelectedDate };
};
