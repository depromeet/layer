import { useState } from "react";

import { useRadioButton } from "./useRadioButton";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useDateTimePicker = (defaultDate?: Value) => {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(defaultDate);
  const { isChecked: isTimeChecked, onChange: onTimeChange, selectedValue: selectedTime } = useRadioButton();

  return { selectedDate, onSelectDate: setSelectedDate, selectedTime, radioControl: { isTimeChecked, onTimeChange } };
};
