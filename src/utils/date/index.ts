import { format, differenceInDays } from "date-fns";

const formatDateAndTime = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, "yyyy MM. dd a hh:mm");
  return formattedDate.replace("AM", "오전").replace("PM", "오후");
};

const formatOnlyDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "yyyy MM. dd");
};

const calculateDeadlineRemaining = (deadlineString: string): string => {
  const deadline = new Date(deadlineString);
  const today = new Date();
  const remainingDays: number = differenceInDays(deadline, today);
  return `D-${remainingDays}`;
};

export { formatDateAndTime, formatOnlyDate, calculateDeadlineRemaining };
